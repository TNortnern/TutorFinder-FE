import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { useQuery } from "@apollo/react-hooks";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../../graphql/queries/users";
import withApollo from "../../util/with-apollo";
import { login, clearErrors } from "../../redux/actions/auth";
const Login = () => {
  const [email, setEmail] = useState("test");
  const [password, setPassword] = useState("testa");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { loading, data, error, refetch } = useQuery(LOGIN, {
    skip: LOGIN,
    variables: {
      email,
      password,
    },
  });

  const loginUser = async (e) => {
    dispatch(clearErrors());
    e.preventDefault();
    // call the login query
    await refetch()
      .then(({ data }) => {
        dispatch(login({ success: data.login }));
      })
      .catch((err) => {
        if (err.graphQLErrors) {
          dispatch(
            login({
              errors: err.graphQLErrors.map((item) => item.message),
            })
          );
        }
        dispatch(
          login({
            errors: err.message,
          })
        );
      });
  };
  return (
    <Container>
      <Grid
        justify="center"
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid xs="auto" item>
          {auth.errors.items && auth.errors.id === "login" ? (
            <>
              {auth.errors.items.map((err) => (
                <p style={{ color: "red" }}>{err}</p>
              ))}
            </>
          ) : (
            ""
          )}

          <form onSubmit={(e) => loginUser(e)}>
            <div>
              <TextField
                required
                label="E-mail"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                style={{ width: "250px" }}
              />
            </div>
            <div>
              <TextField
                required
                label="Password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                style={{ width: "250px" }}
              />
            </div>
            {loading ? <p>Logging in...</p> : ""}
            <Button
              style={{ marginTop: "10px" }}
              color="primary"
              variant="contained"
              type="submit"
              disabled={loading ? true : false}
            >
              Login
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default withApollo()(Login);

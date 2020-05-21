import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import { CREATE_USER } from "../graphql/mutations/users";
import AppLayout from "../components/Layout/AppLayout";
import withApollo from "../util/with-apollo";
import { Grid, InputLabel, Select, MenuItem } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ROLES_QUERY } from "../graphql/queries/roles";
import { CATEGORIES_QUERY } from "../graphql/queries/categories";
import { USERS_QUERY } from "../graphql/queries/users";
import { register, clearErrors } from "../redux/actions/auth/index";

const test = ({ data }) => {
  const [createUser, result] = useMutation(CREATE_USER);
  const getRoles = useQuery(ROLES_QUERY);
  const getCategories = useQuery(CATEGORIES_QUERY);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [avatar, setAvatar] = useState("");
  const [role, setRole] = useState("student");
  const [categories, setCategories] = useState("");
  const [age, setAge] = useState("");
  const gridValues = { xs: 12, sm: 3 };
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    // intialize selects
    if (getRoles.data) setRole(getRoles.data.roles[0].id);
  }, [getRoles, getCategories]);
  return (
    <AppLayout>
      {auth.errors.items && auth.errors.id === "register" ? (
        <ul>
          {auth.errors.items.map((err) => (
            <li>{err}</li>
          ))}
        </ul>
      ) : (
        ""
      )}
      <form noValidate>
        {result && result.loading ? <p>Loading...</p> : ""}
        {result && result.error ? (
          <p style={{ color: "red" }}>{result.error.message.split(":")[1]}</p>
        ) : (
          ""
        )}
        <Grid container direction="row" justify="center" sp>
          <Grid item xs={gridValues.xs} sm={gridValues.sm}>
            <TextField
              required
              label="Name"
              onChange={({ target }) => setName(target.value)}
            />
          </Grid>
          <Grid item xs={gridValues.xs} sm={gridValues.sm}>
            <TextField
              required
              label="E-mail"
              onChange={({ target }) => setEmail(target.value)}
            />
          </Grid>
          <Grid item xs={gridValues.xs} sm={gridValues.sm}>
            <TextField
              required
              label="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </Grid>
          <Grid item xs={gridValues.xs} sm={gridValues.sm}>
            <TextField
              required
              label="Location"
              onChange={({ target }) => setLocation(target.value)}
            />
          </Grid>
          <Grid item xs={gridValues.xs} sm={gridValues.sm}>
            <TextField
              required
              label="Avatar"
              onChange={({ target }) => setAvatar(target.value)}
            />
          </Grid>
          <Grid item xs={gridValues.xs} sm={gridValues.sm}>
            <InputLabel>Role</InputLabel>
            {getRoles && getRoles.data ? (
              <Select
                value={role}
                onChange={({ target }) => setRole(target.value)}
              >
                {getRoles.data.roles.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              "Getting roles.."
            )}
          </Grid>
          <Grid item xs={gridValues.xs} sm={gridValues.sm}>
            {getCategories.data &&
            getCategories.data.publicCategories.length ? (
              <>
                <Autocomplete
                  multiple
                  autoHighlight
                  options={getCategories.data.publicCategories}
                  getOptionLabel={(option) => option.name}
                  noOptionsText="No Categories"
                  onChange={(e, items) => {
                    // get only category ids
                    setCategories(items.map(({ id }) => id));
                  }}
                  style={{ width: "200px" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Categories" />
                  )}
                />
              </>
            ) : (
              "loading"
            )}
          </Grid>
          <Grid item xs={gridValues.xs} sm={gridValues.sm}>
            <TextField
              required
              label="Age"
              onChange={({ target }) => setAge(target.value)}
            />
          </Grid>
        </Grid>
        <Button
          style={{ margin: "20px 0" }}
          variant="contained"
          color="primary"
          onClick={async () => {
            dispatch(clearErrors());

            await createUser({
              variables: {
                name,
                email,
                password,
                location,
                avatar,
                role,
                categories,
                age,
              },
            })
              .then(({ data }) => {
                // maybe have a user array in redux that you push this new user to for real time updates
                const { createUser } = data;
                dispatch(
                  register({
                    success: createUser,
                  })
                );
              })
              .catch((err) => {
                console.log(err);
                if (err.graphQLErrors) {
                  dispatch(
                    register({
                      errors: err.graphQLErrors.map((item) => item.message),
                    })
                  );
                }
              });
          }}
        >
          Add new user
        </Button>
      </form>
      <ul>
        {data.users.map((user) => (
          <>
            <li key={user.id}>
              {user.name} - {user.role.name}
            </li>
            {user.profile.categories.length ? (
              <h5>
                Experienced with:{" "}
                {user.profile.categories.map(({ name }, index) => (
                  <span>
                    {name}
                    {index !== user.profile.categories.length - 1 ? (
                      <span>, </span>
                    ) : (
                      ""
                    )}{" "}
                  </span>
                ))}
              </h5>
            ) : (
              <h5>No experience listed.</h5>
            )}
          </>
        ))}
      </ul>
    </AppLayout>
  );
};

test.getInitialProps = async (ctx) => {
  // get users initially, probably something to move to _app.js
  const apolloClient = ctx.apolloClient;
  const { data, error, loading } = await apolloClient.query({
    query: USERS_QUERY,
  });
  if (error) return <div>error</div>;
  return { data, error, loading };
};

export default withApollo()(test);

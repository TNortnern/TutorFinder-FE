import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { LOGIN } from "../../../graphql/queries/users";
import withApollo from "../../../util/with-apollo";
import { login, clearErrors } from "../../../redux/actions/auth";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, togglePassword] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { loading, data, error, refetch } = useQuery(LOGIN, {
    skip: LOGIN,
    variables: {
      email,
      password,
    },
  });

  const hideOrShowPassword = () => {
    togglePassword(!hidePassword);
  };

  const loginUser = async (e) => {
    dispatch(clearErrors());
    e.preventDefault();
    // call the login query
    await refetch()
      .then(({ data }) => {
        dispatch(login({ success: data.login }));
        alert('login success')
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
    <Container component="main" maxWidth="xs">
      {auth.errors.items && auth.errors.id === "login" ? (
        <>
          {auth.errors.items.map((err) => (
            <p style={{ color: "red", textAlign: 'center' }}>{err}</p>
          ))}
        </>
      ) : (
        ""
      )}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={e => loginUser(e)} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            // error={error}
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            // error={error}
            fullWidth
            name="password"
            label="Password"
            type={hidePassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={hideOrShowPassword}
                  >
                    {hidePassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default withApollo()(SignIn);

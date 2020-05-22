import React, { useState } from "react";
// import SignIn from "./signIn/SignIn"
import MenuIcon from "@material-ui/icons/Menu";
import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Typography,
  Link,
  CircularProgress,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@apollo/react-hooks";
import { logout, getUser } from "../../redux/actions/auth/index.js";
import withApollo from "../../util/with-apollo.js";
import { USER_BY_TOKEN } from "../../graphql/queries/users/index.js";

const Nav = (props) => {
  const styles = {
    navbar: {
      justifyContent: "flex-end",
    },
    navbar__menuButton: {
      marginRight: "auto",
    },
    navbar__links: {
      color: "white",
      marginRight: "40px",
    },
  };

  const [open, setOpen] = useState(false);
  const isAuthed = useSelector((state) => state.auth.isAuthenticated);
  const [token, setToken] = useState("");
  // so that the spinner shows while resolving auth
  const [authResolved, setAuthResolved] = useState(false);
  const { data, loading, error, refetch, networkStatus } = useQuery(
    USER_BY_TOKEN,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        token,
      },
      skip: USER_BY_TOKEN,
    }
  );
  if (typeof window !== "undefined") {
    const findUser = async () => {
      if (localStorage && token) {
        await refetch()
          .then(({ data }) => {
            if (data && data.userByToken) {
              dispatch(getUser(data.userByToken));
            }
            setAuthResolved(true);
          })
          .catch((err) => {
            setAuthResolved(true);
            console.log(err);
          });
      }
    };
    findUser();
  }
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const authRender = () => {
    if (isAuthed && authResolved) {
      return (
        <Button
          onClick={() => {
            dispatch(logout());
            document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
            setToken("");
          }}
          variant="outlined"
          color="inherit"
        >
          Logout
        </Button>
      );
    } else if (!isAuthed && authResolved) {
      return (
        <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
          Login
        </Button>
      );
    } else {
      return <CircularProgress color="secondary" />;
    }
  };
  React.useEffect(() => {
    // handles checking if use is authenticated on refresh
    // since apollo forcing component to render twice, giving a default value here only allows the query to run on the client-side where the token may be located
    setToken(localStorage.getItem("token") ? localStorage.getItem("token") : 'not set');
  });

  return (
    <AppBar position="static">
      {JSON.stringify(loading)}
      <Toolbar style={styles.navbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          style={styles.navbar__menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Link>
          <Typography style={styles.navbar__links} variant="h6">
            what we do
          </Typography>
        </Link>
        <Link href="#">
          <Typography style={styles.navbar__links} variant="h6">
            what we do
          </Typography>
        </Link>
        <Link href="#">
          <Typography style={styles.navbar__links} variant="h6">
            what we do
          </Typography>
        </Link>
        {authRender()}
        <SignIn open={open} handleClose={handleClose} />
      </Toolbar>
    </AppBar>
  );
};

export default withApollo({ ssrMode: false })(Nav);

import React, { useState } from "react";
import SignIn from "./signIn/SignIn";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/auth/index.js";
import withApollo from "../../util/with-apollo.js";
import UserContext from "../UserContext";

const Nav = (props) => {
  // get user from global context
  
  const context = React.useContext(UserContext);
  console.log("context", context);
  let { user } = context;
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

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const authRender = () => {
    if (user) {
      return (
        <Button
          onClick={() => {
            dispatch(logout());
            // delete token
            document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
            context.logout();
          }}
          variant="outlined"
          color="inherit"
        >
          Logout
        </Button>
      );
    } else if (!user) {
      return (
        <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
          Login
        </Button>
      );
    } else {
      return <CircularProgress color="secondary" />;
    }
  };

  return (
    <AppBar position="static">
      <Toolbar style={styles.navbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          style={styles.navbar__menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Link href="/">
          <Button style={{ margin: "0 10px" }} size="large" color="inherit">
            Home
          </Button>
        </Link>
        <Link href="/profile">
          <Button style={{ margin: "0 10px" }} size="large" color="inherit">
            Profile
          </Button>
        </Link>
        <Link href="/test">
          <Button style={{ margin: "0 10px" }} size="large" color="inherit">
            A Link
          </Button>
        </Link>
        <Link href="/test">
          <Button style={{ margin: "0 10px" }} size="large" color="inherit">
            A Link
          </Button>
        </Link>
        {authRender()}
        <SignIn open={open} handleClose={handleClose} />
      </Toolbar>
    </AppBar>
  );
};

export default withApollo()(Nav);

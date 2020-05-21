import React, { useState } from 'react';
import SignIn from './signIn/SignIn.js';
import MenuIcon from '@material-ui/icons/Menu';
import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Typography,
  Link,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/auth/index.js';

const Nav = () => {
  const styles = {
    navbar: {
      justifyContent: 'flex-end',
    },
    navbar__menuButton: {
      marginRight: 'auto',
    },
    navbar__links: {
      color: 'white',
      marginRight: '40px',
    },
  };

  const [open, setOpen] = useState(false);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        <Link href="#">
          <Typography style={styles.navbar__links} variant="h6">
            what we do
          </Typography>
        </Link>
        {!user ? (
          <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
            Login
          </Button>
        ) : (
          <Button onClick={() => {
            dispatch(logout());
          }} variant="outlined" color="inherit">
            Logout
          </Button>
        )}
          <SignIn open={open} handleClose={handleClose} />
      </Toolbar>
    </AppBar>
  );
};

export default Nav;

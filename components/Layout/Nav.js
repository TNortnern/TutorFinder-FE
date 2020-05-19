import React from 'react';
import SignIn from './SignIn/SignIn.js';
import MenuIcon from '@material-ui/icons/Menu';
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Typography,
  Link,
} from '@material-ui/core';

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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position='static'>
      <Toolbar style={styles.navbar}>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='menu'
          style={styles.navbar__menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Link href='#'>
          <Typography style={styles.navbar__links} variant='h6'>
            what we do
          </Typography>
        </Link>
        <Link href='#'>
          <Typography style={styles.navbar__links} variant='h6'>
            what we do
          </Typography>
        </Link>
        <Link href='#'>
          <Typography style={styles.navbar__links} variant='h6'>
            what we do
          </Typography>
        </Link>
        <Button variant='outlined' color='inherit' onClick={handleClickOpen}>
          Login
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='form-dialog-title'
        >
          <SignIn />
        </Dialog>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;

import React from 'react';
import {
  AppBar,
  Avatar,
  IconButton,
  Drawer,
  Toolbar,
  Button,
  useMediaQuery,
} from '@mui/material';
import {
  AccountCircle,
  Menu,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import useStyles from './styles';

const NavBar = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const isAuthenticated = true;

  return (
    <AppBar position='fixed'>
      <Toolbar className={classes.toolbar}>
        {isMobile && (
          <IconButton
            color='inherit'
            edge='start'
            style={{ outline: 'none' }}
            onClick={() => {}}
            className={classes.MenuButton}
          >
            {' '}
            <Menu />{' '}
          </IconButton>
        )}
        <IconButton color='inherit' sx={{ ml: 1 }} onClick={() => {}}>
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          {!isMobile && 'Search...'}
          {!isAuthenticated ? (
            <Button color='inherit' onClick={() => {}}>
              Login &nbsp; <Account />
            </Button>
          ) : (
            <Button
              color='inherit'
              component={Link}
              to='/profile/:id'
              className={classes.linkButton}
              onClick={() => {}}
            >
              {!isMobile && <>My Movies &nbsp; </>}
            </Button>
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

import React, { useState } from 'react';
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

// internal imports
import useStyles from './styles'; // import useStyles
import { Search, SideBar } from '..';

const NavBar = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const classes = useStyles(); // call it as a hook
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const isAuthenticated = true;

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              onClick={() =>
                setSideBarOpen((prevSideBarState) => !prevSideBarState)
              }
              className={classes.MenuButton}
            >
              {' '}
              <Menu />{' '}
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={() => {}}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                className={classes.linkButton}
                onClick={() => {}}
              >
                <Link to="/profile/:id" />
                {!isMobile && <>My Movies &nbsp; </>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.44546679.1715731200&semt=ais_user"
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.sidebar}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={sideBarOpen}
              onClose={() =>
                setSideBarOpen((prevSideBarState) => !prevSideBarState)
              }
              classes={{ paper: classes.sidebarPaper }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              <SideBar setSideBarOpen={setSideBarOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: classes.sidebarPaper }}
              variant="permanent"
              open
            >
              <SideBar setSideBarOpen={setSideBarOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;

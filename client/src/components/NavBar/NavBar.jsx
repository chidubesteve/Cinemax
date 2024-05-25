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
import { useDispatch, useSelector } from 'react-redux';

// internal imports
import useStyles from './styles'; // import useStyles
import { Search, SideBar } from '..';
import { fetchToken, createSessionId, getAccount } from '../../utils';
import { useEffect } from 'react';
import { setUser } from '../../features/auth';

const NavBar = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const token = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');

  console.log('this is the user: ', user);

  useEffect(() => {
    const logUserIn = async () => {
      let accountData;
      if (token) {
        if (sessionIdFromLocalStorage) {
          accountData = await getAccount(sessionIdFromLocalStorage);
        } else {
          const sessionId = await createSessionId();
          accountData = await getAccount(sessionId);
        }
        console.log('this is the accountData, ', accountData);
        if (accountData) {
          dispatch(setUser(accountData));
        }
      }
    };
    logUserIn();
  }, [token, sessionIdFromLocalStorage, dispatch]);

  const classes = useStyles(); // call it as a hook
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();

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
              <Button
                color="inherit"
                onClick={() => {
                  fetchToken();
                  console.log('clicked');
                }}
              >
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                className={classes.linkButton}
                onClick={() => {}}
              >
                <Link to={`profile/${user.id}`} className={classes.Link}>
                  {!isMobile && <>My Movies &nbsp; </>}
                  <Avatar
                    style={{ width: 30, height: 30 }}
                    alt="Profile"
                    src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.44546679.1715731200&semt=ais_user"
                  />
                </Link>
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

import React, { useContext, useState, useCallback, useMemo } from 'react';
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

import { ThemeContext } from '../../utils/ToggleColorMode';
import { useEffect } from 'react';
import { setUser } from '../../features/auth';

const NavBar = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const colorMode = useContext(ThemeContext);

  const token = useMemo(() => sessionStorage.getItem('request_token'), []);
  const sessionIdFromSessionStorage = useMemo(
    () => sessionStorage.getItem('session_id'),
    []
  );

  useEffect(() => {
    const logUserIn = async () => {
      if (token) {
        let accountData;
        const sessionId =
          sessionIdFromSessionStorage || (await createSessionId());
        accountData = await getAccount(sessionId);
        if (accountData) {
          dispatch(setUser(accountData));
        }
      }
    };
    logUserIn();
  }, [token, sessionIdFromSessionStorage, dispatch]);

  const classes = useStyles(); // call it as a hook
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();

  const toggleSideBar = useCallback(() => {
    setSideBarOpen((prevSideBarOpen) => !prevSideBarOpen);
  }, []);

  const handleLoginClick = useCallback(() => {
    fetchToken();
  }, []);

  const handleColorModeToggle = useCallback(() => {
    colorMode.toggleColorMode();
  }, [colorMode]);

  return (
    <>
      <AppBar position="fixed" color="default">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              onClick={toggleSideBar}
              className={classes.MenuButton}
              aria-label="drawer menu button"
            >
              {' '}
              <Menu />{' '}
            </IconButton>
          )}
          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            onClick={handleColorModeToggle}
            aria-label="toggle color mode"
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={handleLoginClick}>
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
                    src={
                      user.avatar.tmdb.avatar_path
                        ? `https://www.themoviedb.org/t/p/w64_and_h64_face/${user?.avatar?.tmdb?.avatar_path}`
                        : 'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.44546679.1715731200&semt=ais_user'
                    }
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
              onClose={toggleSideBar}
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

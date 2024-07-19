import React, { useEffect, useState } from 'react';
import { MdMiscellaneousServices } from 'react-icons/md';
import { FaInstagram, FaYoutube, FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { TbWorld } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { GoQuestion } from 'react-icons/go';
import {
  Divider,
  Drawer,
  Grid,
  IconButton,
  Switch,
  ThemeProvider,
  Tooltip,
  createTheme,
} from '@mui/material';
import useStyles from './styles';
import { setAdultContent } from '../../features/adultContentSlice';

const Miscellaneous = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const reduxChecked = useSelector((state) => state.adultContent.adultContent);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(reduxChecked);
  const [isScrolling, setIsScrolling] = useState(false);

  const toggleMiscellaneous = (state) => {
    setOpen(state);
  };

  useEffect(() => {
    setChecked(reduxChecked);
  }, [reduxChecked]);

  useEffect(() => {
    let timer;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsScrolling(false);
      }, 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleChange = (event) => {
    const newValue = event.target.checked;
    setChecked(newValue);
    dispatch(setAdultContent(newValue));
    setOpen(false);
  };

  const socialMediaLinks = [
    {
      id: 'github_id',
      Icon: FaGithub,
      url: 'https://github.com/chidubesteve/',
      title: 'Github',
    },
    {
      id: 'instagram_id',
      Icon: FaInstagram,
      url: 'https://www.instagram.com/phoenixdevhub/',
      title: 'Instagram',
    },
    {
      id: 'profile_id',
      Icon: TbWorld,
      url: 'https://direct.me/phoenixtech',
      title: 'Profile',
    },
    {
      id: 'linkedin_id',
      Icon: FaLinkedin,
      url: 'https://www.linkedin.com/in/chidube-anike/',
      title: 'LinkedIn',
    },
    {
      id: 'youtube_id',
      Icon: FaYoutube,
      url: 'https://youtube.com/@web3phoenix',
      title: 'Youtube',
    },
    {
      id: 'twitter_id',
      Icon: FaXTwitter,
      url: 'https://twitter.com/PhoenixWeb3Dev',
      title: 'Twitter',
    },
  ];

  const theme = createTheme({
    components: {
      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            //thumb - unchecked
            color: '#4a0202',
          },
          colorPrimary: {
            '&.Mui-checked': {
              // thumb - checked
              color: '#D90000',
            },
          },
          track: {
            // track - unchecked
            opacity: 0.2,
            backgroundColor: '#4a0202',
            '.Mui-checked.Mui-checked + &': {
              // track - checked
              opacity: 0.9,
              backgroundColor: 'pink',
            },
          },
        },
      },
    },
  });

  const buttonStyles = {
    transform: isScrolling ? 'scale(0.5)' : 'scale(1)',
    opacity: isScrolling ? 0.5 : 1,
    transition: 'transform 0.4s ease-in-out, opacity 0.4s ease-in-out',
  };

  return (
    <div>
      <button
        className={classes.miscellaneousBtn}
        aria-label="miscellaneous settings"
        onClick={() => toggleMiscellaneous(true)}
        style={buttonStyles}
      >
        <MdMiscellaneousServices className={classes.icon} />
      </button>
      <Drawer
        open={open}
        onClose={() => toggleMiscellaneous(false)}
        classes={{ paper: classes.sidebarPaper }}
      >
        <ThemeProvider theme={theme}>
          <div className={classes.switchContainer}>
            <span>
              <Switch
                aria-label="toggle adult content"
                checked={checked}
                inputProps={{
                  'aria-label': 'toggle adult content',
                  name: 'adult content switch',
                }}
                onChange={handleChange}
                className={classes.switch}
              />{' '}
              Include adult &nbsp;
              <Tooltip
                arrow
                enterTouchDelay={0}
                title={
                  'Enabling this option will include movies and shows marked as adult in your searches and throughout the app. Please ensure you are over 18 years old to use this feature.'
                }
                placement="bottom"
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: 'offset',
                        options: {
                          offset: [0, -6],
                        },
                      },
                    ],
                  },
                }}
              >
                <IconButton>
                  <GoQuestion className={classes.questionIcon} />
                </IconButton>
              </Tooltip>
            </span>{' '}
          </div>
        </ThemeProvider>
        <Divider />
        <Grid container className={classes.socialIcons}>
          {socialMediaLinks.map(({ id, Icon, url, title }) => {
            return (
              <Tooltip
                key={id}
                arrow
                disableTouchListener
                title={`Visit ${title}`}
                placement="bottom"
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: 'offset',
                        options: {
                          offset: [0, -6],
                        },
                      },
                    ],
                  },
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Icon
                    key={id}
                    onClick={() => {
                      window.open(`${url}`, '_blank');
                      setOpen(false);
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </Tooltip>
            );
          })}
        </Grid>
      </Drawer>
    </div>
  );
};

export default Miscellaneous;

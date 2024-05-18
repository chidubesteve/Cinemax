import React, { useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  CircularProgress,
  ListItemIcon,
  ListSubheader,
  ListItemButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';

// internal imports
import useStyles from './styles';
import logo from '../../assests/Cinemax.png';

const categories = [
  { label: 'Trending', value: 'trending' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];
const demoCategories = [
  { label: 'Horror', value: 'horror' },
  { label: 'Animation', value: 'animation' },
  { label: 'Comedy', value: 'comedy' },
  { label: 'Action', value: 'action' },
];

const SideBar = ({ setSideBarOpen }) => {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <>
      <Link to={'/'} className={classes.logoLink}>
        <img className={classes.logo} src={logo} alt="cinemax" />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem onClick={() => {}} >  {/* disablePadding */}
              <ListItemButton>
                {/* <ListItemIcon>
                  <img
                    src={
                      'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.44546679.1715731200&semt=ais_user'
                    }
                    alt="genre icons"
                    className={classes.genreImages}
                    height={30}
                  />
                </ListItemIcon> */}
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {demoCategories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem onClick={() => {}}>
              <ListItemButton>
                {/* <ListItemIcon>
                  <img
                    src={
                      'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.44546679.1715731200&semt=ais_user'
                    }
                    alt="genre icons"
                    className={classes.genreImages}
                    height={30}
                  />
                </ListItemIcon> */}
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
};

export default SideBar;

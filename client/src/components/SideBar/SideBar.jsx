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
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { MdErrorOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

// internal imports
import useStyles from './styles';
import logo from '../../assests/images/Cinemax.png';
import { useGetGenresQuery } from '../../services/TMDB';
import genreIcons from '../../assests/genres';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Now Playing', value: 'now_playing' },
];

const SideBar = ({ setSideBarOpen }) => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );

  const { data, isLoading, isFetching, error } = useGetGenresQuery();

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
            <ListItem onClick={() => dispatch(selectGenreOrCategory(value))}>
              <ListItemButton>
                <ListItemIcon>
                  <img
                    src={genreIcons[label.toLowerCase()]}
                    alt="categories icons"
                    className={classes.genreImages}
                    height={30}
                  />
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      {error ? (
        <Box
          marginBlock="auto"
          height="100%"
          display="flex"
          alignItems="center"
        >
          <Typography variant="body1" textAlign="center" color="gray">
            An error occurred while fetching genres <MdErrorOutline />
          </Typography>
        </Box>
      ) : isFetching || isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <CircularProgress
            size="2rem"
            style={{ color: '#E3E6E8' }}
            thickness={2.8}
          />
        </Box>
      ) : (
        <List>
          <ListSubheader>Genres</ListSubheader>
          {data.genres.map(({ name, id }) => (
            <Link key={id} className={classes.links} to="/">
              <ListItem onClick={() => dispatch(selectGenreOrCategory(id))}>
                <ListItemButton>
                  <ListItemIcon>
                    <img
                      src={genreIcons[name.toLowerCase()]}
                      alt="genre icons"
                      className={classes.genreImages}
                      height={30}
                    />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      )}
    </>
  );
};

export default SideBar;

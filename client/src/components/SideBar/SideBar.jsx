import React, { useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  ListSubheader,
  ListItemButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// internal imports
import useStyles from './styles';
import logo from '../../assests/images/Cinemax.webp';
import { useGetGenresQuery } from '../../services/TMDB';
import genreIcons from '../../assests/genres';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { FetchError } from '..';
import { FetchingState } from '..';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Now Playing', value: 'now_playing' },
];

const SideBar = ({ setSideBarOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );

  const { data, isLoading, isFetching, error } = useGetGenresQuery();

  useEffect(() => {
    setSideBarOpen(false);
  }, [genreIdOrCategoryName, setSideBarOpen]);

  return (
    <>
      <Link
        to={'/'}
        className={classes.logoLink}
      >
        <img className={classes.logo} src={logo} alt="cinemax"/>
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
        <FetchError message="An error occurred while getting genres" />
      ) : isFetching || isLoading ? (
        <FetchingState />
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

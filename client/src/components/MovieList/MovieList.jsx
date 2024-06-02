import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import useStyles from './styles.js';
import { Movie } from '..';

const MovieList = ({ movies, noOfMovies }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.moviesContainer}>
      {movies.results.slice(0, noOfMovies).map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>   
  );
};

export default MovieList;

import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../services/TMDB';
import { MovieList } from '..';

const Movies = () => {
  const { data, error, isFetching } = useGetMoviesQuery();

  if (isFetching) {
    <Box display="flex" justifyContent="center">
      <CircularProgress size={'4rem'} />
    </Box>;
  }

  console.log(data)

  if (!data.results.length) {
    <Box display="flex" alignItems="center">
      <Typography variant="h4">
        No movies match that search
        <br />
        Please try something else.
      </Typography>
    </Box>;
  }
  if (error) return 'An error occured!';
  return (
    <div>
      <MovieList movies={data} />{' '}
    </div>
  );
};

export default Movies;

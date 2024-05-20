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
  const { data, error, isFetching, isLoading } = useGetMoviesQuery();

  if (isFetching || isLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size={'4rem'} />
      </Box>
    );
  }

  if (error) return 'An error occured!';
  console.log(data);

  if (!data || !data.results || !data.results.length) {
    return (
      <Box display="flex" alignItems="center">
        <Typography variant="h4">
          No movies match that search
          <br />
          Please try something else.
        </Typography>
      </Box>
    );
  }
  return (
    <div>
      <MovieList movies={data} />{' '}
    </div>
  );
};

export default Movies;

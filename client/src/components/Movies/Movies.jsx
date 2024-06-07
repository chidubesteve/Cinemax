import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useSelector } from 'react-redux';

//internal imports
import { useGetMoviesQuery } from '../../services/TMDB';
import { MovieList, Pagination } from '..';
import { MdErrorOutline } from 'react-icons/md';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, error, isFetching, isLoading } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });
  const breakingDevices = useMediaQuery((theme) =>
    theme.breakpoints.between('1790', '2037')
  );
  console.log(data);

  const noOfMovies = breakingDevices ? 18 : 20;

  if (isFetching || isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="100%"
      >
        <CircularProgress size={'3.5rem'} style={{ color: '#E3E6E8' }} />
      </Box>
    );
  }

  if (error)
    return (
      <Box
        height="inherit"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography color="gray">
          An error occurred while getting movies <MdErrorOutline />
        </Typography>
      </Box>
    );

  if (!data || !data.results || !data.results.length) {
    return (
      <Box
        height="inherit"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h6" color="gray">
          No movies match that search
          <br />
          Please try something else.
        </Typography>
      </Box>
    );
  }
  return (
    <>
      <MovieList movies={data} noOfMovies={noOfMovies} />{' '}
      <Pagination
        currentPage={page}
        setPage={setPage}
        totalPages={data?.total_pages}
      />
    </>
  );
};

export default Movies;

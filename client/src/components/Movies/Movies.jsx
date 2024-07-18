import React, { useState } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useSelector } from 'react-redux';

//internal imports
import {
  useGetMoviesQuery,
  useGetDailyTrendingQuery,
} from '../../services/TMDB';
import { FeaturedMovie, MovieList, Pagination } from '..';
import { MdErrorOutline } from 'react-icons/md';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

const Movies = () => {
  const [page, setPage] = useState(1);
  // fetch the switch state from the redux store
  const includeAdult = useSelector((state) => state.adultContent.adultContent);
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, error, isFetching, isLoading } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
    includeAdult,
  });

  const {
    data: dailyTrending,
    isFetching: dailyTrendingIsFetching,
    isLoading: dailyTrendingIsLoading,
    error: dailyTrendingError,
  } = useGetDailyTrendingQuery();
  const breakingDevices = useMediaQuery((theme) =>
    theme.breakpoints.between('2288', '2788')
  );

  const noOfMovies = breakingDevices ? 18 : 20;

  if (
    isFetching ||
    isLoading ||
    dailyTrendingIsFetching ||
    dailyTrendingIsLoading
  ) {
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

  if (error || dailyTrendingError) {
    return (
      <Box
        height="inherit"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography color="gray">
          {error
            ? 'An error occurred while getting movies'
            : 'An error occurred while getting featured movies'}{' '}
          <MdErrorOutline />
        </Typography>
      </Box>
    );
  }
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

  const movieListIds = new Set(data?.results.map((movie) => movie.id));

  const filteredDailyTrending = dailyTrending?.results.filter(
    (movie) => !movieListIds.has( movie.id));

  return (
    <>
      <FeaturedMovie movies={filteredDailyTrending} />
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

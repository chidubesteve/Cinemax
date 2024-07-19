import React, { useState } from 'react';
import {
  useMediaQuery,
} from '@mui/material';
import { useSelector } from 'react-redux';

//internal imports
import {
  useGetMoviesQuery,
  useGetDailyTrendingQuery,
} from '../../services/TMDB';
import { FeaturedMovie, MovieList, Pagination } from '..';
import FetchingState from '../Errors/FetchingState';
import FetchError from '../Errors/FetchError';

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
    return <FetchingState />;
  }

  error && <FetchError message="An error occurred while getting movies" />;
  dailyTrendingError && (
    <FetchError message="An error occurred while getting featured movies" />
  );

  if (!data || !data?.results || !data?.results?.length) {
    return (
      <FetchError message="No movies match that search. Please try something else" />
    );
  }

  const movieListIds = new Set(data?.results.map((movie) => movie.id));

  const filteredDailyTrending = dailyTrending?.results.filter(
    (movie) => !movieListIds.has(movie.id)
  );

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

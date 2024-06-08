import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { useGetUserListQuery } from '../../services/TMDB';
import PageTitle from '../PageTitle';
import { RatedCards } from '..';

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const {
    data: favoriteMovies,
    isFetching: isFavoriteMoviesFetching,
    isLoading: isFavoriteMoviesLoading,
    refetch: refetchFavoriteMovies,
  } = useGetUserListQuery({
    listName: 'favorite/movies',
    accountId: user?.id,
    sessionId: sessionStorage.getItem('session_id'),
    page: 1,
  });
  const {
    data: watchlistMovies,
    isFetching: isWatchlistMoviesFetching,
    isLoading: isWatchlistMoviesLoading,
    refetch: refetchWatchlistMovies,
  } = useGetUserListQuery({
    listName: 'watchlist/movies',
    accountId: user?.id,
    sessionId: sessionStorage.getItem('session_id'),
    page: 1,
  });
  useEffect(() => {
    refetchFavoriteMovies();
    refetchWatchlistMovies();
  }, []);
  
  const logout = () => {
    sessionStorage.clear();

    window.location.href = '/';
  };

  if (
    isFavoriteMoviesFetching ||
    isWatchlistMoviesFetching ||
    isFavoriteMoviesLoading ||
    isWatchlistMoviesLoading
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

  return (
    <>
      <PageTitle title={`My Profile | Cinemax`} />
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h4" gutterBottom>
            Hey, {user.username}
          </Typography>
          <Button color="inherit" onClick={logout}>
            Logout &nbsp; <ExitToAppIcon />
          </Button>
        </Box>
        {!favoriteMovies?.results?.length &&
        !watchlistMovies?.results?.length ? (
          <Box
            height="100vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="body1">
              Add favorites or watchlist some movies to see them here!
            </Typography>
          </Box>
        ) : (
          <Box>
            <RatedCards title={'Favorite Movies'} data={favoriteMovies} />
            <RatedCards title={'Watchlist'} data={watchlistMovies} />
          </Box>
        )}
      </Box>
    </>
  );
};

export default Profile;

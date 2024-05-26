import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  console.log('Profile');
  const favoriteMovies = [];
  const logout = () => {
    sessionStorage.clear();

    window.location.href = '/';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          Hey, {user.username}
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToAppIcon />
        </Button>
      </Box>
      {!favoriteMovies.length ? (
        <Typography variant="body1">
          Add favorites or watchlist some movies to see them here!
        </Typography>
      ) : (
        <Box>FAVORITE MOVIES</Box>
      )}
    </Box>
  );
};

export default Profile;

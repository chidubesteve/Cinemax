import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const FetchingState = () => {
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
};

export default FetchingState;

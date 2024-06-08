import React from 'react';
import { Box, Typography } from '@mui/material';

import useStyles from './styles';
import { Movie } from '..';

const RatedCards = ({ data, title}) => {
  const classes = useStyles();
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box display="flex" flexWrap="wrap" className={classes.container}>
        {data?.results?.map((movie, i) => (
          <Movie key={movie.id} movie={movie} i={i} />
        ))}
      </Box>
    </Box>
  );
};

export default RatedCards;

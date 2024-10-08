import React from 'react';
import { Grow, Typography, Grid, Tooltip, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

import useStyles from './styles.js';
import cinemax_logo from '../../assests/images/cinemax-logo.webp'

const Movie = ({ movie, i }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
      <Grow in key={i} timeout={(i + 1) * 300}>
        <Link className={classes.links} to={`/movies/${movie.id}`}>
          <img
            alt={`${movie.title} poster`}
            className={classes.image}
            src={
              movie.poster_path
                ? `https://cdn.statically.io/img/image.tmdb.org/f=auto/t/p/w342/${movie.poster_path}`
                : cinemax_logo
            }
            loading='lazy'
            fetchpriority="high"
          />
        </Link>
      </Grow>
      <div className={classes.titleCont}>
        <Typography variant="h6" className={classes.title}>
          {movie.title}
        </Typography>
      </div>
      <Tooltip
        enterTouchDelay={0}
        title={`${(Math.floor(movie.vote_average * 100) / 100).toFixed(
          1
        )} / 10`}
        slotProps={{
          popper: {
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, -12],
                },
              },
            ],
          },
        }}
        arrow
        enterDelay={300}
        leaveDelay={200}
      >
        <div>
          <Rating
            className={classes.rating}
            readOnly
            value={movie.vote_average / 2}
            precision={0.1}
          />
        </div>
      </Tooltip>
    </Grid>
  );
};

export default Movie;

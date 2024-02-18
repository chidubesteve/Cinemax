import * as React from 'react';
import { CssBaseline } from '@mui/material';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Profile, Actors, MovieInformation, NavBar, Movies } from '.';

import useStyles from './styles';

const App = () => {
  const classes = useStyles();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Movies />,
    },
    {
      path: '/profile/:id',
      element: <Profile />,
    },
    {
      path: '/movies/:id',
      element: <MovieInformation />,
    },
    {
      path: '/actors/:id',
      element: <Actors />,
    },
  ]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <RouterProvider router={router} />
      </main>
    </div>
  );
};

export default App;

import React from 'react';
import { CssBaseline } from '@mui/material';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Profile, Actors, MovieInformation, NavBar, Movies } from '.';

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

const App = () => (
  <div>
    <CssBaseline />
    <NavBar />
    <main>
      <RouterProvider router={router} />
    </main>
  </div>
);

export default App;

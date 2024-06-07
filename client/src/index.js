/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { Provider } from 'react-redux';

// internal imports
// eslint-disable-next-line import/no-named-as-default
import App from './components/App';
import { Profile, Actors, MovieInformation, Movies } from './components';
import store from './app/store';
import RootErrorBoundary from './components/Errors/RootErrorBoundary';

const Root = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({ palette: { mode: prefersDarkMode ? 'dark' : 'light' },   breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1200,
          xl: 1536,
          customBreakpoint0: 320,
          customBreakpoint1: 375,
          customBreakpoint2: 426,
          customBreakpoint3: 769,
          customBreakpoint4: 1025,
        },
      },
     }),
    [prefersDarkMode] 
  );
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <RootErrorBoundary />,
      children: [
        {
          path: '',
          element: <Movies />,
        },
        {
          path: 'profile/:id',
          element: <Profile />,
        },
        {
          path: 'movies/:id',
          element: <MovieInformation />,
        },
        {
          path: 'actors/:id',
          element: <Actors />,
        },
        {
          path: 'approved',
          element: <Navigate to="/" replace={true} />,
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<Root />);

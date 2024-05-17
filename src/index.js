/* eslint-disable import/no-named-as-default-member */
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// internal imports
// eslint-disable-next-line import/no-named-as-default
import App from './components/App';
import { Profile, Actors, MovieInformation, Movies } from './components';

const Root = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({ palette: { mode: prefersDarkMode ? 'dark' : 'light' } }),
    [prefersDarkMode]
  );

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
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
      ],
    },
  ]);

  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </StrictMode>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<Root />);

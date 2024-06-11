/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { Provider } from 'react-redux';

// internal imports
// eslint-disable-next-line import/no-named-as-default
import ToggleColorModeProvider from './utils/ToggleColorMode'
import App from './components/App';
import { Profile, Actors, MovieInformation, Movies } from './components';
import store from './app/store';
import RootErrorBoundary from './components/Errors/RootErrorBoundary';

const Root = () => {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

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
      <ToggleColorModeProvider>
        <RouterProvider router={router} />
      </ToggleColorModeProvider>
    </Provider>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<Root />);

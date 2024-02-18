/* eslint-disable import/no-named-as-default-member */
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
// eslint-disable-next-line import/no-named-as-default
import App from './components/App';

const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
const theme = React.useMemo(
  () => createTheme({ palette: { mode: prefersDarkMode ? 'dark' : 'light' } }),
  [prefersDarkMode],
);
const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />,
    </ThemeProvider>
  </StrictMode>,
);

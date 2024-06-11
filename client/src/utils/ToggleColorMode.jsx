import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { createContext, useMemo, useState } from 'react';

export const ThemeContext = createContext();

const ToggleColorMode = ({ children }) => {
  const [mode, setMode] = useState('dark');
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        breakpoints: {
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
    [mode]
  );

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  };
  return (
    <ThemeContext.Provider value={{ mode, setMode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ToggleColorMode;

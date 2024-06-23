import { makeStyles } from '@mui/styles';
import { GlobalStyles } from '@mui/material';

export const GlobalCSS = () => (
  <GlobalStyles
    styles={{
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
    }}
  />
);

export default makeStyles((theme) => ({

  title: {
    [theme.breakpoints.down('customBreakpoint3')]: {
      textOverflow: 'ellipsis !important',
      fontSize: '19px',
    },
  },
}));

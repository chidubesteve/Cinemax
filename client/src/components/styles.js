import { makeStyles } from '@mui/styles';
import { sidebarWidth } from './NavBar/styles';

export default makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.5rem',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
      backgroundColor: theme.palette.mode === 'light' ? ' #f5f5f5' : ' #424242',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.mode === 'light' ? ' #CECFCF' : '#7B7B7B',
      borderRadius: '1.5rem',
      width: '0.35rem',
    },
    '*::-webkit-scrollbar-thumb:hover': {
      backgroundColor: theme.palette.mode === 'light' ? '#BFC0C0' : '#6F6F6F',
    },
  },
  root: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
  },
  toolbar: {
    height: '70px',
  },
  content: {
    flexGrow: '1',
    padding: '2em',
    width: `calc(100% - ${sidebarWidth}px)`,
    height: '100dvh',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

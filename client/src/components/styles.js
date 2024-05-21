import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.5rem',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
      backgroundColor: ' #424242',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#7B7B7B',
      borderRadius: '1.5rem',
      width: '0.35rem',
    },
    '*::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#E3E6d4',
    },
  },
  root: {
    display: 'flex',
    height: '100%',
  },
  toolbar: {
    height: '70px',
  },
  content: {
    flexGrow: '1',
    padding: '2em',
    height: '100dvh',
  },
}));

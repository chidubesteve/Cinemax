import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  searchContainer: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    },
  },
  input: {
    color: theme.palette.mode === 'light' && 'black',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '10px',
      height: '30px',
    },
  },

}));

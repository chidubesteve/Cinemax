import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  logoLink: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10% 0',
  },
  logo: {
    width: '70%',
  },
  links: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  genreImages: {
    filter: theme.palette.mode === 'dark' ? 'dark' : 'invert(1)',
    // fill: theme.palette.mode === 'dark' ? 'white !important' : 'black',
  },
}));

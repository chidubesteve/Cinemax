import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    pagination_container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // margin: '2rem 0',
    },
  arrows: {
    color: theme.palette.text.primary,
    cursor: 'pointer',
    fontSize: '1.2rem',
    '&:hover': {
      transform: 'scale(1.2)',
      transition: 'all .3s ease-in',
    },
  },
  currentPage: {
    color: theme.palette.text.primary,
    fontSize: '1.5rem',
    margin: '0 1rem !important',
  },
}));

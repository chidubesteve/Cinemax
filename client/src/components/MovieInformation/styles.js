import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  containerSpaceAround: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '10px 0 !important',
    // overflowX: 'hidden !important',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      flexWrap: 'wrap',
      overflowX: 'hidden !important',
    },
  },
  poster: {
    borderRadius: '20px',
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0.5em 1em 1em rgb(36, 36, 40)'
        : '0.5em 1em 1em rgb(64, 64, 70)',
    width: '80%',
    [theme.breakpoints.down('md')]: {
      margin: '0 auto',
      width: '50%',
      height: '350px',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
      width: '100%',
      height: '350px',
      marginBottom: '30px',
    },
  },
  genresContainer: {
    margin: '10px 0 !important',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  links: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '.5rem 1rem',
    },
  },
  spoken_langs: {
    wordWrap: 'break-word',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      padding: '.5rem 1rem',
    },
  },
  genreImage: {
    filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none',
    color: theme.palette.mode === 'dark' ? 'white' : 'black',
    marginRight: '10px',
  },
  overview: {
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    wordBreak: 'break-all',
  },
  castContainer: {
    display: 'flex',
    overflowX: 'scroll',
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'nowrap !important',
    gap: '16px',
    width: '40rem !important',
    msOverflowStyle: 'none' /* Edge, Internet Explorer */,
    scrollbarWidth: 'none' /* Firefox */,
    // hides scrollbars while allowing to scroll
    '&::-webkit-scrollbar': {
      display: 'none', // Chrome, Safari, Opera
    },
    [theme.breakpoints.down('customBreakpoint3')]: {
      maxWidth: '28.5rem !important',
    },
    [theme.breakpoints.down('customBreakpoint2')]: {
      maxWidth: '21rem !important',
    },
    [theme.breakpoints.down('customBreakpoint1')]: {
      maxWidth: '16rem !important',
    },
    [theme.breakpoints.down('customBreakpoint0')]: {
      width: '15.5rem !important',
    },
  },
  castItem: {
    display: 'flex',
    flexDirection: 'row',
  },
  castImage: {
    width: '7em',
    maxWidth: '8em',
    height: '7em',
    objectFit: 'cover',
    borderRadius: '50%',
    [theme.breakpoints.down('md')]: {
      width: '5.5em',
      height: '5.5em',
    },
    [theme.breakpoints.down('sm')]: {
      width: '4em',
      height: '4em',
    },
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column !important',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videos: {
    width: '50%',
    height: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      height: '90%',
    },
  },
}));

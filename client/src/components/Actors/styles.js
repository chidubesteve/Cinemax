import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    containerSpaceAround: {
        display: 'flex',
        justifyContent: 'space-around',
        // margin: '10px 0 !important',
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
        width: '90%',
        display: 'flex',
        marginInline: 'auto',
        marginBottom: '2.5rem',
        [theme.breakpoints.down('lg')]: {
          width: 'auto',
          marginInline: 'auto',
          height: '700px',

        },
        [theme.breakpoints.down('md')]: {
          width: '100%',
          height: 'auto',
        },
        [theme.breakpoints.down('sm')]: {
          margin: '0 auto',
          width: '100%',
          height: '350px',
          marginBottom: '30px',
        },
      },
      social_icons: {
        fontSize: '1.5rem',
        display: 'flex',
        justifyContent: 'space-around',
        filter: theme.palette.mode === 'light' ? 'invert(1)' : 'none',
        color: theme.palette.mode === 'dark' ? 'white' : 'black',
        margin: '1rem 0 1.5rem 0!important',
        width: '90%'
      },

      buttonsContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column !important',
          justifyContent: 'space-between'
        },
      },

}));

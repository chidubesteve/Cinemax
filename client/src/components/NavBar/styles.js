import { makeStyles } from '@mui/styles';
const sidebarWidth = 240;

export default makeStyles((theme) => ({
  toolbar: {
    height: '80px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: '240px',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      marginLeft: '0',
      height: '100px',
    },
  },
  MenuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  sidebar: {
    [theme.breakpoints.up('sm')]: {
      width: sidebarWidth,
      flexShrink: 0,
    },
  },
  sidebarPaper: {
    width: sidebarWidth,
  },
  linkButton: {
    width: 'fit-content',
    '&:hover': {
      color: 'white !important',
      textDecoration: 'none',
    },
  },
  Link: {
    textDecoration: 'none',
    color:  theme.palette.mode === 'dark' ? 'white !important' : 'rgba(0, 0, 0, 0.87) !important',
    display: 'flex',
    alignItems: 'center',
  },

}));

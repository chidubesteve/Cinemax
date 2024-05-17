import { makeStyles } from '@mui/styles';
const sidebarWidth = 240

export default makeStyles((theme) => ({
  toolbar: {
    height: '80px',
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '240px',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      marginLeft: '0',
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
    '&:hover': {
      color: 'white !important',
      textDecoration:  'none'

    }
  }
}));

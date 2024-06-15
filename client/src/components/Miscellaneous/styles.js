import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
const sidebarWidth = 240;

export default makeStyles((theme) => ({
  miscellaneousBtn: {
    borderRadius: '50%',
    position: 'fixed',
    bottom: '7rem',
    right: '1.6rem',
    zIndex: '2000',
    background: `linear-gradient(90deg, rgba(217,0,0,1) 0%, rgba(254,0,0,1) 80%);`,
    height: '3rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '3rem',
    outline: 'none',
    border: 'none',
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.1)',
      transition: 'all .3s ease-in',
    },
  },
  switchContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
   marginBottom: '1rem',
  },
  sidebarPaper: {
    width: sidebarWidth,
    padding: '1rem',
  },
  icon: {
    fontSize: '1.6rem',
    color: 'white',
  },
  switch: {
    '& .MuiSwitch-switchBase.Mui-checked': {
    '&:hover': {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  },
  questionIcon: {
    fontSize: '1.15rem',
    color: theme.palette.mode ===  'dark' ? 'white' : 'rgba(0, 0, 0, 0.87)',
    },
    socialIcons: {
      fontSize: '1.5rem',
      display: 'flex',
      justifyContent: 'space-around',
      filter: theme.palette.mode === 'light' ? 'invert(1)' : 'none',
      color: theme.palette.mode === 'dark' ? 'white' : 'black',
      margin: '1rem 0 1.5rem 0!important',
    }
}));

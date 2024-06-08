import { makeStyles } from '@mui/styles';
import { GlobalStyles } from '@mui/material';
import error_sign from '../../assests/images/error_sign.png'


export default makeStyles((theme) => ({
  error_404_container: {
    width: 'inherit',
    height: '100dvh',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: theme.palette.mode === 'dark' && '#121212 !important',
    color: theme.palette.text.primary,
    padding: '0',
    margin: 'none',
    boxSizing: 'border-box'
  },
  error_bg_img: {
    [theme.breakpoints.down('sm')]: {
      height: '10rem',
    },
    width: '100%',
    height: '15rem',
    backgroundImage: `url(${error_sign})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',

  },
  text_404: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '5.5rem',
      padding: '.6rem 5px',
    },
    fontSize: '9rem',
    fontWeight: '100',
    margin: '0',
  },
  error_text: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.6rem',
      padding: '0 5px',
      textAlign: 'center',
    },
    lineHeight: '78px',
    fontSize: '3rem',
    fontWeight: '600',
    overflow: 'hidden',
    textWrap: 'nowrap',
    width: 'fit-content',
  },
  error_text_desc: {
    fontStyle: 'italic',
    textWrap: 'wrap',
    lineHeight: '30px',
    textAlign: 'center',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    wordBreak: 'break-all',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      paddingInline: '5px',
    },
  },
  back_to_homepage_btn: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#A90000',
    },
    backgroundColor: '#C80000', 
    padding: '10px 10px',
    textAlign: 'center',
    textDecoration: 'none',
    borderRadius: '3px',
    marginTop: '1rem',
    color: 'white',
    letterSpacing: '1px',
    border: 'none',
    outline: 'none',
    transition: 'all .3s ease-in',
  },
}));

export const globalStyles = (
  <GlobalStyles
    styles={{
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
    }}
  />
);

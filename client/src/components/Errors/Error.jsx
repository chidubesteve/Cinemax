import React from 'react';
import { Link } from 'react-router-dom';

//internal imports
import useStyles  from './style';
import { globalStyles } from './style';
import PageTitle from '../PageTitle';

const Error = ({ errCode, headerMessage, bodyMessage }) => {
  const classes = useStyles();
  return (
    <>
    <PageTitle title={`${errCode} | Cinemax`}/>
    {globalStyles}
    <div className={classes.error_404_container}>
      <div className={classes.error_bg_img}></div>
      <h1 className={classes.text_404}>{errCode}</h1>
      <span className={classes.error_text}>{headerMessage}</span>
      <p className={classes.error_text_desc}>{bodyMessage}</p>

        <Link className={classes.back_to_homepage_btn} to={'/'}>
          Back To Homepage
        </Link>
    </div>
    </>
  );
};

export default Error;

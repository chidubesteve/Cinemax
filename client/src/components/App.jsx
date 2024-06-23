import * as React from 'react';
import { useRef } from 'react';
import { CssBaseline } from '@mui/material';
import { Miscellaneous, NavBar } from '.';
import { SpeedInsights } from "@vercel/speed-insights/react"
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';

import useStyles from './styles';
import { Outlet } from 'react-router-dom';
import PageTitle from './PageTitle';
import useAlan from './Alan';

register();
const App = () => {
  const classes = useStyles();
  const alanBtnContainer = useRef();
  useAlan();
  
  return (
    <>
      <PageTitle title={'Cinemax | AI-powered Movie App'} />
      <div className={classes.root}>
        <CssBaseline enableColorScheme={true} />
        <NavBar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Outlet />
          {/*to render other components as a child, based on route */}
        </main>
        <Miscellaneous />
        <div ref={alanBtnContainer} />
        <SpeedInsights />
      </div>
    </>
  );
};

export default App;

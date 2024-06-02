import * as React from 'react';
import { CssBaseline } from '@mui/material';
import { NavBar} from '.';

import useStyles from './styles';
import { Outlet } from 'react-router-dom';
import PageTitle from './PageTitle';

const App = () => {
  const classes = useStyles();

  return (
    <>
    <PageTitle title={'Cinemax | AI-powered Movie App'} />
    <div className={classes.root}>
      <CssBaseline enableColorScheme={true}/>
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
         <Outlet />   
         {/*to render other components as a child, based on route */}
      </main>
    </div>
    </>
  );
};

export default App;

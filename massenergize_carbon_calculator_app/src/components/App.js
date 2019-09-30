import React from 'react';
import '../style/App.css';
import { header as Header } from './header';
import Score from './score';
import Auth from './Auth';
import Stations from './stations/Stations';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const App = () => {
  return (
    <>
      <CssBaseline />
      <Grid container style={{ padding: 10 }}>
        <Grid item xs={12}><Header />
        </Grid>
        <Grid item xs={12}><Score /></Grid>
        <Grid item xs={9}><Stations />
        </Grid>
        <Grid item xs={3}><Auth /></Grid>
      </Grid>
    </>
  );
}

export default App;

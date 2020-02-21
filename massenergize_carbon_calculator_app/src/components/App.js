// Functional imports
import React from "react";
import history from "../history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import "../style/App.css";
import Header from "./header";
import AboutPage from "./about/AboutPage";
import SummaryPage from "./about/SummaryPage";
import ScoreboardPage from "./about/ScoreboardPage";
import EventItem from "./events/EventItem";
import EventList from "./events/EventList";
import ForgotPass from "./auth/ForgotPass";
import SignUpPage from "./auth/SignUpPage";
import SignInPage from "./auth/SignInPage";
import Grid from "@material-ui/core/Grid";
//TODO: May apply context for authentication redirecting for EventItem
class App extends React.Component {
  // Specifying routes
  render() {
    return (
      <div>
        <Router history={history}>
          <React.Fragment>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Grid item xs={12}>
                <Header />
              </Grid>
              <Grid item xs={12}>
                <Switch>
                  <Route
                    path="/"
                    exact
                    render={() => <Redirect to="/events" />}
                  />
                  <Route path="/about" exact component={AboutPage} />
                  <Route path="/summary" exact component={SummaryPage} />
                  <Route path="/scoreboard" exact component={ScoreboardPage} />
                  <Route path="/events" exact component={EventList} />
                  <Route path="/event/:name" exact component={EventItem} />
                  <Route path="/signin" exact component={SignInPage} />
                  <Route path="/signup" exact component={SignUpPage} />
                  <Route path="/resetpass" exact component={ForgotPass} />
                </Switch>
              </Grid>
            </Grid>
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default App;

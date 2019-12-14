// React and redux import
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEvents } from "../../actions";
import { Link } from "react-router-dom";
// Styling imports
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
// Style defination
const useStyle = makeStyles(theme => ({
  root: {
    fontSize: "1vh",
    padding: "1vh 1vh",
    marginTop: 8
  },
  event: {
    fontSize: "1em",
    margin: "1vh 1vh",
    "& :hover": {
      backgroundColor: "#f2f2f2"
    }
  },
  link: {
    textDecoration: "none"
  },
  paperContainer: {
    padding: "1vh"
  },
  month: {
    fontSize: "1vh"
  },
  displayname: {
    fontWeight: "bold",
    fontSize: "2em",
    display: "flex"
  },
  location: {
    fontSize: "1.5em"
  },
  eventContent: {
    margin: "0vh 4vh"
  }
}));
// EventList component
const EventList = props => {
  // Get Event from application state
  const events = useSelector(state => Object.values(state.event));
  // Declare dispatch for action
  const dispatch = useDispatch();
  // Fetch event information upon Mount and Update
  React.useEffect(() => {
    fetchEvents()(dispatch);
  }, []);

  const classes = useStyle();
  // Rendering List of Events
  const renderList = () => {
    return events.map(event => {
      // Define dates and months for reformatting
      const date = new Date(event.datetime);
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      return (
        <React.Fragment key={event}>
          <Grid item xs={12}>
            <Link className={classes.link} to={`/event/${event.name}`}>
              <Paper className={classes.paperContainer}>
                <Grid container direction="row" spacing={2}>
                  <Grid
                    item
                    xs={2}
                    container
                    direction="column"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography>{months[date.getMonth()]}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h5">{date.getDate()}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container item xs={9} direction="column" spacing={2}>
                    <Grid item>
                      <Typography variant="h5" className={classes.displayname}>
                        {event.displayname}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography className={classes.location}>
                        {event.location}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Link>
          </Grid>
        </React.Fragment>
      );
    });
  };
  // Main rendering function calling render list function
  return (
    <div>
      <Paper className={classes.root}>
        <Grid container>
          <Grid item>
            <Typography
              variant="h4"
              style={{
                margin: "1vh 1vh",
                padding: "1vh 1vh",
                fontWeight: "bold"
              }}
            >
              Up Coming Events
            </Typography>
          </Grid>
          <Grid item xs={12} container>
            {renderList()}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default EventList;

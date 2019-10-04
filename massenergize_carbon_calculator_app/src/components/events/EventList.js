import React from 'react';
import { connect } from 'react-redux';
import { fetchEvents } from '../../actions';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const style = {
    root: {
        fontSize: '3vh',
        margin: '5vh 5vh',
        '& :hover': {
            backgroundColor: '#f2f2f2'
        },
    },
    paperContainer: {
        padding: '5vh 5vh',
    },
    link: {
        textDecorationLine: 'none',
        '& :visited': {
            textDecorationColor: 'none',
        }
    },
    month: {
        fontSize: '1vh',
    },

}

class EventList extends React.Component {
    componentDidMount() {
        this.props.fetchEvents();
    }
    renderList() {
        const { classes } = this.props;
        return this.props.events.map(event => {
            const date = new Date(event.datetime);
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            return (
                <div className={classes.root} key={event}>
                    <Link className={classes.link} to={`/event/${event.name}`}>
                        <Paper className={classes.paperContainer}>
                            <Grid container alignItems="center">
                                <Grid item xs={2}>
                                    <Typography >{months[date.getMonth()]}</Typography>
                                    <Typography variant="h3">{date.getDate()}</Typography>
                                </Grid>
                                <Divider orientation="vertical" />
                                <Grid item xs={4}>
                                    <Typography variant="h4" style={{ fontWeight: 'bold', fontSize: '5vh' }}>{event.displayname}</Typography>
                                    <Typography >{event.location}</Typography>
                                </Grid>
                            </Grid></Paper>
                    </Link>
                </div>
            );
        })
    }
    render() {
        return (
            <Grid item xs={9}>
                <Paper style={{ padding: '5vh 5vh', margin: '5vh 5vh' }}>
                    <Typography variant="h3" style={{ fontWeight: 'bold' }}>Up Coming Events</Typography>
                    {this.renderList()}
                </Paper>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        events: Object.values(state.events),
    }
}

export default connect(mapStateToProps, { fetchEvents })(withStyles(style)(EventList));
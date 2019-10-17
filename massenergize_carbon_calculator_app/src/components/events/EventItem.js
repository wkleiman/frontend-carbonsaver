//React and Redux Component
import React from 'react';
import { connect } from 'react-redux';
import { fetchEvent } from '../../actions';
import Score from '../score';
import Station from '../stations/Stations';

//Styling Components
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ScheduleIcon from '@material-ui/icons/Schedule';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress, Typography, } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

const style = {
    logoImg: {
        maxWidth: '100%',
    },
    root: {
        marginTop: '2vh',
        marginRight: '1vh',
        marginLeft: '1vh',
        padding: '1vh 1vh',
        '& a': {
            textDecoration: 'none',
            color: "#000000",
        },
    },
    eventDetails: {
        textAlign: 'center',
    },
    host_sponsor: {
        padding: '2vh 2vh',
    }
}

class EventItem extends React.Component {
    componentDidMount() {
        const { name } = this.props.match.params;
        this.props.fetchEvent(name);
    }

    render() {
        const { event, classes } = this.props;
        const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        if (!event) {
            return (
                <div>
                    <CircularProgress />
                </div>
            );
        }
        const eventDate = new Date(event.datetime);
        const reformattedPhone = (phone) => {
            var cleaned = ('' + phone).replace(/\D/g, '')
            var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
            if (match) {
                return '+1' + match[1] + match[2] + match[3]
            }
            return null
        }
        return (
            <Paper className={classes.root}>
                <Grid container spacing={2}>
                    <Grid container item direction="column" className={classes.eventDetails}>
                        <Grid item ><Typography variant="h3">{event.displayname}</Typography></Grid>
                        <Grid item container direction="column">
                            <Grid item ><Typography><LocationOnIcon />{event.location}</Typography></Grid>
                            <Grid item ><Typography><ScheduleIcon />{`${week[eventDate.getDay()]}, ${months[eventDate.getMonth()]} ${eventDate.getDate()}, ${eventDate.getHours() % 12} ${eventDate.getHours() > 12 ? "PM" : "AM"}`}</Typography></Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} ><Score /></Grid>
                    <Grid item container xs={12}>
                        <Grid item container xs={12} md={8} direction="column">
                            <Grid item container>
                                {
                                    (!event.stations) ? <CircularProgress /> : <Station stations={event.stations} />}
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} md={4} direction="column" spacing={2} className={classes.host_sponsor}>
                            <Grid item >
                                <Grid item container><Typography variant="h5">About the Host</Typography></Grid>
                                <Grid item container direction="column">
                                    <Grid item container direction="row">
                                        <Card>
                                            <CardActionArea>
                                                <CardMedia title={event.host_org} >
                                                    <a href={event.host_url}>
                                                        <img className={classes.logoImg} src={event.host_logo} />
                                                    </a>
                                                </CardMedia>
                                            </CardActionArea>
                                            <CardContent>
                                                <Typography variant="h5" component="h2">
                                                    {event.host_contact}
                                                </Typography>
                                                <IconButton className={classes.actionButton}>
                                                    <a href={`mailto:${event.host_email}`}><EmailIcon /></a>
                                                </IconButton>
                                                <IconButton className={classes.actionButton}>
                                                    <a href={`tel:${reformattedPhone(event.host_phone)}`}><PhoneIcon /></a>
                                                </IconButton>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid item container><Typography variant="h5">Sponsors</Typography></Grid>
                                <Grid item container direction="column">
                                    <Grid item container direction="row">
                                        <Card>
                                            <CardActionArea>
                                                <a href={event.sponsor_url}>
                                                    <CardMedia title={event.sponsor_org} ><img className={classes.logoImg} src={event.sponsor_logo} /></CardMedia>
                                                </a>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        event: state.events[ownProps.match.params.name],
    };
}

export default connect(mapStateToProps, { fetchEvent })(withStyles(style)(EventItem));
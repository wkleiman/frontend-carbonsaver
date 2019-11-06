//React and Redux Component
import React from 'react';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { fetchEvent } from '../../actions';
import { signIn } from '../../actions';
import Score from '../score';
import Station from '../stations/Stations';
import history from '../../history';

//Styling Components
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { withStyles } from '@material-ui/core/styles';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import { Card, CardActionArea, CardContent, CardMedia, CircularProgress, Typography, } from '@material-ui/core';
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
    },
    title: {
        fontWeight: 'bold',
        color: '#fa4a21',

    }
}

function ElevationScroll(props) {
    const { children, window } = props;
    // const [scrollTarget, setScrollTarget] = useState(undefined)
    // const scrollTrigger = useScrollTrigger({ target: scrollTarget });
    console.log(window ? window() : null)
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}



class EventItem extends React.Component {
    componentDidMount() {
        if (this.props.firebase) {
            this.props.firebase.auth().onAuthStateChanged(user => {
                if (!user) {
                    history.push('/login')
                }
            })
        }
        this.props.fetchEvent(this.props.match.params.name);
    }
    renderHost() {
        const { event, classes } = this.props;
        const reformattedPhone = (phone) => {
            var cleaned = ('' + phone).replace(/\D/g, '')
            var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
            if (match) {
                return '+1' + match[1] + match[2] + match[3]
            }
            return null
        }
        return (
            <Grid item >
                <Grid item container><Typography className={classes.title} style={{ color: '#8dc63f' }} variant="h5">About the Host</Typography></Grid>
                <Grid item container direction="column">
                    <Grid item container direction="row">
                        <Card>
                            <CardActionArea>
                                <CardMedia title={event.host_org} >
                                    <a href={event.host_url}>
                                        <img className={classes.logoImg} src={event.host_logo} alt={event.host_org} />
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
        );
    }

    renderSponsor() {
        const { event, classes } = this.props;
        return (
            <Grid item>
                <Grid item container><Typography className={classes.title} style={{ color: '#8dc63f' }} variant="h5">Sponsors</Typography></Grid>
                <Grid item container direction="column">
                    <Grid item container direction="row">
                        <Card>
                            <CardActionArea>
                                <a href={event.sponsor_url}>
                                    <CardMedia title={event.sponsor_org} ><img className={classes.logoImg} src={event.sponsor_logo} alt={event.sponsor_org} /></CardMedia>
                                </a>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        );
    }

    render() {
        const { event, classes } = this.props;

        if (!event) {
            return (
                <Grid container alignItems="center" justify="center">
                    <Grid item xs={12}><CircularProgress /></Grid>
                </Grid>
            );
        }

        return (
            <Paper className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item container xs={12}>
                        <Grid item container xs={12} md={8} direction="column">
                            <Grid container item>
                                <Station event={event} stations={event.stations} />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} ><Score /></Grid>
                        <Grid item container xs={12} md={4} direction="column" spacing={2} className={classes.host_sponsor}>
                            {this.renderHost()}
                            {this.renderSponsor()}
                        </Grid>
                    </Grid>
                </Grid>
            </Paper >
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        event: state.event[ownProps.match.params.name],
    };
}

export default connect(mapStateToProps, { fetchEvent, signIn })(withStyles(style)(withFirebase(EventItem)));
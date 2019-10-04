import React from 'react';
import { connect } from 'react-redux';
import { fetchEvent } from '../../actions';
import Station from '../stations/Stations';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { CircularProgress, Typography } from '@material-ui/core';

class EventItem extends React.Component {
    componentDidMount() {
        const { name } = this.props.match.params;
        this.props.fetchEvent(name);
    }

    render() {
        if (!this.props.event) {
            return (
                <div>
                    <CircularProgress />
                </div>
            );
        }
        return (
            <Grid item xs={9}>
                <Paper style={{ margin: '5vh 5vh', padding: '5vh 5vh', minHeight: '100vh', overflow: 'auto' }}>
                    <Typography variant="h4">{this.props.event.displayname}</Typography>
                    {
                        (!this.props.event.stations) ? <CircularProgress /> : <Station stations={this.props.event.stations} />}
                </Paper>
            </Grid>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        event: state.events[ownProps.match.params.name],
    };
}

export default connect(mapStateToProps, { fetchEvent })(EventItem);
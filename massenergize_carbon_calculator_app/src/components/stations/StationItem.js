import React from 'react';
import ActionList from '../actions/actionList';
import { CircularProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'



class StationItems extends React.Component {

    render() {
        const { station } = this.props;
        if (!station)
            return <CircularProgress />;
        return (
            <div style={{ padding: '16px 16px' }}>
                <Typography variant="h4">{station.displayname}</Typography>
                <Typography>{station.description}</Typography>
                <ActionList actions={station.actions} />
            </div>
        );
    }
}

export default StationItems;
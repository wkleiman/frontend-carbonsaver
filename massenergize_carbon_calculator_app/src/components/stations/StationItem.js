import React from 'react';
import { connect } from 'react-redux';
import { fetchStation } from '../../actions';
import ActionList from '../actions/actionList';
import { CircularProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'



class StationItems extends React.Component {
    componentDidMount() {
        this.props.fetchStation(this.props.station);
    }

    render() {
        const { stationInfo } = this.props;
        if (!stationInfo)
            return <CircularProgress />;
        return (
            <div style={{ padding: '16px 16px' }}>
                <Typography variant="h4">{stationInfo.displayname}</Typography>
                <Typography>{stationInfo.description}</Typography>
                <ActionList actions={stationInfo.actions} />
            </div>

            // <div>StationItem</div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stationInfo: state.stationInfo[ownProps.station],
    }
}

export default connect(mapStateToProps, { fetchStation })(StationItems);
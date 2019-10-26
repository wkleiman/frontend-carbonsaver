import React from 'react';
import PropTypes from 'prop-types';
import StationItem from './StationItem';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Icon from '@material-ui/core/Icon';
import { CircularProgress } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        flexGrow: 1,
        width: '100%'
    },
    stationIcon: {
        width: '3vh',
    }
});

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            <Box>{children}</Box>
        </Typography>
    );
}
function tabProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

class Station extends React.Component {
    state = { value: 0 };

    onChangeHandler(e, newValue) {
        this.setState({ value: newValue });
    }

    renderStationTabs() {
        let idx = 0;
        const { classes } = this.props;
        return this.props.stations.map(station => {
            if (station.name === 'Welcome_1')
                return (
                    <Tab label={station.displayname} {...tabProps(idx++)} />
                );
            return (
                <Tab icon={<img className={classes.stationIcon} src={station.icon} />} label={station.displayname} {...tabProps(idx++)} />
            );
        });
    }

    renderStationItemList() {
        let idx = 0;
        return this.props.stations.map(station => {
            return (
                <TabPanel value={this.state.value} index={idx++}>
                    <Paper>
                        <StationItem value={this.state.value} station={station} />
                    </Paper>
                </TabPanel>
            );
        })
    }

    render() {
        const { classes, stations } = this.props;
        if (!stations) return <CircularProgress />
        return (
            <div className={classes.root} style={{ height: 'auto' }}>
                <AppBar position="relative" style={{ backgroundColor: '#8dc63f', color: '#fff' }}>
                    <Tabs
                        variant="scrollable"
                        value={this.state.value}
                        indicatorColor="primary"
                        scrollButtons="auto"
                        onChange={(e, newValue) => this.onChangeHandler(e, newValue)}
                        aria-label="vertical tab"
                    >
                        {this.renderStationTabs()}
                    </Tabs>
                </AppBar>
                {this.renderStationItemList()}
            </div>
        );
    }
}

Station.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Station);
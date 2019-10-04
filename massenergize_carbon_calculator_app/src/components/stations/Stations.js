import React from 'react';
import PropTypes from 'prop-types';
import StationItem from './StationItem';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
    },
    station: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
});

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            <Box>{children}</Box>
        </Typography>
    );
}
function tabProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

class Station extends React.Component {
    state = { value: 0 };

    onChangeHandler(e, newValue) {
        this.setState({ value: newValue });
    }

    renderStationTabs() {
        let idx = 0;
        return this.props.stations.map(station => {
            return (
                <Tab key={station} label={station} {...tabProps(idx++)} />
            );
        });
    }

    renderStationItemList() {
        let idx = 0;
        return this.props.stations.map(station => {
            return (
                <TabPanel key={station} value={this.state.value} index={idx++}>
                    <StationItem value={this.state.value} station={station} />
                </TabPanel>
            );
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={this.state.value}
                    onChange={(e, newValue) => this.onChangeHandler(e, newValue)}
                    aria-label="vertical tab"
                    className={classes.station}
                >
                    {this.renderStationTabs()}
                </Tabs>
                {this.renderStationItemList()}
            </div>
        );
    }
}

Station.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Station);
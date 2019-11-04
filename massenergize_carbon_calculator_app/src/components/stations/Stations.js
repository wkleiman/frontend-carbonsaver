import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ActionItems from '../actions/actionItems';
import _ from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';

import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        flexGrow: 1,
        width: '100%'
    },
    stationIcon: {
        width: '3vh',
    }
}));

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (value === index && (

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
    ));
}
function tabProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const Stations = props => {

    const [value, setValue] = useState(0);
    const { stations } = props;

    const onChangeHandler = (e, newValue) => {
        setValue(newValue);
    }

    const renderStationTabs = () => {
        let idx = 1;
        return _.tail(stations).map(station => {
            return (
                <Tab key={`${station.name}tab`} icon={<img className={classes.stationIcon} src={station.icon} />} label={station.displayname} {...tabProps(idx++)} />
            );
        });
    }


    const renderActionList = (actions, station) => {
        const res = actions.map(action => {
            return (
                <ActionItems key={`${action.name}${station}`} action={action} />
            );
        })
        return res;
    }

    const renderStationItemList = () => {
        let idx = 1;
        return _.tail(stations).map(station => {
            return (
                <TabPanel key={station.name} value={value} index={idx++}>
                    <Paper>
                        <div style={{ padding: '16px 16px' }}>
                            <Typography variant="h4">{station.displayname}</Typography>
                            <Typography>{station.description}</Typography>
                            {renderActionList(station.actions, station.name)}
                        </div>
                    </Paper>
                </TabPanel>
            );
        })
    }
    const classes = useStyles();
    return (
        <div className={classes.root} style={{ height: 'auto' }}>
            <AppBar position="relative" style={{ backgroundColor: '#8dc63f', color: '#fff' }}>
                <Tabs
                    variant="scrollable"
                    value={value}
                    indicatorColor="primary"
                    scrollButtons="auto"
                    onChange={onChangeHandler}
                    aria-label="vertical tab"
                >
                    <Tab key={`Welcome_1tab`} label={"Welcome"} {...tabProps(0)} />
                    {renderStationTabs()}
                </Tabs>
            </AppBar>
            <TabPanel key={stations[0].name} value={value} index={0}>
                <Paper style={{ padding: '16px 16px' }}>
                    <Typography variant="h4">{stations[0].displayname}</Typography>
                    <Typography>{stations[0].description}</Typography>
                    {renderActionList(stations[0].actions, stations[0].name)}
                </Paper>
            </TabPanel>
            {renderStationItemList()}
        </div>
    );
}

export default Stations;
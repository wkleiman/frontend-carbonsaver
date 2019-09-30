import React from 'react';
import PropTypes from 'prop-types';
import ActionList from '../actions/actionList';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box>{children}</Box>
        </Typography>
    );
}

const StyledTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > div': {
            maxWidth: 40,
            width: '100%',
            backgroundColor: '#fff',
        },
    },
})(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles(theme => ({
    root: {
        textTransform: 'none',
        backgroundColor: '#1E73BE',
        color: '#fff',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        '&:focus': {
            opacity: 1,
        },
    },
}))(props => <Tab disableRipple {...props} />);

const styles = {
    root: {
        flexGrow: 1,
    },
    station: {
        backgroundColor: '#fafafa'
    },
};

class Station extends React.Component {
    state = { value: 0 };

    onChangeHandler(e, newValue) {
        this.setState({ value: newValue });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.station}>
                    <StyledTabs value={this.state.value} onChange={(e, newValue) => this.onChangeHandler(e, newValue)} aria-label="styled tabs example" >
                        <StyledTab label="Station 1" />
                        <StyledTab label="Station 2" />
                    </StyledTabs>
                    <TabPanel value={this.state.value} index={0}>
                        <ActionList />
                    </TabPanel>
                </div>
            </div>
        );
    }
}

Station.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Station);
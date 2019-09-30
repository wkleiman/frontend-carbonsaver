import React from 'react';
import { connect } from 'react-redux';
import { fetchActionInfo } from '../../actions';
import _ from 'lodash';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import QList from '../questions/QList';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Typography from '@material-ui/core/Typography';
import InfoIconOutlined from '@material-ui/icons/InfoOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const InfoTooltip = withStyles(theme => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);

class ActionItems extends React.Component {
    componentDidMount() {
        this.props.fetchActionInfo(this.props.action.name);
    }

    render() {
        if (typeof this.props.action.helptext === 'undefined') {
            return (
                <div>
                    <CircularProgress />
                </div>
            );
        } else {
            return (
                <React.Fragment>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMore />} aria-controls="panel1c-content" id="panel1c-header" >
                            <Typography variant="h5">{this.props.action.description}</Typography>
                            <InfoTooltip title={this.props.action.helptext} >
                                <InfoIconOutlined color="primary" style={{ padding: 5 }} />
                            </InfoTooltip>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <QList questions={this.props.action.questions} />
                        </ExpansionPanelDetails>
                        <Divider />
                    </ExpansionPanel>
                </React.Fragment>
            );
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        action_info: state.action_info
    };
}


export default connect(mapStateToProps, { fetchActionInfo })(ActionItems);

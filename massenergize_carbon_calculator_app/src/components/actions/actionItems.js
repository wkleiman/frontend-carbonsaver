//React and Redux Component
import React from 'react';
import { connect } from 'react-redux';
import { fetchActionInfo } from '../../actions';

//Styling Component
import ExpandMore from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import QList from '../questions/QList';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';


class ActionItems extends React.Component {
    componentDidMount() {
        this.props.fetchActionInfo(this.props.action_tag);
    }



    render() {
        const { action } = this.props;
        if (!action) {
            return (
                <div>
                    <CircularProgress />
                </div>
            );
        }

        return (
            <React.Fragment>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMore />} aria-controls="panel1c-content" id="panel1c-header" >
                        <Typography variant="h5">{action.description}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container direction="column">
                            <Grid item><Typography>{action.helptext}</Typography></Grid>
                            <Grid item><QList action={action} questions={action.questions} /></Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                    <Divider />
                </ExpansionPanel>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        action: state.actions[ownProps.action_tag],
    };
}


export default connect(mapStateToProps, { fetchActionInfo })(ActionItems);

//React and Redux Component
import React from 'react';
import QList from '../questions/QList';
import _ from 'lodash';
import { connect } from 'react-redux';
import { questionAnswered, getScore } from '../../actions';

//Styling Component
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


class ActionItems extends React.Component {


    renderQuestionList() {
        const { action } = this.props;
        return (
            _.tail(action.questionInfo).map(question => {
                if (this.isSkip(question.name)) return <React.Fragment key={`${action.name}${question.name}`}></React.Fragment>;
                return (
                    <React.Fragment key={`${action.name}${question.name}`}>
                        <QList action={action} question={question} />
                    </React.Fragment>
                );
            }));
    }

    handleClick = (e) => {
        const { action } = this.props;
        this.props.getScore(null, action.name, this.props.answered)
    }

    renderActionScore() {
        const { answered } = this.props;
        if (!answered || !answered.score) { return "Are You Going To Do This?" }
        else {
            const score = Object.values(answered.score);
            let description = score.pop();
            return (!score) ? "Are You Going To Do This?" : `${description} You Earned ${score.reduce((a, b) => a + b, 0)} points!`
        }
    }

    isSkip(questionName) {
        let skip = Object.values(this.props.skip);
        if (skip.length === 0) return false;
        skip = skip.flat(1);
        return (skip.includes(questionName) && !this.props.skip[this.props.action.name])
    }

    render() {
        const { action } = this.props;
        return (
            <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
                <ExpansionPanelSummary expandIcon={<ExpandMore />} aria-controls="panel1c-content" id="panel1c-header" >
                    <Typography variant="h5">
                        {action.description}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container direction="column">
                        <Grid item><Typography variant="h4">Did You Know?</Typography></Grid>
                        <Grid item><Typography>{action.helptext}</Typography></Grid>
                        <Grid item>
                            <List >
                                <QList action={action} question={action.questionInfo[0]} />
                                {this.renderQuestionList()}
                            </List>
                            <Typography>{this.renderActionScore()}</Typography>
                            <Button onClick={this.handleClick}>I'll Do It!</Button>
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
                <Divider />
            </ExpansionPanel>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let allAnswered = Object.assign({}, state.answered);
    delete allAnswered.skip;
    return {
        allAnswered: Object.values(allAnswered),
        answered: state.answered[ownProps.action.name],
        skip: state.answered.skip
    }
}

export default connect(mapStateToProps, { questionAnswered, getScore })(ActionItems);

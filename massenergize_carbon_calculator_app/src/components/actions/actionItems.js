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

    // && !(question.name in answered)
    renderQuestionList() {
        const { action, answered } = this.props;
        return (
            _.tail(action.questionInfo).map(question => {
                if (answered) {
                    const [isQAnswered, actionOfAnswered] = this.isAnswered(question.name)
                    if (this.isSkip(question.name) || (isQAnswered && actionOfAnswered !== action.name)) return <React.Fragment key={`${action.name}${question.name}`}></React.Fragment>;
                }
                return (
                    <React.Fragment key={`${action.name}${question.name}`}>
                        <QList action={action} question={question} recordAnswered={this.recordAnswered} />
                    </React.Fragment>
                );
            }));
    }

    recordAnswered = (question) => {
        this.props.onAnswered(question);
    }

    handleClick = (e) => {
        const { action } = this.props;
        this.props.getScore(this.props.auth.userID, action.name, this.props.answered);
        // this.props.getScore(null, action.name, this.props.answered);
    }

    renderActionScore() {
        const { answered } = this.props;
        if (!answered || !answered.score) { return <></> }
        else {
            const score = Object.values(answered.score);
            let description = score.pop();
            return (!score) ? <></> : <Typography>{`${description} You Earned ${score.reduce((a, b) => a + b, 0)} points!`}</Typography>;
        }
    }

    isAnswered(questionName) {
        const { allAnswered } = this.props;
        for (let answeredAction in allAnswered) {
            for (let answeredQ of Object.keys(allAnswered[answeredAction])) {
                if (answeredQ === questionName) {
                    return [true, answeredAction];
                }
            }
        }
        return [false, ''];
    }

    isSkip(questionName) {
        let skip = Object.values(this.props.skip);
        if (skip.length === 0) return false;
        skip = skip.flat(1);
        return (skip.includes(questionName) && !this.props.skip[this.props.action.name]);
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
                                <QList action={action} question={action.questionInfo[0]} recordAnswered={this.recordAnswered} />
                                {this.renderQuestionList()}
                            </List>
                            {this.renderActionScore()}
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
    let { skip, ...allAnswered } = state.answered;
    return {
        allAnswered,
        answered: allAnswered[ownProps.action.name],
        skip,
        auth: state.auth,
    }
}

export default connect(mapStateToProps, { questionAnswered, getScore })(ActionItems);

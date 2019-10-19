import React from 'react';
import { connect } from 'react-redux';
import { questionAnswered, getScore } from '../../actions';
import QDetails from './QDetails';
import List from '@material-ui/core/List';
import _ from 'lodash';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


class QList extends React.Component {

    onChangeHandler = (e, questionTag, skipQTag) => {
        const { questionAnswered, action } = this.props
        e.preventDefault();
        if (skipQTag) {
            questionAnswered(action.name, questionTag, e.target.value, skipQTag.skip);
        }
        else questionAnswered(action.name, questionTag, e.target.value);
    }

    isSkip = (question) => {
        const { skipQs } = this.props;
        if (!skipQs) return false;
        let res = false;
        Object.values(skipQs).forEach(questionTag => {
            res = res || ((!questionTag.skipTags) ? false : (questionTag.skipTags.filter(skipQTags => {
                return skipQTags === question
            }).length !== 0));
        })
        return res;
    }

    renderList() {
        const { questions } = this.props;
        return (
            _.tail(questions).map(question => {
                return (
                    <React.Fragment>{(this.isSkip(question.name)) ? <></> :
                        <QDetails question={question} onAnswered={this.onChangeHandler} />}</React.Fragment>
                );
            }));
    }

    handleClick = (e) => {
        const { action, answered } = this.props;
        this.props.getScore(action.name, answered)
    }

    render() {
        const { questions, action } = this.props;
        const { score } = action;
        return (
            <>
                <List >
                    <QDetails question={questions[0]} onAnswered={this.onChangeHandler} />
                    {this.renderList()}
                </List>
                <Typography>{(!score) ? "Are You Going To Do This?" : `Congrats! You Earned ${Object.values(score).reduce((a, b) => a + b, 0)} / ${action.average_carbon_points} points!`}</Typography>
                <Button onClick={this.handleClick}>I'll Do It!</Button>
            </>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        skipQs: state.skip,
        answered: state.answered[ownProps.action.name]
    }
}

export default connect(mapStateToProps, { questionAnswered, getScore })(QList);
import React from 'react';
import { connect } from 'react-redux';
import { questionAnswered, getScore } from '../../actions';
import _ from 'lodash';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


class QList extends React.Component {

    onChangeHandler = (response) => (e) => {
        const { questionAnswered, action, question } = this.props
        if (!response) {
            questionAnswered(action.name, question.name, e.target.value);
            return;
        }
        questionAnswered(action.name, question.name, e.target.value, response[e.target.value].skip);
    }

    renderAnswer() {
        const { action, question } = this.props;
        let response = _.mapKeys(question.responses, 'text')
        let value = (!this.props.answered || !this.props.answered[question.name]) ? '' : this.props.answered[question.name]
        if (question.questionType === "Choice") {
            return (
                <RadioGroup aria-label="response" value={value} onChange={this.onChangeHandler(response)}>
                    {this.props.question.responses.map(response => {
                        return (
                            <FormControlLabel key={`${action.name}${question.name}${response.text}`} value={response.text} control={<Radio />} label={response.text} />
                        );
                    })}
                </RadioGroup>
            );
        } else {
            return <TextField value={value} placeholder="Please answer the above question" onChange={this.onChangeHandler()} />
        }
    }

    render() {
        const { question } = this.props;
        return (
            <>
                <ListItemText primary={question.questionText} />
                <List>
                    <FormControl component="fieldset">
                        {this.renderAnswer()}
                    </FormControl>
                </List >
            </>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        skip: state.answered.skip,
        answered: state.answered[ownProps.action.name]
    }
}

export default connect(mapStateToProps, { questionAnswered })(QList);
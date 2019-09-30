import React from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';


class QForm extends React.Component {
    state = { value: '' };

    onChangeHandler(e, questionTag) {
        this.setState({ value: e.target.value });
        this.props.onAnswered(e, questionTag);
    }

    renderAnswer() {
        const { question } = this.props;
        if (typeof this.props.question.responses === 'object') {
            return (
                <RadioGroup aria-label="response" value={this.state.value} onChange={e => this.onChangeHandler(e, question.questionTag)}>
                    {this.props.question.responses.map(response => {
                        return (
                            <React.Fragment
                                key={response}>
                                <FormControlLabel value={response} control={<Radio />} label={response} />
                            </React.Fragment>
                        );
                    })
                    }
                </RadioGroup>
            );
        } else if (this.props.question.responses.length === 0) {
            return <TextField value={this.state.value} placeholder="Please answer the above question" onChange={e => this.onChangeHandler(e, question.questionTag)} />
        } else if (this.props.question.responses === 0) {
            return <TextField value={this.state.value} placeholder="Please answer the above question" onChange={e => this.onChangeHandler(e, question.questionTag)} />
        }
        else return <div>{this.props.question.responses}</div>
    }

    render() {
        return (
            <>
                <ListItemText primary={this.props.question.questionText} />
                <List>
                    <FormControl component="fieldset">
                        {this.renderAnswer()}
                    </FormControl>
                </List >
            </>
        );

    }
}

const mapStateToProps = state => {
    return {
        answered: state.answered_questions
    }
}

export default connect(mapStateToProps, null)(QForm);
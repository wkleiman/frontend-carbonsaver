import React from 'react';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';


class QForm extends React.Component {
    state = { value: '' }

    onChangeHandler(e) {
        const { question } = this.props;
        this.setState({ value: e.target.value });
        this.props.onAnswered(e, question.name, ...question.responses.filter(response => response.text === e.target.value));
    }

    renderAnswer() {
        const { question } = this.props;
        if (question.questionType === "Choice") {
            return (
                <RadioGroup aria-label="response" value={this.state.value} onChange={e => this.onChangeHandler(e)}>
                    {this.props.question.responses.map(response => {
                        return (
                            <React.Fragment>
                                <FormControlLabel value={response.text} control={<Radio />} label={response.text} />
                            </React.Fragment>
                        );
                    })
                    }
                </RadioGroup>
            );
        } else {
            return <TextField value={this.state.value} placeholder="Please answer the above question" onChange={e => this.onChangeHandler(e, question.name)} />
            // } else if (this.props.question.responses === 0) {
            //     return <TextField value={this.state.value} placeholder="Please answer the above question" onChange={e => this.onChangeHandler(e, question.questionTag)} />
            // }
            // else return <div>{this.props.question.responses}</div>
        }
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
            // <div>QForm</div>
        );

    }
}


export default QForm;
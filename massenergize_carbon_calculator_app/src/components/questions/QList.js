import React from 'react';
import { connect } from 'react-redux';
import { questionAnswered } from '../../actions';
import List from '@material-ui/core/List';
import QForm from './QForm';
import Collapse from '@material-ui/core/Collapse';

class QList extends React.Component {
    state = { value: '' };

    onChangeHandler = (e, questionTag) => {
        this.setState({ value: e.target.value });
        this.props.questionAnswered(questionTag, e.target.value);
    }


    renderList() {
        const { questions, answered } = this.props;
        return (
            questions.map(question => {
                return (
                    <React.Fragment key={question.questionTag}>
                        {/* <Collapse in={(Object.entries(answered).length === 0 && answered.constructor === Object) || (questions[0].questionTag in answered)}> */}
                        <QForm question={question} onAnswered={this.onChangeHandler} />
                        {/* </Collapse> */}
                    </React.Fragment>);
            }));
    }

    render() {
        return (
            <List >
                {this.renderList()}
            </List>
        );
    }
}

const mapStateToProps = state => {
    return {
        answered: state.answered
    }
}

export default connect(mapStateToProps, { questionAnswered })(QList);
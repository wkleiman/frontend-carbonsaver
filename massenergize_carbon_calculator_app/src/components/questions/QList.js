import React from 'react';
import { connect } from 'react-redux';
import { questionAnswered } from '../../actions';
import QForm from './QForm';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';

class QList extends React.Component {
    state = { firstQuestionAnswered: false };

    onChangeHandler = (e, questionTag) => {
        if (questionTag === this.props.questions[0].questionTag)
            this.setState({ firstQuestionAnswered: true });
        this.props.questionAnswered(questionTag, e.target.value);
    }


    renderList() {
        const { questions } = this.props;
        return (
            questions.map(question => {
                return (
                    <React.Fragment key={question.questionTag}>
                        <Collapse in={(this.state.firstQuestionAnswered && this.props.answered[questions[0].questionTag].answer === "Yes") || question.questionTag === questions[0].questionTag}>
                            <QForm question={question} onAnswered={this.onChangeHandler} />
                        </Collapse>
                    </React.Fragment >);
            }));
    }

    render() {
        return (
            // <div>QList</div>
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
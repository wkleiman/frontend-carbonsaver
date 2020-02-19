<<<<<<< HEAD:massenergize_carbon_calculator_app/src/components/pages/actions/actionItems.js
/* eslint-disable guard-for-in */
// React and Redux Component
import React from 'react'
import PropType from 'prop-types'
import _ from 'lodash'
import { connect } from 'react-redux'
=======
//React and Redux Component
import React from "react";
import QList from "../questions/QList";
import _ from "lodash";
import { connect } from "react-redux";
import { questionAnswered, getScore } from "../../actions/";
>>>>>>> BHN-fixes:massenergize_carbon_calculator_app/src/components/actions/actionItems.js

// Styling Component
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Divider from '@material-ui/core/Divider'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { questionAnswered, getScore } from '../../../actions'
import QList from '../questions/QList'

// TODO: Add What's it worth button next to I'll Do It to display how much user's answer worth before saving it to database
class ActionItems extends React.Component {
  // Rendering Question List
  // TODO: Make component rerender to hide information, and add answered to action object in application state
<<<<<<< HEAD:massenergize_carbon_calculator_app/src/components/pages/actions/actionItems.js
=======
  renderQuestionList() {
    //const { action, answered, questionAnswered } = this.props;
    const { action, answered } = this.props;
    return _.tail(action.questionInfo).map(question => {
      // Check if Question has been answered
      if (answered) {
        const [isQAnswered, actionOfAnswered] = this.isAnswered(question.name);
        console.log(isQAnswered);
        console.log(actionOfAnswered);
        // Check if question is in Skip object of application state
        if (this.isSkip(question.name)) {
          // Hide question if any of above true
          return (
            <React.Fragment
              key={`${action.name}${question.name}`}
            ></React.Fragment>
          );
        }
        // Case where question is answered but the action is different
        // if(isQAnswered && actionOfAnswered !== action.name){
        //   // Update the Redux state of current action with the answer
        //   questionAnswered(action.name, question.name, _.get(answered, `${question.name}`))
        //   return (<React.Fragment
        //       key={`${action.name}${question.name}`}
        //     ></React.Fragment>)
        // }
      }
>>>>>>> BHN-fixes:massenergize_carbon_calculator_app/src/components/actions/actionItems.js

  // Add answered question to application state
  recordAnswered = question => {
    const { onAnswered } = this.props
    onAnswered(question)
  }

  // Post Click to calculate points and save user answers
  handlePostClick = () => {
    const { action, getScore, auth, answered } = this.props
    getScore(auth.userID, action.name, answered)
  }

  // Get to calculate points to see how much user's current answers worth
  handleGetClick = () => {
    const { action, getScore, auth, answered } = this.props
    getScore(action.name, answered)
  }

  // Check if question answered function
  // Param: question name
  // Return: 1st param: boolean indicate is answered or not, 2nd param: action name
  isAnswered(questionName) {
    const { allAnswered } = this.props
    // Loop through answered object in application state with key as action
    for (const answeredAction in allAnswered) {
      // Loop through answered action to see which question was answered
      for (const answeredQ of Object.keys(allAnswered[answeredAction])) {
        // If questionName existed in the answered action object
        if (answeredQ === questionName) {
          return [true, answeredAction]
        }
      }
    }
    return [false, '']
  }

  // Check if question is in skip object of application
  // Param: question name
  // return: boolean
  isSkip(questionName) {
    const { skip: skipProps, action } = this.props
    // Get array of skip object with question names as values
    let skip = Object.values(skipProps)
    // Check if skip object is empty
    if (skip.length === 0) return false
    // Flatten the object
    skip = skip.flat(1)
    // Check if skip object has question and the action has been answered
    return skip.includes(questionName) && !skip[action.name]
  }

  // Render points to screen
  renderActionScore() {
    const { answered } = this.props
    if (!answered || !answered.score) {
      return <></>
    }
    const score = Object.values(answered.score)
    const description = score.pop()
    return !score ? (
      <></>
    ) : (
      <Typography>{`${description} You Earned ${score.reduce(
        (a, b) => a + b,
        0
      )} points!`}</Typography>
    )
  }

  renderQuestionList() {
    const { action, answered, questionAnswered } = this.props
    return _.tail(action.questionInfo).map(question => {
      // Check if Question has been answered
      if (answered) {
        const [isQAnswered, actionOfAnswered] = this.isAnswered(question.name)
        // Check if question is in Skip object of application state
        if (this.isSkip(question.name)) {
          // Hide question if any of above true
          return (
            <React.Fragment
              key={`${action.name}${question.name}`}
            ></React.Fragment>
          )
        }
        // Check if questions is answered and the current quesion's action is not the same
        if (isQAnswered && actionOfAnswered !== action.name) {
          // questionAnswered(actionOfAnswered, question.name, )
        }
      }

      // Render the question otherwise
      return (
        <React.Fragment key={`${action.name}${question.name}`}>
          <QList
            action={action}
            question={question}
            recordAnswered={this.recordAnswered}
          />
        </React.Fragment>
      )
    })
  }

  render() {
    const { action } = this.props
    // Render object rendering layout of each action
    return (
      <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <Typography variant="h5">{action.description}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h4">Did You Know?</Typography>
            </Grid>
            <Grid item>
              <Typography>{action.helptext}</Typography>
            </Grid>
            <Grid item>
              <List>
                <QList
                  action={action}
                  question={action.questionInfo[0]}
                  recordAnswered={this.recordAnswered}
                />
                {this.renderQuestionList()}
              </List>
              {this.renderActionScore()}
              <Button onClick={this.handlePostClick}>I'll Do It!</Button>
              <Button onClick={this.handleGetClick}>What's It Worth?</Button>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
        <Divider />
      </ExpansionPanel>
    )
  }
}
// Map answered object, get answered of this action, skip object, and authentication from application state
const mapStateToProps = (state, ownProps) => {
  const { skip, ...allAnswered } = state.answered
  return {
    allAnswered,
    answered: allAnswered[ownProps.action.name],
    skip,
    auth: state.auth,
  }
}

ActionItems.propTypes = {
  action: PropType.shape({
    questionInfo: PropType.array,
    helptext: PropType.string,
    description: PropType.string,
    name: PropType.string,
  }),
  skip: PropType.object,
  questionAnswered: PropType.func,
  answered: PropType.object,
  getScore: PropType.func,
  auth: PropType.shape({
    userID: PropType.string,
  }),
  onAnswered: PropType.func,
}
// Export and connect component to actions
export default connect(mapStateToProps, { questionAnswered, getScore })(
  ActionItems
)

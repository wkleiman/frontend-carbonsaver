//React and Redux Component
import React from "react";
import QList from "../questions/QList";
import _ from "lodash";
import { connect } from "react-redux";
import { questionAnswered, getScore, postScore, unpostScore } from "../../actions/";

//Styling Component
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// TODO: Add What's it worth button next to I'll Do It to display how much user's answer worth before saving it to database
class ActionItems extends React.Component {
	constructor(props) {
		super(props);
    this.estimated = false;
    this.committed = false;
	}


  // Rendering Question List
  // TODO: Make component rerender to hide information, and add answered to action object in application state
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

      // Render the question otherwise
      return (
        <React.Fragment key={`${action.name}${question.name}`}>
          <QList
            action={action}
            question={question}
            recordAnswered={this.recordAnswered}
          />
        </React.Fragment>
      );
    });
  }
  // Add answered question to application state
  recordAnswered = question => {
    this.props.onAnswered(question);
  };
  // Post Click to calculate points and save user answers
  handlePostClick = e => {
    const { action } = this.props;
    this.props.postScore(
      this.props.auth.userID,
      action.name,
      this.props.answered
    );
    this.committed = true;
  };
   // UnPost Click to revert answer to post
   handleUnPostClick = e => {
    const { action } = this.props;
    this.props.unpostScore(
      this.props.auth.userID,
      action.name,
      this.props.answered
    );
    this.committed = false;
  };
// Get to calculate points to see how much user's current answers worth
  handleGetClick = e => {
    const { action } = this.props;
    this.props.getScore(
      this.props.auth.userID,
      action.name,
      this.props.answered
    );
    this.estimated = true;
  };
  
  // Render points to screen
  renderActionScore() {
    const { answered } = this.props;
    if (!answered || !answered.score) {
      return <></>;
    } else {
      const score = Object.values(answered.score);
      let description = score.pop();
      return !score ? (
        <></>
      ) : (
        <Typography>{`Points earned:  Cost  Savings ${description}`}</Typography>
      );
    }
  }

    // Render points to screen
    renderActionCommit() {
      const { answered } = this.props;
      if (!answered || !answered.score) {
        return <></>;
      } else {
        const score = Object.values(answered.score);
        let description = score.pop();
        return !score ? (
          <></>
        ) : (
          <Typography>{`You Earned ${score.reduce(
            (a, b) => a + b,
            0
          )} points!`}</Typography>
        );
      }
    }
  
  // Check if question answered function
  // Param: question name
  // Return: 1st param: boolean indicate is answered or not, 2nd param: action name
  isAnswered(questionName) {
    const { allAnswered } = this.props;
    // Loop through answered object in application state with key as action
    for (let answeredAction in allAnswered) {
      // Loop through answered action to see which question was answered
      for (let answeredQ of Object.keys(allAnswered[answeredAction])) {
        // If questionName existed in the answered action object
        if (answeredQ === questionName) {
          return [true, answeredAction];
        }
      }
    }
    return [false, ""];
  }
  // Check if question is in skip object of application
  // Param: question name
  // return: boolean
  isSkip(questionName) {
    // Get array of skip object with question names as values
    let skip = Object.values(this.props.skip);
    // Check if skip object is empty
    if (skip.length === 0) return false;
    // Flatten the object
    skip = skip.flat(1);
    // Check if skip object has question and the action has been answered
    return (
      skip.includes(questionName) && !this.props.skip[this.props.action.name]
    );
  }

  render() {
    const { action } = this.props;
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
              {this.estimated ? 
                this.renderActionScore() 
                :
                <div classname="button">
                  <Button onClick={this.handleGetClick}>What's It Worth?</Button>
                </div>
              }
              {this.committed ? 
                
                <div classname="button">
                  <Button onClick={this.handleUnPostClick}>Changed my mind!</Button>
                  {this.renderActionCommit()}
                </div>
                
                :
                <div classname="button">
                  <Button onClick={this.handlePostClick}>I'll Do It!</Button>
                </div>
               } 
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
        <Divider />
      </ExpansionPanel>
    );
  }
}
// Map answered object, get answered of this action, skip object, and authentication from application state
const mapStateToProps = (state, ownProps) => {
  let { skip, ...allAnswered } = state.answered;
  return {
    allAnswered,
    answered: allAnswered[ownProps.action.name],
    skip,
    auth: state.auth
  };
};
// Export and connect component to actions
export default connect(mapStateToProps, { questionAnswered, getScore, postScore, unpostScore})(
  ActionItems
);

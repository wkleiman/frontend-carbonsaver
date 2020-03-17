// React and Redux Component
import React from 'react'
import _ from 'lodash'
import PropType from 'prop-types'

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
import QList from '../questions/QList'
import { getScore, unpostScore, postScore } from '../../../../actions'
import { useScoreState } from '../../../context/ScoreContext'
import { useAnsweredState } from '../../../context/AnsweredContext'
import { useSkipState } from '../../../context/SkipContext'
import { useAuthState } from '../../../context/AuthContext'

// TODO: Add What's it worth button next to I'll Do It to display how much user's answer worth before saving it to database
const ActionItems = props => {
  const [estimated, setEstimated] = React.useState(false)
  const [actionScore, setActionScore] = React.useState()
  const [committed, setCommitted] = React.useState(false)
  const { action, expanded, setExpanded } = props
  const { authState } = useAuthState()
  const { skipState } = useSkipState()
  const { scoreState, setScoreState } = useScoreState()
  const { answeredState } = useAnsweredState()

  // Rendering Question List
  // TODO: Make component rerender to hide information, and add answered to action object in application state

  const getAnswer = () => {
    if (!answeredState) return
    const actionQAnswered = {}
    action.questionInfo.forEach(question => {
      actionQAnswered[question.name] = answeredState[question.name]
    })
    return actionQAnswered
  }

  const updateScore = score => {
    const sumScoreWithCategory = {}
    if (!scoreState) {
      setScoreState(score)
    } else {
      Object.keys(score).forEach(category => {
        if (typeof score[category] === 'number') {
          sumScoreWithCategory[category] =
            scoreState[category] + score[category]
        } else {
          sumScoreWithCategory[category] = score[category]
        }
      })
      setScoreState(sumScoreWithCategory)
    }
  }

  // Post Click to calculate points and save user answers
  const handlePostClick = async () => {
    const actionAnswers = getAnswer()
    if (!actionAnswers) return
    const score = await postScore({
      userId: authState.id,
      actionName: action.name,
      ...actionAnswers,
    })
    updateScore(score)
    setCommitted(true)
  }

  // UnPost Click to revert answer to post
  const handleUnPostClick = async () => {
    const score = await unpostScore({
      userId: authState.id,
      actionName: action.name,
    })
    updateScore(score)
    setCommitted(false)
    setEstimated(false)
  }

  // Get to calculate points to see how much user's current answers worth
  const handleGetClick = async () => {
    const actionAnswers = getAnswer()
    if (!actionAnswers) return
    const score = await getScore({
      actionName: action.name,
      ...actionAnswers,
    })
    delete score.status
    setActionScore(score)
    setEstimated(true)
  }

  const renderQuestionList = () =>
    _.tail(action.questionInfo).map(
      question =>
        !skipState.includes(question.name) && (
          <React.Fragment key={`${action.name}${question.name}`}>
            <QList actionName={action.name} question={question} />
          </React.Fragment>
        )
    )

  // Render points to screen
  const renderActionScore = () =>
    answeredState &&
    actionScore && (
      <Typography>
        {`Carbon points: ${actionScore.carbon_points} Savings: $ ${actionScore.savings}`}
      </Typography>
    )

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  // Render object rendering layout of each action
  return (
    <ExpansionPanel
      TransitionProps={{ unmountOnExit: true }}
      expanded={expanded === action.name}
      onChange={handleChange(action.name)}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1c-content"
        id="panel1c-header"
      >
        <Typography variant="h6">{action.description}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h6">Did You Know?</Typography>
          </Grid>
          <Grid item>
            <Typography>{action.helptext}</Typography>
          </Grid>
          <Grid item>
            <List>
              <QList
                actionName={action.name}
                question={action.questionInfo[0]}
              />
              {renderQuestionList()}
            </List>
            {estimated ? (
              actionScore && renderActionScore()
            ) : (
              <Button
                onClick={e => {
                  handleGetClick(e)
                }}
              >
                What's It Worth?
              </Button>
            )}
            {committed && (
              <Grid container>
                <Grid item>{actionScore.explanation}</Grid>
                <Grid item>
                  <Button
                    onClick={e => {
                      handleUnPostClick(e)
                    }}
                  >
                    Changed my mind!
                  </Button>
                </Grid>
              </Grid>
            )}
            {!committed && estimated && (
              <Button
                onClick={e => {
                  handlePostClick(e)
                }}
              >
                I'll Do It!
              </Button>
            )}
            {!committed && !estimated && (
              <Typography>Find out worth before committing</Typography>
            )}
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
      <Divider />
    </ExpansionPanel>
  )
}
ActionItems.propTypes = {
  action: PropType.shape({
    questionInfo: PropType.array,
    helptext: PropType.string,
    description: PropType.string,
    name: PropType.string,
  }),
  expanded: PropType.string,
  setExpanded: PropType.func,
}
// Export and connect component to actions
export default ActionItems

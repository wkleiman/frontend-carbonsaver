// Functional imports
import React from 'react'
import { connect } from 'react-redux'
// Styling imports
import Typography from '@material-ui/core/Typography'
// Total Score component
class Score extends React.Component {
  render() {
    return (
      <Typography
        variant="h4"
        style={{
          color: '#8dc63f',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        Total Score: {this.props.totalScore}{' '}
      </Typography>
    )
  }
}

const mapStateToProps = state => {
  // Since score is attached to the answered object, have to filter out actions that was sent to save in the database
  const actions = Object.values(state.answered).filter(action => action.score)
  let score = 0
  // Check if the answer was submitted
  if (actions.length === 0) score = 0
  else if (actions.length !== 0) {
    // Loop through actions to calculate the sum
    actions.forEach(action => {
      const actionScore = Object.values(action.score)
      actionScore.pop()
      score += actionScore.reduce((a, b) => a + b, 0)
    })
  }
  // Map the score to the props of Score component
  return {
    totalScore: score,
  }
}
// Connect mapstatetoprops to score component
export default connect(mapStateToProps)(Score)

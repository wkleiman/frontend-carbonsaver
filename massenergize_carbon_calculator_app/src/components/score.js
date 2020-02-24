// Functional imports
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { useScoreState } from './context/ScoreContext'
// Styling imports
// Total Score component
const Score = props => {
  const { scoreState, setScoreState } = useScoreState()
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
      Total Score: {scoreState ? scoreState.carbon_points : 0} Cost:{' '}
      {scoreState ? scoreState.cost : 0} Saving:{' '}
      {scoreState ? scoreState.savings : 0}
    </Typography>
  )
}

// Connect mapstatetoprops to score component
export default Score

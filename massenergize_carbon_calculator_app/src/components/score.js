// Functional imports
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { useScoreState } from './context/ScoreContext'

// Total Score component
const Score = () => {
  const { scoreState } = useScoreState()
  return (
    <Typography
      variant="h6"
      style={{
        color: '#8dc63f',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      Carbon Points: {scoreState ? scoreState.carbon_points : 0} {'  '}
      Savings: ${' '} {scoreState ? scoreState.savings : 0}
    </Typography>
  )
}

// Connect mapstatetoprops to score component
export default Score

import React from 'react'
import { SCORES as scores } from './testScore'

const ScoreCategoryRow = props => {
  const { category } = props

  return (
    <tr>
      <th colSpan="3">{category}</th>
    </tr>
  )
}

const ScoreRow = props => {
  const { score } = props
  const { members } = score
  const name =
    members > 0 ? (
      score.name
    ) : (
      <span style={{ color: 'red' }}>{score.name}</span>
    )
  const { points } = score
  return (
    <tr>
      <td>{name}</td>
      <td>{points}</td>
      <td>{members}</td>
    </tr>
  )
}

const ScoreBoardPage = () => {
  let lastCategory
  return (
    <div className="scoreBoard">
      <h1>Score Board</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Points</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {scores.map(score => {
            if (score.category !== lastCategory) lastCategory = score.category
            return (
              <>
                {score.category !== lastCategory && (
                  <ScoreCategoryRow
                    category={score.category}
                    key={score.category}
                  />
                )}
                <ScoreRow score={score} key={score.name} />
              </>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ScoreBoardPage

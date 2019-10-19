import React from 'react'
import { connect } from 'react-redux';

class Score extends React.Component {
    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}> Score: {this.props.totalScore} </div>
        );
    }
}

const sumOfArrEl = arr => arr.reduce((a, b) => a + b, 0)

const mapStateToProps = state => {
    const actions = Object.values(state.actions).filter(action => action.score);
    let score = 0;
    if (actions.length === 0) score = 0;
    else if (actions.length !== 0) {
        actions.forEach(action => {
            score += Object.values(action.score).reduce((a, b) => a + b, 0);
        })
    }
    //const sumScore = scoredActions.length !== 0 ? scoredActions.reduce((a, b) => a + sumOfArrEl(Object.values(b.scores)), 0) : 0;
    return {
        totalScore: score,
    }
}
export default connect(mapStateToProps)(Score);
import React from 'react'
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';

class Score extends React.Component {
    render() {
        return (
            <Typography variant="h4" style={{ color: '#8dc63f', fontWeight: 'bold', display: 'flex', justifyContent: 'center' }}>Total Score: {this.props.totalScore} </Typography>
        );
    }
}

const mapStateToProps = state => {
    const actions = Object.values(state.answered).filter(action => action.score);
    let score = 0;
    if (actions.length === 0) score = 0;
    else if (actions.length !== 0) {
        actions.forEach(action => {
            let actionScore = Object.values(action.score);
            actionScore.pop();
            score += actionScore.reduce((a, b) => a + b, 0);
        })
    }
    return {
        totalScore: score,
    }
}
export default connect(mapStateToProps)(Score);
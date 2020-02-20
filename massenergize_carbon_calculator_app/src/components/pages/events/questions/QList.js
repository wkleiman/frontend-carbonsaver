import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import { questionAnswered } from '../../../../actions'

const QList = props => {
  const { recordAnswered, questionAnswered, action, question, answered } = props

  const onChangeHandler = response => e => {
    if (!response) {
      questionAnswered(action.name, question.name, e.target.value)
    } else {
      questionAnswered(
        action.name,
        question.name,
        e.target.value,
        response[e.target.value].skip
      )
    }
    recordAnswered(question.name)
  }

  const renderAnswer = () => {
    const response = _.mapKeys(question.responses, 'text')
    const value =
      !answered || !answered[question.name] ? '' : answered[question.name]
    if (question.questionType === 'Choice') {
      return (
        <RadioGroup
          aria-label="response"
          value={value}
          onChange={onChangeHandler(response)}
        >
          {question.responses.map(response => (
            <FormControlLabel
              key={`${action.name}${question.name}${response.text}`}
              value={response.text}
              control={<Radio />}
              label={response.text}
            />
          ))}
        </RadioGroup>
      )
    }
    return (
      <TextField
        value={value}
        placeholder="Please answer the above question"
        onChange={onChangeHandler()}
      />
    )
  }

  return (
    <>
      <ListItemText primary={question.questionText} />
      <List>
        <FormControl component="fieldset" style={{ width: '100%' }}>
          {renderAnswer()}
        </FormControl>
      </List>
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  skip: state.answered.skip,
  answered: state.answered[ownProps.action.name],
})

export default connect(mapStateToProps, { questionAnswered })(QList)

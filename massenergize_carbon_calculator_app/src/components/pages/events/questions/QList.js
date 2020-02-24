import React from 'react'
import _ from 'lodash'
import PropType from 'prop-types'

import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import { useSkipState } from '../../../context/SkipContext'
import { useAnsweredState } from '../../../context/AnsweredContext'

const QList = props => {
  const { actionName, question } = props
  const [isRadio, setIsRadio] = React.useState(false)
  const { answeredState, setAnsweredState } = useAnsweredState()
  const { skipState, setSkipState } = useSkipState()
  const answers = _.mapKeys(question.responses, 'text')

  const onChangeHandler = e => {
    // Set the answer of the current question, if not exist create a new one
    setAnsweredState({ ...answeredState, [question.name]: e.target.value })
    // if it's radio input
    if (isRadio) {
      // get the previous answer of the current question
      const previousAns = _.get(answeredState, question.name)
      // check if the question is answered
      if (previousAns) {
        // if question was answered, get the skip array of the previous answer
        const prevAnsSkipArr = _.get(answers, previousAns)

        // if current and prev has skip
        if (answers[e.target.value].skip && prevAnsSkipArr.skip) {
          setSkipState([
            ...skipState.filter(
              skipQName => !prevAnsSkipArr.skip.includes(skipQName)
            ),
            ...answers[e.target.value].skip,
          ])
        }
        // Current answer has skip but prev is not
        else if (answers[e.target.value].skip) {
          // add skip to skipState
          setSkipState([...skipState, ...answers[e.target.value].skip])
        }
        // prev has skip but current is not
        else if (prevAnsSkipArr.skip) {
          // remove prev's skip from skipState
          setSkipState(
            skipState.filter(
              skipQName => !prevAnsSkipArr.skip.includes(skipQName)
            )
          )
        }
        // Do nothing if both doesn't have skip
      }
      // if question is not answered, just add to skipState if there's skip
      else if (answers[e.target.value].skip) {
        setSkipState([...skipState, ...answers[e.target.value].skip])
      }
    }
  }

  const renderAnswer = () => {
    const value =
      !answeredState || !answeredState[question.name]
        ? ''
        : answeredState[question.name]
    if (question.questionType === 'Choice') {
      return (
        <RadioGroup
          aria-label="response"
          value={value}
          onChange={event => {
            setIsRadio(true)
            onChangeHandler(event)
          }}
        >
          {question.responses.map(response => (
            <FormControlLabel
              key={`${actionName}${question.name}${response.text}`}
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
        onChange={onChangeHandler}
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

QList.propTypes = {
  question: PropType.shape({
    questionText: PropType.string,
    questionType: PropType.string,
    name: PropType.string,
    responses: PropType.arrayOf(
      PropType.shape({
        text: PropType.string,
      })
    ),
  }),
  actionName: PropType.string,
}

export default QList

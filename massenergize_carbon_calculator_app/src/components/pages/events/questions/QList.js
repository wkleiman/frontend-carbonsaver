import React from 'react'
import _ from 'lodash'
import PropType from 'prop-types'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { useSkipState } from '../../../context/SkipContext'
import { useAnsweredState } from '../../../context/AnsweredContext'

const useStyle = makeStyles({
  textField: {
    width: '100%',
  },
})

const QList = props => {
  const classes = useStyle()
  const { actionName, question } = props
  const [isRadio, setIsRadio] = React.useState(false)
  const { answeredState, setAnsweredState } = useAnsweredState()
  const { skipState, setSkipState } = useSkipState()
  const answers = _.mapKeys(question.responses, 'text')

  const onChangeHandler = e => {
    // if it's radio input
    if (isRadio) {
      // get the previous answer of the current question
      const previousAns = _.get(answeredState, question.name)
      setAnsweredState({ ...answeredState, [question.name]: e.target.value })

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
    } else {
      // Set the answer of the current question, if not exist create a new one
      setAnsweredState({ ...answeredState, [question.name]: e.target.value })
    }
  }

  // Reset answer by clicking on the answer again
  const onClickHandler = e => {
    if (isRadio) {
      // get the previous answer of the current question
      const previousAns = _.get(answeredState, question.name)

      // If previousAns is equal to click value, reset the answer
      if (previousAns === e.target.value) {
        setAnsweredState(_.omit(answeredState, [question.name]))
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
        <FormControl component="fieldset" style={{ width: '100%' }}>
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
                control={<Radio onClick={onClickHandler} />}
                label={response.text}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )
    }
    return (
      <Grid container>
        <Grid item xs={9}>
          <TextField
            className={classes.textField}
            value={value}
            placeholder="Please answer the above question"
            onChange={onChangeHandler}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            onClick={() =>
              setAnsweredState({ ...answeredState, [question.name]: '' })
            }
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    )
  }

  return (
    <>
      <ListItemText primary={question.questionText} />
      <List>{renderAnswer()}</List>
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

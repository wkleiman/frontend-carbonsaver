// Functional Component import
import React from 'react'
import { useFirebase } from 'react-redux-firebase'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'

// Styling component import
import {
  Grid,
  TextField,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

// Styling classes
const useStyle = makeStyles({
  container: {
    margin: '5vh auto',
    width: '50vh',
    padding: '2vh',
  },
  error: {
    color: 'red',
  },
  link: {
    textDecoration: 'none',
  },
})

// Forgot password component
const ForgotPass = () => {
  const [loading, setLoading] = React.useState(false)
  const [email, setEmail] = React.useState()
  const [isEmailSent, setIsEmailSent] = React.useState(false)
  // Variables declaration
  const firebase = useFirebase()
  const classes = useStyle()
  // Send email for reset password
  const sendResetPasswordEmail = usrEmail => {
    firebase
      .auth()
      .sendPasswordResetEmail(usrEmail)
      .then(function(user) {
        // Alert user that email has been sent to their mailbox
        setLoading(false)
        setIsEmailSent(true)
      })
      .catch(function(e) {
        setLoading(false)
        // eslint-disable-next-line no-use-before-define
        resetPassFormik.setStatus(e)
      })
  }
  // Upon AuthForm submit, send email to reset password
  const onSubmit = formValues => {
    setEmail(formValues.email)
    sendResetPasswordEmail(formValues.email).then(() => setLoading(false))
  }

  const resetPassFormik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: values => {
      setLoading(true)
      onSubmit(values)
    },
    validate: formValues => {
      const errors = {}
      if (!formValues.email) {
        errors.email = 'You Must Enter an Email'
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.email)
      ) {
        errors.email = 'Invalid Email'
      }
      return errors
    },
  })

  // Check if user has entered their email to send email
  if (isEmailSent) {
    // Display text inform the user that email has been sent
    return (
      <Paper className={classes.container}>
        {resetPassFormik.status && (
          <Typography className={classes.error}>
            {resetPassFormik.status}
          </Typography>
        )}
        <Typography>
          We Have Sent You An Email. Please Check Your Inbox
        </Typography>
        <Grid container>
          <Grid item xs={6}>
            <Button
              className={classes.submitBtn}
              onClick={() => {
                setLoading(true)
                sendResetPasswordEmail(email)
              }}
            >
              Resend Email
            </Button>
            {loading && (
              <span>
                <CircularProgress />
              </span>
            )}
          </Grid>
          <Grid item xs={6}>
            <Link to="/auth" className={classes.link}>
              <Button>Go To Sign In</Button>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    )
  }
  // If use has not enter their email, render auth form for user to enter email or continue with other options

  return (
    <Paper className={classes.container}>
      <Typography variant="h3">Please Enter Your Email To Continue</Typography>
      {resetPassFormik.status && (
        <Typography className={classes.error}>
          {resetPassFormik.status}
        </Typography>
      )}
      <form
        noValidate
        autoComplete="off"
        onSubmit={resetPassFormik.handleSubmit}
      >
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Grid container style={{ marginTop: '2vh' }} spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  type="email"
                  label="Email"
                  placeholder="email@example.com"
                  margin="normal"
                  className={classes.textInput}
                  name="email"
                  onBlur={resetPassFormik.handleBlur}
                  onChange={resetPassFormik.handleChange}
                  value={resetPassFormik.values.email}
                  helperText={
                    resetPassFormik.touched.email &&
                    resetPassFormik.errors.email
                  }
                  error={
                    resetPassFormik.touched.email &&
                    !!resetPassFormik.errors.email
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button className={classes.submitBtn} type="submit">
              Continue
            </Button>
            {loading && (
              <span>
                <CircularProgress />
              </span>
            )}
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}

export default ForgotPass

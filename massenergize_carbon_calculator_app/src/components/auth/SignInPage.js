// Functional components import
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
// Styling Components import
import {
  Grid,
  TextField,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useFormik } from 'formik'
import { useFirebase } from 'react-redux-firebase'
import { useAuthState } from '../context/AuthContext'
import { facebookProvider, googleProvider } from './firebaseConfig'
import { fetchUser } from '../../actions'
import BasicInfo from './BasicInfo'
// Styling classes
const useStyles = makeStyles({
  textInput: {
    width: '100%',
  },
  container: {
    margin: '5vh auto',
    width: '50vh',
    padding: '2vh',
  },
  link: {
    textDecoration: 'none',
  },
  googleBtn: {
    color: 'white',
    backgroundColor: 'red',
  },
  fbBtn: {
    color: 'white',
    backgroundColor: '#3b5998',
  },
  error: {
    color: 'red',
  },
  submitBtn: {
    backgroundColor: '#8dc63f',
    color: 'white',
  },
})

const LogInForm = () => {
  const classes = useStyles()
  const [loading, setLoading] = React.useState(false)
  const firebase = useFirebase()
  const auth = firebase.auth()
  const [isFinishSignUp, setIsFinishSignUp] = React.useState(true)
  const { authState, setAuthState } = useAuthState()

  // Send user verification email
  const sendVerificationEmail = () => {
    setLoading(true)
    auth.currentUser.sendEmailVerification().then(() => setLoading(false))
  }

  const onSignIn = async authRes => {
    if (
      !firebase.auth.isEmpty &&
      auth.currentUser &&
      !auth.currentUser.emailVerified
    ) {
      // eslint-disable-next-line no-use-before-define
      signInFormik.setStatus(
        'You have not verified your email. Check your inbox for email with link to verify.'
      )
      setLoading(false)
    } else {
      const user = await fetchUser(authRes.user)
      if (!user) {
        setIsFinishSignUp(false)
      }
      setAuthState(user)
    }
  }

  // Sign in with email and password function
  const normalLogin = ({ email, password }) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(async res => {
        // Save user to backend database
        await onSignIn(res)
      })
      .catch(err => {
        setLoading(false)
        // eslint-disable-next-line no-use-before-define
        signInFormik.setStatus(err.message)
      })
  }

  const signInFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      setLoading(true)
      // eslint-disable-next-line no-undef
      normalLogin(values)
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

      if (!formValues.password) {
        errors.password = 'You Must Enter a Password'
      }

      return errors
    },
  })

  // KNOWN UG : LOGGING IN WITH GOOGLE WILL DELETE ANY ACCOUNT WITH THE SAME PASSWORD:
  // WOULD NOT DELETE DATA I THINK?
  // Sign in with Google function
  const signInWithGoogle = () => {
    // Authentication reset upon closing tab/window
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
      auth
        .signInWithPopup(googleProvider)
        .then(async googleAuth => {
          // Save user information to backend database
          await onSignIn(googleAuth)
        })
        .catch(err => {
          setLoading(false)
          signInFormik.setStatus(err.message)
        })
    })
  }
  // Sign In with Facebook function
  const signInWithFacebook = () => {
    // Authentication reset upon closing tab/window
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
      auth
        .signInWithPopup(facebookProvider)
        .then(async facebookAuth => {
          // Save user information to backend database
          await onSignIn(facebookAuth)
        })
        .catch(err => {
          setLoading(false)
          signInFormik.setStatus(err.message)
        })
    })
  }

  if (authState) return <Redirect to="/events" />

  if (!isFinishSignUp) return <BasicInfo />

  // Render Auth Form for user sign in with other options print out
  return (
    <Paper className={classes.container}>
      <Typography variant="h5">
        Please Enter Your Email and Password to Continue
      </Typography>
      <form noValidate autoComplete="off" onSubmit={signInFormik.handleSubmit}>
        {signInFormik.status && (
          <Typography style={{ color: 'red' }}>
            {signInFormik.status}
          </Typography>
        )}
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
                  onBlur={signInFormik.handleBlur}
                  onChange={signInFormik.handleChange}
                  value={signInFormik.values.email}
                  helperText={
                    signInFormik.touched.email && signInFormik.errors.email
                  }
                  error={
                    signInFormik.touched.email && !!signInFormik.errors.email
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.textInput}
                  onBlur={signInFormik.handleBlur}
                  onChange={signInFormik.handleChange}
                  value={signInFormik.values.password}
                  helperText={
                    signInFormik.touched.password &&
                    signInFormik.errors.password
                  }
                  error={
                    signInFormik.touched.password &&
                    !!signInFormik.errors.password
                  }
                  name="password"
                  label="Password"
                  placeholder="Password"
                  variant="outlined"
                  type="password"
                  required
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button className={classes.submitBtn} type="submit">
              Sign In
            </Button>
            {loading && (
              <span>
                <CircularProgress />
              </span>
            )}
          </Grid>
          <Grid item container direction="column" spacing={2}>
            <Grid item>
              <Button
                onClick={signInWithFacebook}
                id="facebook"
                className={`img-circle facebook ${classes.fbBtn}`}
              >
                <span className="fa fa-facebook-f">Continue with Facebook</span>
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={signInWithGoogle}
                id="google"
                className={`img-circle google ${classes.googleBtn}`}
              >
                <span className="fa fa-google"> Continue with Google</span>
              </Button>
            </Grid>
            <Grid item>
              <Typography>
                Don't have an account?
                <Link
                  className={classes.link}
                  to="/auth/signup"
                  style={{ margin: '1vh' }}
                >
                  Create a Profile
                </Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <Link className={classes.link} to="/auth/resetpass">
                  Forgot Your Password?
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}
// Connect with signIn and fetchUser action
export default LogInForm

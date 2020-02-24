import React from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { useFirebase } from 'react-redux-firebase'
import _ from 'lodash'
import {
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  Grid,
  Button,
  Paper,
  Typography,
  CircularProgress,
  MenuItem,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { fetchUser, fetchGroups, createUser } from '../../actions'
import { useSelectedState } from '../context/SelectedContext'
import { useGroupState } from '../context/GroupContext'
import { useAuthState } from '../context/AuthContext'

const useStyles = makeStyles({
  textInput: { width: '100%' },
  submitBtn: { backgroundColor: '#8dc63f', color: 'white' },
  container: { margin: '5vh auto', width: '50vh', padding: '2vh' },
})

const BasicInfo = props => {
  const { selected } = useSelectedState()
  const { authState, setAuthState } = useAuthState()
  const { groupState, setGroupState } = useGroupState()

  const classes = useStyles()

  const firebase = useFirebase()
  const auth = firebase.auth()
  const [loading, setLoading] = React.useState(false)
  const getGroups = async () => {
    const groupList = await fetchGroups()
    setGroupState(groupList)
  }
  React.useEffect(() => {
    getGroups()
  }, [])

  const onFinalSubmit = async formValues => {
    const email = _.get(auth, 'currentUser.email')
    console.log(selected)
    const status = await createUser(formValues, email, selected)
    if (status.data.success) {
      const newUser = await fetchUser(auth.currentUser)
      setAuthState(newUser)
    }
  }
  const basicInfoFormik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      locality: '',
      minimum_age: false,
      accept_terms_and_conditions: false,
      groups: '',
    },
    onSubmit: values => {
      setLoading(true)
      console.log(values)
      onFinalSubmit(values)
    },
    validate: formValues => {
      const errors = {}
      // Check if second password match first on sign up
      if (!formValues.first_name) {
        errors.first_name = 'Please Let Us Know Who You Are'
      }

      if (!formValues.last_name) {
        errors.last_name = 'Please Let Us Know Who You Are'
      }

      if (!formValues.locality) {
        errors.locality = 'Please Let Us Know Where You From'
      }

      if (!formValues.locality) {
        errors.groups = 'Please Select Your Group'
      }

      if (!formValues.minimum_age) {
        errors.minimum_age = 'You Must Be Above 13 To Continue'
      }

      if (!formValues.accept_terms_and_conditions) {
        errors.accept_terms_and_conditions =
          'You Must Accept Our Terms And Conditions'
      }
      if (!formValues.groups) {
        errors.groups = 'You Must Choose a Group'
      }
    },
  })
  if (!groupState) return <CircularProgress />
  return (
    <Paper className={classes.container}>
      <Typography variant="h3">Create Profile</Typography>
      <form
        noValidate
        autoComplete="off"
        onSubmit={basicInfoFormik.handleSubmit}
      >
        {basicInfoFormik.status && (
          <Typography style={{ color: 'red' }}>
            {basicInfoFormik.status}
          </Typography>
        )}
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Grid container style={{ marginTop: '2vh' }} spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="First Name"
                  placeholder="Jones"
                  margin="normal"
                  className={classes.textInput}
                  name="first_name"
                  onBlur={basicInfoFormik.handleBlur}
                  onChange={basicInfoFormik.handleChange}
                  value={basicInfoFormik.values.first_name}
                  helperText={
                    basicInfoFormik.touched.first_name &&
                    basicInfoFormik.errors.first_name
                  }
                  error={
                    basicInfoFormik.touched.first_name &&
                    basicInfoFormik.errors.first_name
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.textInput}
                  onBlur={basicInfoFormik.handleBlur}
                  onChange={basicInfoFormik.handleChange}
                  value={basicInfoFormik.values.last_name}
                  helperText={
                    basicInfoFormik.touched.last_name &&
                    basicInfoFormik.errors.last_name
                  }
                  error={
                    basicInfoFormik.touched.last_name &&
                    basicInfoFormik.errors.last_name
                  }
                  name="last_name"
                  label="Last Name"
                  placeholder="Smith"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.textInput}
                  onBlur={basicInfoFormik.handleBlur}
                  onChange={basicInfoFormik.handleChange}
                  value={basicInfoFormik.values.locality}
                  helperText={
                    basicInfoFormik.touched.locality &&
                    basicInfoFormik.errors.locality
                  }
                  error={
                    basicInfoFormik.touched.locality &&
                    basicInfoFormik.errors.locality
                  }
                  name="locality"
                  label="Locality"
                  placeholder="Locality"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  defaultValue=""
                  name="groups"
                  className={classes.textInput}
                  onBlur={basicInfoFormik.handleBlur}
                  onChange={basicInfoFormik.handleChange}
                  error={
                    basicInfoFormik.touched.group &&
                    basicInfoFormik.errors.group
                  }
                  helperText={
                    basicInfoFormik.touched.group &&
                    basicInfoFormik.errors.group
                  }
                  required
                  variant="outlined"
                  select
                  label="Group"
                >
                  {groupState.map(group => (
                    <MenuItem key={group.name} value={group.name}>
                      {group.displayname}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="minimum_age"
                      checked={!!basicInfoFormik.values.minimum_age}
                      onChange={basicInfoFormik.handleChange}
                      value
                    />
                  }
                  label="Are you over 13 years old? "
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="accept_terms_and_conditions"
                      checked={
                        !!basicInfoFormik.values.accept_terms_and_conditions
                      }
                      onChange={basicInfoFormik.handleChange}
                      value
                    />
                  }
                  label={<Link to="">Terms and Conditions</Link>}
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
        </Grid>
      </form>
    </Paper>
  )
}

export default BasicInfo

import React from 'react'
import { useFormik } from 'formik'
import { useFirebase } from 'react-redux-firebase'
import {
  TextField,
  FormControl,
  Grid,
  Button,
  Paper,
  Typography,
  CircularProgress,
  MenuItem,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { fetchGroups } from '../../actions'
import { useSelectedState } from '../context/SelectedContext'
import { useAuthState } from '../context/AuthContext'

const useStyles = makeStyles({
  textInput: {},
  submitBtn: {},
  container: {},
})

const BasicInfo = props => {
  const { selected } = useSelectedState()
  const { authState } = useAuthState()

  const classes = useStyles()

  const firebase = useFirebase()
  const auth = firebase.auth()
  const [loading, setLoading] = React.useState(false)

  const onFinalSubmit = formValues => {
    const { email } = auth.currentUser
    // createUser(formValues, email, selected)
  }
  const basicInfoFormik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      locality: '',
      minimum_age: false,
      accept_terms_and_conditions: false,
      group: '',
    },
    onSubmit: values => {
      setLoading(false)
      console.log(values)
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
    },
  })

  // Upon successful email verification, gather user basic information

  const [groups, setGroups] = React.useState()

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
                  type="password"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  required
                  variant="outlined"
                  className={classes.textInput}
                >
                  <TextField
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
                    {groups.map(group => (
                      <MenuItem key={group.name} value={group.name}>
                        {group.displayname}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
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

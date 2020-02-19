import React from 'react'
import {useFormik} from 'formik'
import {useSelectedState} from '../context/SelectedContext'
import {useAuthState} from '../context/AuthContext'

const BasicInfo = props => {
  const {selected} = useSelectedState()
  const {authState} = useAuthState()

  const onFinalSubmit = formValues => {
    const { email } = auth.currentUser
    // createUser(formValues, email, selected)
  }
const basicInfoFormik = useFormik({
  initialValues:{
    first_name:'',
    last_name:'',
    locality:'',
  },
  onSubmit: values => {
    setLoading(false)
  },
  validate: formValues => {

// Check if second password match first on sign up
if (!formValues.first_name) {
  errors.first_name = "Please Let Us Know Who You Are";
}

if (!formValues.last_name) {
  errors.last_name = "Please Let Us Know Who You Are";
}

if (!formValues.locality) {
  errors.locality = "Please Let Us Know Where You From";
}

if (!formValues.locality) {
  errors.groups = "Please Select Your Group";
}

if (!minimum_age) {
  errors.minimum_age = "You Must Be Above 13 To Continue";
}

if (!accept_terms_and_conditions) {
  errors.accept_terms_and_conditions =
    "You Must Accept Our Terms And Conditions";
}
  }
})

// Upon successful email verification, gather user basic information

const [groups, setGroups] = React.useState()
React.useEffect(() => {
 const getGroups = async () => {
   const groupList = await fetchGroups()
   setGroups(groupList)
}})
if (auth.currentUser && auth.currentUser.emailVerified) {
 return (
   <Paper className={classes.container} style={{ marginTop: '5vh' }}>
     <Typography variant="h3">Personal Information</Typography>
     <Typography style={{ color: 'red' }}>{this.state.error}</Typography>
     <AuthForm
       onFormSubmit={this.onFinalSubmit}
       fieldNames={[
         'first_name',
         'last_name',
         'locality',
         'groups',         'minimum_age',
         'accepts_terms_and_conditions',
       ]}
       btnText="Finish"
       renderFids={this.renderInfoFields}
     />
   </Pape
 )
}

}


  // Defines user input fie(
      <Grid container style={{ marginTop: '2vh' }} spacing={2}>
        <Grid item xs={12}>
          {renderTextField('text', fields.first_name, 'First Name')}
        </Grid>
        <Grid item xs={12}>
          {renderTextField('text', fields.last_name, 'Last Name')}
        </Grid>
        {groups && (
          <Grid item xs={12}>
            {renderSelect(fields.groups, groups, 'Groups')}
          </Grid>
        )}
        <Grid item xs={12}>
          {renderTextField('text', fields.locality, 'Locality')}
        </Grid>
        <Grid item xs={12}>
          {renderCheckBox(fields.minimum_age, 'Are You Over 13?')}
        </Grid>
        <Grid item xs={12}>
          {renderCheckBox(
            fields.accepts_terms_and_conditions,
            <Link to="">Terms and Conditions</Link>
          )}
        </Grid>
      </Grid>
    )      {renderCheckBox(
            fields.accepts_tms_and_conditions,
            <Link to="">Terms(
      <FormControl required variant="outlined" className={classes.textInput}>
        <TextField
          {...field.input}
          error={isInvalid(field.meta)}
          helperText={renderError(field.meta)}
          required
          variant="outlined"
          select
          label={label}
        >
          {options.map(option => (
            <MenuItem key={option.name} value={option.name}>
              {option.displayname}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    )   <MenuItem key={option.name} value={optioname}>
              {option.displayname}
          </MenuItem>         ))}
      </TextField        FormControl>
    )
  }

  // Rdering CheckBox for user selection
  const renderCheckBox = (field) => (   <FormControlLel
  control={
        <Checkbox
        checked={!!field.input.value}
        onChange={field.input.onChange}
        value
        />
      }
      label=createUser(formValues, email, r final suission handler
  // Save user info to backend database


  export default

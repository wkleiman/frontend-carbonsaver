import React from 'react';
import { signIn, fetchGroups, createUser } from '../../actions';
import history from '../../history';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthForm from './AuthForm';
import { withFirebase } from 'react-redux-firebase';

import { Paper, TextField, Grid, Button, Typography, CircularProgress, Checkbox, FormControlLabel, FormControl, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const style = {
    textInput: {
        width: '100%'
    },
    container: {
        margin: '5vh auto',
        width: '50vh',
        padding: '2vh'
    }
}

class SignUpPage extends React.Component {
    state = { error: '', user: null };

    componentDidMount() {
        if (this.props.firebase) {
            this.props.firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    this.setState({ user });
                }
            })
        }
        this.props.fetchGroups();
    }

    renderError(meta) {
        if (this.isInvalid(meta)) {
            return meta.error;
        }
    }

    isInvalid({ error, touched }) {
        return (touched && error) ? true : false;
    }

    onSubmit = (formValues) => {
        this.props.firebase.auth().setPersistence(this.props.firebase.auth.Auth.Persistence.SESSION).then(() => {
            this.props.firebase.auth()
                .createUserWithEmailAndPassword(formValues.email, formValues.passwordOne)
                .then(authUser => {
                    this.sendVerificationEmail();
                })
                .catch(err => {
                    this.setState({ error: err.message });
                });
        });
    };

    deleteFirebaseAccount = () => {
        this.props.firebase.auth().currentUser.delete();
        this.props.firebase.auth().signOut();
    }

    renderTextField = (type, field, label) => {
        const { classes } = this.props;
        return (
            <TextField className={classes.textInput}
                type={type}
                {...field.input}
                error={this.isInvalid(field.meta)}
                helperText={this.renderError(field.meta)}
                label={label} required
                variant="outlined" />
        );
    }

    renderSelect = (field, options, label) => {
        const { classes } = this.props;
        return (
            <FormControl required variant="outlined" className={classes.textInput}>
                <TextField
                    {...field.input}
                    error={this.isInvalid(field.meta)}
                    helperText={this.renderError(field.meta)}
                    required
                    variant="outlined"
                    select
                    label={label}
                >
                    {options.map(option => {
                        return (
                            <MenuItem value={option.name}>{option.displayname}</MenuItem>
                        );
                    })}
                </TextField>
            </FormControl>);
    }

    renderCheckBox = (field, label) => {
        return (
            <FormControlLabel
                control={
                    <Checkbox
                        checked={field.input.value ? true : false}
                        onChange={field.input.onChange}
                        value={true} />
                }
                label={label}
            />
        );
    }

    renderFields = (fields) => {
        return (
            <Grid container style={{ marginTop: '2vh' }} spacing={2}>
                <Typography style={{ color: 'red' }}>{this.state.error}</Typography>
                <Grid item xs={12}>
                    {this.renderTextField("text", fields.email, "Email")}
                </Grid>
                <Grid item xs={12}>
                    {this.renderTextField("password", fields.passwordOne, "Password")}
                </Grid>
                <Grid item xs={12}>
                    {this.renderTextField("password", fields.passwordTwo, "Confirm Your Password")}
                </Grid>
            </Grid>
        );
    }

    renderInfoFields = (fields) => {
        const { classes, groups } = this.props;
        return (
            <Grid container style={{ marginTop: '2vh' }} spacing={2}>
                <Grid item xs={12}>
                    {this.renderTextField("text", fields.first_name, "First Name")}
                </Grid>
                <Grid item xs={12}>
                    {this.renderTextField("text", fields.last_name, "Last Name")}
                </Grid>
                {groups && <Grid item xs={12}>
                    {this.renderSelect(fields.groups, groups, "Groups")}
                </Grid>}
                <Grid item xs={12}>
                    {this.renderTextField("text", fields.locality, "Locality")}
                </Grid>
                <Grid item xs={12}>
                    {this.renderCheckBox(fields.minimum_age, "Are You Over 13?")}
                </Grid>
                <Grid item xs={12}>
                    {this.renderCheckBox(fields.accepts_terms_and_conditions, <Link to="">Terms and Conditions</Link>)}
                </Grid>
            </Grid>
        );
    }

    onFinalSubmit = (formValues) => {
        const email = this.props.firebase.auth().currentUser.email;
        this.props.createUser(formValues, email);
    }

    sendVerificationEmail = () => {
        this.props.firebase.auth()
            .currentUser
            .sendEmailVerification()
            .then(() => console.log('email sent'));
    }

    render() {
        const { classes } = this.props;
        let auth = this.props.firebase.auth();
        if (!this.props.auth) return <CircularProgress />
        if (!this.props.auth.isEmpty && !auth.currentUser.emailVerified) {
            return (
                <Paper className={classes.container} style={{ padding: '2vh' }}>
                    <Grid container >
                        <Grid item><Typography> We sent a link to your email address. Please verify your email and sign in to continue.</Typography></Grid>
                        <Grid item><Button onClick={this.sendVerificationEmail}>Resend Verification Email</Button></Grid>
                    </Grid>
                </Paper>
            );
        }
        if (auth.currentUser && auth.currentUser.emailVerified) {
            return (
                <Paper className={classes.container} style={{ marginTop: '5vh' }}>
                    <Typography variant="h3">Personal Information</Typography>
                    <Typography style={{ color: 'red' }}>{this.state.error}</Typography>
                    <AuthForm
                        onFormSubmit={this.onFinalSubmit}
                        fieldNames={['first_name', 'last_name', 'locality', 'groups', 'minimum_age', 'accepts_terms_and_conditions']}
                        btnText="Finish"
                        renderFields={this.renderInfoFields}
                    />
                </Paper>)
        }
        return (
            <Paper className={classes.container}>
                <Typography variant="h3">Please Enter Your Continue</Typography>
                <Typography style={{ color: 'red' }}>{this.state.error}</Typography>
                <AuthForm
                    error={this.state.error}
                    onFormSubmit={this.onSubmit}
                    fieldNames={['email', 'passwordOne', 'passwordTwo']}
                    btnText="Sign Up"
                    otherOptionBtnText="Sign In"
                    otherOptionQuestion="Already Have An Account? "
                    renderFields={this.renderFields}
                    otherOptRoute="/signin" />
            </Paper>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        groups: Object.values(state.groups),
    }
}

export default connect(mapStateToProps, { signIn, fetchGroups, createUser })(withFirebase(withStyles(style)(SignUpPage)));
import React from 'react';
import { signIn } from '../../actions';
import history from '../../history';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthForm from './AuthForm';
import { withFirebase } from 'react-redux-firebase';

import { Paper, TextField, Grid, Button, Typography, CircularProgress } from '@material-ui/core';
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
    state = { error: '' };
    componentDidMount() {
        if (this.props.firebase) {
            this.props.firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    console.log(user);
                    this.props.signIn(user);
                    history.push('/event/CC_Event_1');
                }
            })
        }
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
                    console.log(err)
                    this.setState({ error: err.message });
                });
        });
    };
    deleteFirebaseAccount = () => {
        this.props.firebase.auth().currentUser.delete();
        this.props.firebase.auth().signOut();
    }
    renderFields = (fields) => {
        const { classes } = this.props;
        return (
            <Grid container style={{ marginTop: '2vh' }} spacing={2}>
                <Grid item xs={12}>
                    <TextField className={classes.textInput}
                        type="text"
                        {...fields.email.input}
                        error={this.isInvalid(fields.email.meta)}
                        helperText={this.renderError(fields.email.meta)}
                        label="Email" required
                        variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                    <TextField className={classes.textInput} type="password"
                        {...fields.passwordOne.input}
                        error={this.isInvalid(fields.passwordOne.meta)}
                        helperText={this.renderError(fields.passwordOne.meta)}
                        label="Password" required
                        variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                    <TextField className={classes.textInput} type="password"
                        {...fields.passwordTwo.input}
                        error={this.isInvalid(fields.passwordTwo.meta)}
                        helperText={this.renderError(fields.passwordTwo.meta)}
                        label="Confirm Your Password" required
                        variant="outlined" />
                </Grid>
            </Grid>
        );
    }
    sendVerificationEmail = () => {
        this.props.firebase.auth().currentUser.sendEmailVerification().then(() => console.log('email sent'));
    }
    render() {
        const { classes } = this.props;
        let auth = this.props.firebase.auth();
        if (!this.props.auth) return <CircularProgress />
        if (!this.props.auth.isEmpty && !auth.currentUser.emailVerified) {
            return (
                <Grid container>
                    <Grid item><Typography> We sent a link to your email address. Please verify your email and sign in to continue.</Typography></Grid>
                    <Grid item><Button onClick={this.sendVerificationEmail}> Resend Verification Email </Button></Grid>
                </Grid>
            );
        }
        if (auth.currentUser && auth.currentUser.emailVerified) {
            return (
                <Paper style={{ marginTop: '5vh' }}>
                    <Typography style={{ color: 'red' }}>{this.state.error}</Typography>
                    <AuthForm
                        title="Personal Information"
                        onFormSubmit={this.onSubmit}
                        fieldNames={['firstName', 'lastName']}
                        btnText="Finish Sign Up"
                        renderFields={this.renderFields}
                        otherOptRoute="/login" />
                </Paper>)
        }
        return (
            <Paper className={classes.container}>
                <Typography style={{ color: 'red' }}>{this.state.error}</Typography>
                <AuthForm
                    title="Sign Up"
                    onFormSubmit={this.onSubmit}
                    fieldNames={['email', 'passwordOne', 'passwordTwo']}
                    btnText="Sign Up"
                    otherOptionBtnText="Sign In"
                    otherOptionQuestion="Already Have An Account? "
                    renderFields={this.renderFields}
                    otherOptRoute="/login" />
            </Paper>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps, { signIn })(withFirebase(withStyles(style)(SignUpPage)));
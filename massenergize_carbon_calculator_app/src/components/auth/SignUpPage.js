import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthForm from './AuthForm';


import { TextField, Grid, Button, Typography } from '@material-ui/core';

class SignUpPage extends React.Component {
    renderError({ error, touched }) {
        if (touched && error) {
            return error;
        }
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
    renderFields = (fields) => {
        if (this.props.auth.isEmpty) {
            return (
                <Grid container>
                    <Grid item><TextField {...fields.email.input} helpText={this.renderError(fields.email.meta)} label="Email" required /></Grid>
                    <Grid item><TextField {...fields.passwordOne.input} helpText={this.renderError(fields.passwordOne.meta)} label="Password" required /></Grid>
                    <Grid item><TextField {...fields.passwordTwo.input} helpText={this.renderError(fields.passwordTwo.meta)} label="Confirm Your Password" required /></Grid>
                </Grid>
            );
        } else {
            return (
                <Grid container>
                    <Grid item><TextField {...fields.firstName.input} helpText={this.renderError(fields.firstName.meta)} label="First Name" required /></Grid>
                    <Grid item><TextField {...fields.firstName.input} helpText={this.renderError(fields.firstName.meta)} label="Last Name" required /></Grid>
                    {this.props.auth.emailVerified ?
                        <Button>Finish Creating Account</Button> : <></>
                    }
                    <Grid item><Button onClick={this.deleteFirebaseAccount}> Cancel </Button></Grid>
                </Grid>
            );
        }
    }
    sendVerificationEmail = () => {
        this.props.firebase.auth().currentUser.sendEmailVerification().then(() => console.log('email sent'));
    }
    render() {
        if (!this.props.firebase.auth().currentUser.emailVerified) {
            return (
                <Grid container>
                    <Grid item><Typography> We sent a link to your email address. Please verify your email and sign in to continue.</Typography></Grid>
                    <Grid item><Button onClick={this.sendVerificationEmail}> Resend Verification Email </Button></Grid>
                    <Grid item><Link to={this.props.links.signin} onClick={() => this.props.firebase.auth().signOut()}> Sign in</Link></Grid>
                </Grid>
            );
        }
        return (
            <AuthForm
                title="Sign Up"
                onFormSubmit={this.onSubmit}
                fieldName={['email', 'passwordOne', 'passwordTwo']}
                btnText="Sign Up"
                otherOptionBtnText="Sign In"
                otherOptionQuestion="Already Have An Account? "
                renderFields={this.renderFields}
                otherOptRoute="/signin" />
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps)(SignUpPage);
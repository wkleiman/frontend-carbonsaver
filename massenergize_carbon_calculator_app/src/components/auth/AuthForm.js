import React from 'react';
import history from '../../history';
import { Fields, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

import { signIn, getUser } from '../../actions';
import { facebookProvider, googleProvider } from './firebaseConfig';
import { Grid, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const style = {
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
        color: 'white'
    },
}

class AuthForm extends React.Component {
    state = {
        error: '',
    }

    render() {
        return (
            <>
                <div>
                    {this.renderPage()}
                </div>
            </>
        );
    }

    renderOtherOpt = () => {
        const { classes, otherOptionBtnText, otherOptionQuestion, otherOptRoute } = this.props;
        return (
            <Grid item container direction="column" spacing={2}>
                <Grid item><Button onClick={this.signInWithFacebook} id="facebook" className={`img-circle facebook ${classes.fbBtn}`}><span className="fa fa-facebook-f"> Continue with Facebook</span></Button></Grid>
                <Grid item><Button onClick={this.signInWithGoogle} id="google" className={`img-circle google ${classes.googleBtn}`}><span className="fa fa-google"> Continue with Google</span></Button></Grid>
                <Grid item><Typography>{otherOptionQuestion} <Link className={classes.link} to={otherOptRoute ? otherOptRoute : "#"}>{otherOptionBtnText}</Link></Typography></Grid>
                <Grid item>
                    <Typography><Link className={classes.link} to="/resetpass">Forgot Your Password?</Link></Typography>
                </Grid>
            </Grid>
        );
    }

    renderPage = () => {
        const { classes, isSignIn, handleSubmit, onFormSubmit, renderFields, btnText, fieldNames } = this.props;
        return (
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <Grid container direction="column" spacing={2}>
                    <Grid item><Fields names={fieldNames} component={renderFields} /></Grid>
                    <Grid item><Button className={classes.submitBtn} type="submit" >{btnText}</Button></Grid>
                    {this.state.error && <Typography style={{ color: 'red' }}>{this.state.error}</Typography>}
                    {(!isSignIn) ? <></> : this.renderOtherOpt()}
                </Grid>
            </form>
        );
    }

    //KNOWN BUG : LOGGING IN WITH GOOGLE WILL DELETE ANY ACCOUNT WITH THE SAME PASSWORD: 
    //WOULD NOT DELETE DATA I THINK?
    signInWithGoogle = () => {
        this.props.firebase.auth().setPersistence(this.props.firebase.auth.Auth.Persistence.SESSION).then(() => {
            this.props.firebase.auth()
                .signInWithPopup(googleProvider)
                .then(auth => {
                    this.props.signIn(auth.user.email);
                    this.props.getUser(auth.user.email);
                })
                .catch(err => {
                    this.setState({ error: err.message });
                });
        });

    }
    signInWithFacebook = () => {
        this.props.firebase.auth().setPersistence(this.props.firebase.auth.Auth.Persistence.SESSION).then(() => {
            this.props.firebase.auth()
                .signInWithPopup(facebookProvider)
                .then(auth => {
                    this.props.signIn(auth.user.email);
                    this.props.getUser(auth.user);
                })
                .catch(err => {
                    this.setState({ error: err.message });
                });
        });
    }

}

const mapStoreToProps = (state) => {
    return {
        auth: state.firebase.auth,
        event: state.event.CC_Event_1
    }
}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.email) {
        errors.email = 'You Must Enter an Email';
    }

    if (!formValues.password) {
        errors.password = 'You Must Enter a Password';
    }

    if (!formValues.passwordOne) {
        errors.passwordOne = 'You Must Enter a Password';
    }

    if (!formValues.first_name) {
        errors.first_name = 'Please Let Us Know Who You Are';
    }

    if (!formValues.last_name) {
        errors.last_name = 'Please Let Us Know Who You Are';
    }

    if (!formValues.locality) {
        errors.locality = "Please Let Us Know Where You From";
    }

    if (!formValues.locality) {
        errors.groups = "Please Select Your Group";
    }

    if (!formValues.minimum_age) {
        errors.minimum_age = 'You Must Be Above 13 To Continue';
    }

    if (!formValues.accept_terms_and_conditions) {
        errors.accept_terms_and_conditions = 'You Must Accept Our Terms And Conditions'
    }

    return errors;
}
export default connect(mapStoreToProps, { signIn, getUser })(reduxForm({
    form: 'authForm',
    validate,
})(withFirebase(withStyles(style)(AuthForm))));
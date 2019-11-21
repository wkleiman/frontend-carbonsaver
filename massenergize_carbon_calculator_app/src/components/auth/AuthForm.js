import React from 'react';
import history from '../../history';
import { Fields, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Link, Redirect } from 'react-router-dom';

import { signIn } from '../../actions';
import { facebookProvider, googleProvider } from './firebaseConfig';
import { Grid, Typography, Button } from '@material-ui/core';

/* Modal config */

class AuthForm extends React.Component {
    state = {
        error: '',
    }

    render() {
        // if (!this.props.auth || !this.props.user || !this.props.policies) return <CircularProgress />
        // if (this.props.user.info && this.props.user.todo && this.props.user.done && this.props.auth.emailVerified) {
        //     return <Redirect to={'/event/CC_Event_1'} />;
        // }
        return (
            <>
                <div>
                    {this.renderPage()}
                </div>
            </>
        );
    }
    renderPage = () => {
        const googleSignIn = (this.props.otherOptionBtnText && this.props.otherOptionQuestion) && <Grid item><Button style={{ color: 'white', backgroundColor: '#3b5998' }} onClick={this.signInWithFacebook} id="facebook" className="img-circle facebook"><span className="fa fa-facebook-f"> Continue with Facebook</span></Button></Grid>;
        const facebookSignIn = (this.props.otherOptionBtnText && this.props.otherOptionQuestion) && <Grid item><Button style={{ color: 'white', backgroundColor: 'red' }} onClick={this.signInWithGoogle} id="google" className="img-circle google"><span className="fa fa-google"> Continue with Google</span></Button></Grid>;
        const otherOpt = (this.props.otherOptionBtnText && this.props.otherOptionQuestion) && <Grid item><Typography>{this.props.otherOptionQuestion} <Link to={this.props.otherOptRoute}>{this.props.otherOptionBtnText}</Link></Typography></Grid>;
        return (
            <form onSubmit={this.props.handleSubmit(this.props.onFormSubmit)}>
                <Grid container direction="column" spacing={2}>
                    <Grid item><Fields names={this.props.fieldNames} component={this.props.renderFields} /></Grid>
                    <Grid item><Button type="submit" >{this.props.btnText}</Button></Grid>
                    {this.state.error && <Typography variant="h4">{this.state.error}</Typography>}
                    {googleSignIn}
                    {facebookSignIn}
                    {otherOpt}
                </Grid>
            </form>
        );
    }
    // onFinalSubmit(event) {
    //     event.preventDefault();
    //     if (!this.state.termsAndServices) {
    //         this.setState({ error: 'You need to agree to the terms and services' });
    //     }else if(!this.state.captchaConfirmed){ 
    //         this.setState({ error: 'Invalid reCAPTCHA, please try again' });
    //     }else {
    //         /** Collects the form data and sends it to the backend */
    //         const { firstName, lastName, preferredName, serviceProvider, termsAndServices } = this.state;
    //         if (!termsAndServices) {
    //             this.setState({ showTOSError: true });
    //             return;
    //         }
    //         const { auth } = this.props;
    //         const body = {
    //             "full_name": firstName + ' ' + lastName,
    //             "preferred_name": preferredName === "" ? firstName : preferredName,
    //             "email": auth.email,
    //             // "id": auth.uid,
    //             "is_vendor": serviceProvider,
    //             "accepts_terms_and_conditions": termsAndServices
    //         }
    //         postJson(URLS.USERS, body).then(json => {
    //             console.log(json);
    //             if (json.success && json.data) {
    //                 this.fetchAndLogin(json.data.email).then(success => {
    //                     if(!success){
    //                         this.setState({error: 'Failed to Register'})
    //                     }
    //                 });
    //             }
    //         })
    //         this.setState({ ...INITIAL_STATE });
    //     }
    // }

    //KNOWN BUG : LOGGING IN WITH GOOGLE WILL DELETE ANY ACCOUNT WITH THE SAME PASSWORD: 
    //WOULD NOT DELETE DATA I THINK?
    signInWithGoogle = () => {
        this.props.firebase.auth().setPersistence(this.props.firebase.auth.Auth.Persistence.SESSION).then(() => {
            this.props.firebase.auth()
                .signInWithPopup(googleProvider)
                .then(auth => {
                    this.props.signIn(auth.user.email);
                    history.push(`/event/CC_Event_1`);
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
        errors.password = 'You Must Enter an Email';
    }

    if (!formValues.passwordOne) {
        errors.passwordOne = 'You Must Enter an Email';
    }

    if (!formValues.passwordTwo) {
        errors.passwordTwo = 'You Must Confirm Your Password'
    }

    if (formValues.passwordTwo !== formValues.passwordOne) {
        errors.passwordTwo = 'The Password You Enter Is Not Match';
    }

    return errors;
}
export default connect(mapStoreToProps, { signIn })(reduxForm({
    form: 'authForm',
    validate,
})(withFirebase(AuthForm)));
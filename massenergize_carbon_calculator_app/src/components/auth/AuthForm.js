import React from 'react';
import history from '../../history';
import { Fields, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

import { signIn } from '../../actions';
import { facebookProvider, googleProvider } from './firebaseConfig';
import { Grid, Typography, Button } from '@material-ui/core';

/* Modal config */

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
    renderPage = () => {
        const googleSignIn = (this.props.otherOptionBtnText && this.props.otherOptionQuestion) && <Grid item><Button style={{ color: 'white', backgroundColor: '#3b5998' }} onClick={this.signInWithFacebook} id="facebook" className="img-circle facebook"><span className="fa fa-facebook-f"> Continue with Facebook</span></Button></Grid>;
        const facebookSignIn = (this.props.otherOptionBtnText && this.props.otherOptionQuestion) && <Grid item><Button style={{ color: 'white', backgroundColor: 'red' }} onClick={this.signInWithGoogle} id="google" className="img-circle google"><span className="fa fa-google"> Continue with Google</span></Button></Grid>;
        const otherOpt = (this.props.otherOptionBtnText && this.props.otherOptionQuestion) && <Grid item><Typography>{this.props.otherOptionQuestion} <Link to={this.props.otherOptRoute}>{this.props.otherOptionBtnText}</Link></Typography></Grid>;
        return (
            <form onSubmit={this.props.handleSubmit(this.props.onFormSubmit)}>
                <Grid container direction="column" spacing={2}>
                    <Grid item><Fields names={this.props.fieldNames} component={this.props.renderFields} /></Grid>
                    <Grid item><Button type="submit" >{this.props.btnText}</Button></Grid>
                    {this.state.error && <Typography style={{ color: 'red' }}>{this.state.error}</Typography>}
                    {googleSignIn}
                    {facebookSignIn}
                    {otherOpt}
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
                    if (this.props.signIn) {
                        history.push('/event/CC_Event_1');
                    }
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
                    if (this.props.signIn) {
                        history.push('/event/CC_Event_1');
                    }
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
export default connect(mapStoreToProps, { signIn })(reduxForm({
    form: 'authForm',
    validate,
})(withFirebase(AuthForm)));
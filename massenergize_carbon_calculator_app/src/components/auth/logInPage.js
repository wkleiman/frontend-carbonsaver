import React from 'react';
import AuthForm from './AuthForm';
import { Grid, TextField } from '@material-ui/core';

class LogInForm extends React.Component {
    renderError({ touched, error }) {
        if (touched && error) {
            return error;
        }
    }
    renderFields = (fields) => {
        return (
            <Grid container>
                <Grid item><TextField {...fields.email.input} helpText={this.renderError(fields.email.meta)} label="Email" required /></Grid>
                <Grid item><TextField {...fields.passwordOne.input} helpText={this.renderError(fields.password.meta)} label="Password" required /></Grid>
            </Grid>
        );
    }
    onSubmit = formValues => {

    }
    render() {
        return (
            <AuthForm
                title="Sign In"
                onFormSubmit={this.onSubmit}
                fieldName={['email', 'password']}
                btnText="Sign In"
                otherOptionBtnText="Sign Up"
                otherOptionQuestion="Don't Have An Account? "
                renderFields={this.renderFields}
                otherOptRoute="/signup"
                onFormSubmit={this.onSubmit} />
        );
    }
}

export default LogInForm;
import React from 'react'
import AuthForm from './AuthForm';
import { withFirebase } from 'react-redux-firebase';

import { Grid, TextField, Paper, Typography, Button } from '@material-ui/core';


const renderError = (meta) => {
    if (isInvalid(meta)) {
        return meta.error;
    }
}

const isInvalid = ({ error, touched }) => {
    return (touched && error) ? true : false;
}


const renderTextField = (field) => {
    return (
        <Grid container>
            <Grid item>
                <TextField
                    type="text"
                    {...field.email.input}
                    error={isInvalid(field.email.meta)}
                    helperText={renderError(field.email.meta)}
                    label="Email" required
                    variant="outlined" />
            </Grid>
        </Grid>
    );
}


const ForgotPass = (props) => {
    const { firebase } = props;

    const [message, setMessage] = React.useState(null);
    const [isEmailSent, setIsEmailSent] = React.useState(false);
    const [email, setEmail] = React.useState('');

    const onSubmit = (formValues) => {
        // setEmail(formValues.email);
        // firebase.auth().sendPasswordResetEmail(formValues.email.input.value)
        //     .then(function (user) {
        //         console.log(user);
        //         setIsEmailSent(true);
        //     }).catch(function (e) {
        //         setMessage(e.message)
        //     })
    }

    if (isEmailSent) {
        return (
            <Paper>
                <Typography>We Have Sent You An Email. Please Check Your Inbox</Typography>
                <Button >Resend Email</Button>
            </Paper>
        );
    }
    else {
        return (
            <Paper>
                <AuthForm
                    onFormSubmit={onSubmit}
                    fieldNames={['email']}
                    btnText="Continue"
                    renderFields={renderTextField}
                    onFormSubmit={onSubmit}
                />
            </Paper>
        );
    }
}

export default withFirebase(ForgotPass);
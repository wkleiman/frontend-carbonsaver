import React from 'react'
import AuthForm from './AuthForm';
import { withFirebase } from 'react-redux-firebase';

import { Grid, TextField, Paper, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
    container: {
        margin: '5vh auto',
        width: '50vh',
        padding: '2vh'
    },
    error: {
        color: 'red',
    }
})

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
    const classes = useStyle();
    const [message, setMessage] = React.useState(null);
    const [isEmailSent, setIsEmailSent] = React.useState(false);
    const [email, setEmail] = React.useState('');

    const onSubmit = (formValues) => {
        setEmail(formValues.email);
        sendResetPasswordEmail(formValues.email);
    }

    const sendResetPasswordEmail = (email) => {
        firebase.auth().sendPasswordResetEmail(email)
            .then(function (user) {
                alert('Email Sent');
                setIsEmailSent(true);
            }).catch(function (e) {
                setMessage(e.message)
            })
    }

    if (isEmailSent) {
        return (
            <Paper className={classes.container}>
                {message && <Typography className={classes.error}>{message}</Typography>}
                <Typography>We Have Sent You An Email. Please Check Your Inbox</Typography>
                <Button onClick={() => sendResetPasswordEmail(email)}>Resend Email</Button>
            </Paper>
        );
    }
    else {
        return (
            <Paper className={classes.container}>
                <Typography variant="h3">Please Enter Your Email To Continue</Typography>
                {message && <Typography className={classes.error}>{message}</Typography>}
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
// Functional Component import
import React from "react";
import AuthForm from "./AuthForm";
import { withFirebase } from "react-redux-firebase";
// Styling component import
import { Grid, TextField, Paper, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Styling classes
const useStyle = makeStyles({
  container: {
    margin: "5vh auto",
    width: "50vh",
    padding: "2vh"
  },
  error: {
    color: "red"
  }
});
// Check error and return error
const renderError = meta => {
  if (isInvalid(meta)) {
    return meta.error;
  }
};
// check is valid to print error and styling
const isInvalid = ({ error, touched }) => {
  return touched && error ? true : false;
};
// Rendering Text Field
const renderTextField = field => {
  return (
    <Grid container>
      <Grid item>
        <TextField
          type="text"
          {...field.email.input}
          error={isInvalid(field.email.meta)}
          helperText={renderError(field.email.meta)}
          label="Email"
          required
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
};
// Forgot password component
const ForgotPass = props => {
  // Variables declaration
  const { firebase } = props;
  const classes = useStyle();
  const [message, setMessage] = React.useState(null);
  const [isEmailSent, setIsEmailSent] = React.useState(false);
  const [email, setEmail] = React.useState("");
  // Upon AuthForm submit, send email to reset password
  const onSubmit = formValues => {
    setEmail(formValues.email);
    sendResetPasswordEmail(formValues.email);
  };
  // Send email for reset password
  const sendResetPasswordEmail = email => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function(user) {
        // Alert user that email has been sent to their mailbox
        // TODO: Add a Modal to display this information instead of using alert for when user press resend email
        alert("Email Sent");
        setIsEmailSent(true);
      })
      .catch(function(e) {
        setMessage(e.message);
      });
  };
  // Check if user has entered their email to send email
  if (isEmailSent) {
    // Display text inform the user that email has been sent
    return (
      <Paper className={classes.container}>
        {message && (
          <Typography className={classes.error}>{message}</Typography>
        )}
        <Typography>
          We Have Sent You An Email. Please Check Your Inbox
        </Typography>
        <Button onClick={() => sendResetPasswordEmail(email)}>
          Resend Email
        </Button>
      </Paper>
    );
  }
  // If use has not enter their email, render auth form for user to enter email or continue with other options
  else {
    return (
      <Paper className={classes.container}>
        <Typography variant="h3">
          Please Enter Your Email To Continue
        </Typography>
        {message && (
          <Typography className={classes.error}>{message}</Typography>
        )}
        <AuthForm
          onFormSubmit={onSubmit}
          fieldNames={["email"]}
          btnText="Continue"
          renderFields={renderTextField}
        />
      </Paper>
    );
  }
};

export default withFirebase(ForgotPass);

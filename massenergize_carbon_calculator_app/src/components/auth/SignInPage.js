// Functional components import
import React from "react";
import history from "../../history";
import { connect } from "react-redux";
import { signIn, getUser } from "../../actions";
import AuthForm from "./AuthForm";
// Styling Components import
import { Grid, TextField, Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { withFirebase } from "react-redux-firebase";
// Styling classes
const styles = {
  textInput: {
    width: "100%"
  },
  container: {
    margin: "5vh auto",
    width: "50vh",
    padding: "2vh"
  }
};

class LogInForm extends React.Component {
  state = { error: "" };
  componentDidMount() {
    // Check if User has signed in to navigate them to main page
    if (this.props.firebase) {
      var user = this.props.firebase.auth().currentUser;
      if (user) {
        history.push("/event/CC_Event_1");
      }
    }
  }
  // Rendering error to help user filling out auth form
  renderError({ touched, error }) {
    if (touched && error) {
      return error;
    }
  }
  // Sign in with email and password function
  normalLogin({ email, password }) {
    let auth = this.props.firebase.auth();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        let { user } = res;
        // Save user to backend database
        this.props.signIn(user);
        // Get user information and dispatch to application state from backend
        this.props.getUser(user.email);
      })
      .catch(err => {
        console.log("Error:", err.message);
        this.setState({ error: err.message });
      });
  }
  // Rendering TextFields for user input
  // For sign in includes email and password
  renderFields = fields => {
    const { classes } = this.props;
    return (
      <Grid container style={{ marginTop: "2vh" }} spacing={2}>
        {this.state.error ? <Typography>{this.state.error}</Typography> : <></>}
        <Grid item xs={12}>
          <TextField
            className={classes.textInput}
            {...fields.email.input}
            helperText={this.renderError(fields.email.meta)}
            label="Email"
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.textInput}
            {...fields.password.input}
            helperText={this.renderError(fields.password.meta)}
            label="Password"
            variant="outlined"
            type="password"
            required
          />
        </Grid>
      </Grid>
    );
  };
  // On form submit handler
  onSubmit = formValues => {
    this.normalLogin(formValues);
  };
  render() {
    const { classes } = this.props;
    // Render Auth Form for user sign in with other options print out
    return (
      <Paper className={classes.container}>
        <Typography variant="h3">
          Please Enter Your Email and Password to Continue
        </Typography>
        <AuthForm
          onFormSubmit={this.onSubmit}
          fieldNames={["email", "password"]}
          btnText="Continue"
          otherOptionBtnText="New Profile"
          otherOptionQuestion="Don't Have A Profile? "
          renderFields={this.renderFields}
          otherOptRoute="/signup"
          onFormSubmit={this.onSubmit}
          isSignIn
        />
      </Paper>
    );
  }
}
// Get auth from application state
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};
// Connect with signIn and getUser action
export default connect(mapStateToProps, { signIn, getUser })(
  withFirebase(withStyles(styles)(LogInForm))
);

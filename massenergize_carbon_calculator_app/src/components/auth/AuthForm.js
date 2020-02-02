//Functional component import
import React from "react";
import { Fields, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withFirebase } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { signIn, createUser } from "../../actions";
import { facebookProvider, googleProvider } from "../../config/firebaseConfig";
//Styling Component import
import { Grid, Typography, Button, CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
//Styling classes
const style = {
  link: {
    textDecoration: "none"
  },
  googleBtn: {
    color: "white",
    backgroundColor: "red"
  },
  fbBtn: {
    color: "white",
    backgroundColor: "#3b5998"
  },
  error: {
    color: "red"
  },
  submitBtn: {
    backgroundColor: "#8dc63f",
    color: "white"
  }
};

class AuthForm extends React.Component {
  state = {
    error: "",
    loading: false,
  };

  render() {
    return (
      <>
        <div>{this.renderPage()}</div>
      </>
    );
  }

  renderOtherOpt = () => {
    // Rendering other auth option: with Google, Facebook, register if haven't done so or forgot the password
    const {
      classes,
      otherOptionBtnText,
      otherOptionQuestion,
      otherOptRoute
    } = this.props;
    return (
      <Grid item container direction="column" spacing={2}>
        <Grid item>
          <Button
            onClick={this.signInWithFacebook}
            id="facebook"
            className={`img-circle facebook ${classes.fbBtn}`}
          >
            <span className="fa fa-facebook-f"> Continue with Facebook</span>
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={this.signInWithGoogle}
            id="google"
            className={`img-circle google ${classes.googleBtn}`}
          >
            <span className="fa fa-google"> Continue with Google</span>
          </Button>
        </Grid>
        <Grid item>
          <Typography>
            {otherOptionQuestion}{" "}
            <Link
              className={classes.link}
              to={otherOptRoute ? otherOptRoute : "#"}
            >
              {otherOptionBtnText}
            </Link>
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            <Link className={classes.link} to="/resetpass">
              Forgot Your Password?
            </Link>
          </Typography>
        </Grid>
      </Grid>
    );
  };

  renderPage = () => {
    // Rendering Fields provided and other auth option if specified
    const {
      classes,
      isSignIn,
      signUp,
      handleSubmit,
      onFormSubmit,
      renderFields,
      btnText,
      fieldNames
    } = this.props;
    return (
      <form onSubmit={e => {
        this.setState({loading: true})
        handleSubmit(onFormSubmit)(e)
      }
        }>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Fields names={fieldNames} component={renderFields} />
          </Grid>
          <Grid item>
            <Button className={classes.submitBtn} type="submit">
              {btnText}{this.state.loading && <span><CircularProgress/></span>}
            </Button>
          </Grid>
          {this.state.error && (
            <Typography style={{ color: "red" }}>{this.state.error}</Typography>
          )}
          {!(isSignIn || signUp) ? <></> : this.renderOtherOpt()}
        </Grid>
      </form>
    );
  };

  // KNOWN BUG : LOGGING IN WITH GOOGLE WILL DELETE ANY ACCOUNT WITH THE SAME PASSWORD:
  // WOULD NOT DELETE DATA I THINK?
  // Sign in with Google function
  signInWithGoogle = () => {
    // Authentication reset upon closing tab/window
    this.props.firebase
      .auth()
      .setPersistence(this.props.firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        this.props.firebase
          .auth()
          .signInWithPopup(googleProvider)
          .then(auth => {
            console.log("User is "+auth.user);
            // Save user information to backend database
            if (this.props.isSignIn) {
              this.props.signIn(auth.user);
            }
            if (this.props.signUp) {
              auth.user.sendEmailVerification();
            }
          })
          .catch(err => {
            this.setState({ error: err.message });
          });
      });
  };
  // Sign In with Facebook function
  signInWithFacebook = () => {
    // Authentication reset upon closing tab/window
    this.props.firebase
      .auth()
      .setPersistence(this.props.firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        this.props.firebase
          .auth()
          .signInWithPopup(facebookProvider)
          .then(auth => {
            // Save user information to backend database
            if (this.props.isSignIn) this.props.signIn(auth.user.email);
            if (this.props.signUp) console.log(auth);
          })
          .catch(err => {
            this.setState({ error: err.message });
          });
      });
  };
}
// Get auth from application state
// TODO: May switch to context for redirect
const mapStoreToProps = state => {
  return {
    auth: state.firebase.auth
  };
};
// Form validation
const validate = formValues => {
  const errors = {};

  if (!formValues.email) {
    errors.email = "You Must Enter an Email";
  }

  if (!formValues.password) {
    errors.password = "You Must Enter a Password";
  }

  if (!formValues.passwordOne) {
    errors.passwordOne = "You Must Enter a Password";
  }

  if (!formValues.passwordTwo) {
    errors.passwordTwo = "You Must Enter a Password";
  }
  // Check if second password match first on sign up
  if (formValues.passwordTwo !== formValues.passwordOne) {
    errors.passwordTwo = "Passwords You Enter Are Not Matched";
  }

  if (!formValues.first_name) {
    errors.first_name = "Please Let Us Know Who You Are";
  }

  if (!formValues.last_name) {
    errors.last_name = "Please Let Us Know Who You Are";
  }

  if (!formValues.locality) {
    errors.locality = "Please Let Us Know Where You From";
  }

  if (!formValues.locality) {
    errors.groups = "Please Select Your Group";
  }

  if (!formValues.minimum_age) {
    errors.minimum_age = "You Must Be Above 13 To Continue";
  }

  if (!formValues.accept_terms_and_conditions) {
    errors.accept_terms_and_conditions =
      "You Must Accept Our Terms And Conditions";
  }

  return errors;
};
// Connect action to redux form
export default connect(mapStoreToProps, { signIn, createUser })(
  reduxForm({
    form: "authForm",
    validate
  })(withFirebase(withStyles(style)(AuthForm)))
);

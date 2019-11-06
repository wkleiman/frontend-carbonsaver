import React from 'react';
import { connect } from 'react-redux'
import { signIn } from '../../actions'
import AuthForm from './AuthForm';
import { Grid, TextField, Paper } from '@material-ui/core';
import history from '../../history';
import { withStyles } from '@material-ui/core/styles';
import { withFirebase } from 'react-redux-firebase';

const styles = {
    textInput: {
        width: '100%'
    },
    container: {
        margin: '5vh auto',
        width: '50vh',
        padding: '2vh'
    }
}

class LogInForm extends React.Component {
    state = { error: '' };
    componentDidMount() {
        if (this.props.firebase) {
            var user = this.props.firebase.auth().currentUser;
            if (user) {
                history.push('/event/CC_Event_1')
            }
        }
    }
    renderError({ touched, error }) {
        if (touched && error) {
            return error;
        }
    }
    normalLogin({ email, password }) {
        let auth = this.props.firebase.auth();
        auth.signInWithEmailAndPassword(email, password).then(res => {
            auth.currentUser.getIdToken(true).then(idToken => {
                this.props.signIn(idToken);
            })
        })
            .catch(err => {
                console.log("Error:", err.message);
                this.setState({ error: err });
            })
    }

    renderFields = (fields) => {
        const { classes } = this.props;
        return (
            <Grid container>
                <Grid item>
                    <TextField
                        className={classes.textInput}
                        {...fields.email.input}
                        helperText={this.renderError(fields.email.meta)}
                        label="Email"
                        variant="outlined"
                        required />
                </Grid>
                <Grid item>
                    <TextField
                        className={classes.textInput}
                        {...fields.password.input}
                        helperText={this.renderError(fields.password.meta)}
                        label="Password"
                        variant="outlined"
                        type="password" required />
                </Grid>
            </Grid>
        );
    }
    onSubmit = formValues => {
        this.normalLogin(formValues);
    }
    render() {
        return (
            <Paper>
                <AuthForm
                    title="Sign In"
                    onFormSubmit={this.onSubmit}
                    fieldNames={['email', 'password']}
                    btnText="Sign In"
                    otherOptionBtnText="Sign Up"
                    otherOptionQuestion="Don't Have An Account? "
                    renderFields={this.renderFields}
                    otherOptRoute="/signup"
                    onFormSubmit={this.onSubmit} />
            </Paper>
        );
    }
}
const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
    }
}
export default connect(mapStateToProps, { signIn })(withFirebase(withStyles(styles)(LogInForm)));
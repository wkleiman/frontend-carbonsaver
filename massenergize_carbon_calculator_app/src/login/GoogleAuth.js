import React from 'react';
import history from '../history';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import { CircularProgress, Button } from '@material-ui/core';
import { GOOGLE_AUTH_CLIENT_ID } from './credentials';
class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                client_id: GOOGLE_AUTH_CLIENT_ID,
                scope: 'email',
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        })
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId(), "Google");
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return <CircularProgress />
        } else if (this.props.isSignedIn) {
            history.push('/');
        } else {
            return (
                <Button onClick={this.onSignInClick}>
                    <i className="fa fa-google" />
                    Continue with Google
                </Button>
            )
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>
    }
}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
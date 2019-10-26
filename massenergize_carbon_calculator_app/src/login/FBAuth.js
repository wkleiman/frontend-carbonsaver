import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';

class FBAuth extends React.Component {
    componentDidMount() {
        if (window.FB) {
            window.FB.getLoginStatus(response => {
                if (response.status === 'connected') {
                    this.props.signIn(response.authResponse.userID);
                } else {
                    this.props.signOut();
                }
            })
        }
    }
    signIn = () => {
        window.FB.login(response => {
            if (response.status === 'connected')
                this.props.signIn(response.authResponse.userID, "Facebook")
        });
    }
    render() {
        if (this.props.isSignedIn === null) return <CircularProgress />
        else if (this.props.isSignedIn) {
            return (
                <Button onClick={this.signOut}>Sign Out</Button>
            );
        }
        else {
            return <Button onClick={this.signIn}><i className="fa fa-facebook-square" />Continue with Facebook</Button>
        }
    }
}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(FBAuth);
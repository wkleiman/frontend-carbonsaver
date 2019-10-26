import React from 'react';
import FBAuth from './FBAuth';
import GoogleAuth from './GoogleAuth';

class LogInForm extends React.Component {
    render() {
        return (
            <div>
                <FBAuth />
                <GoogleAuth />
            </div>

        );
    }
}

export default LogInForm;
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import firebase from './components/auth/firebaseConfig';
import App from './components/App';
import reducers from './reducers';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
);


//react redux firebase configure
const rrfConfig = { userProfile: 'users', firebaseStateName: 'firebase' };
//react redux firebase props
const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch
}

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <App />
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root')
);

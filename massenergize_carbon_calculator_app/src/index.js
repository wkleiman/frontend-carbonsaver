// Functional imports
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import firebase from "./config/firebaseConfig";
import App from "./components/App";
import reducers from "./reducers";

// For redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

//react redux firebase configuration
const rrfConfig = { userProfile: "users", firebaseStateName: "firebase" };
//react redux firebase props
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
};

// Render App to DOM
ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

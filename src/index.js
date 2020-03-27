import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app'
import 'firebase/firestore'
import { config } from './environment';
import { store } from './redux/store'
import { Provider } from 'react-redux';

if (firebase.apps.length === 0)
    firebase.initializeApp(config)
firebase.firestore().settings({ timestampsInSnapshots: true })

export const firestore = firebase.firestore()

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

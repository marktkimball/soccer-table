import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import './index.css';
import Router from './Router';
import * as serviceWorker from './serviceWorker';

const firebaseConfig = {
  apiKey: 'AIzaSyDaTD1uEKqFnD3oc0p-h_EdO35NXyyR4rw',
  authDomain: 'soccer-table-c68e5.firebaseapp.com',
  databaseURL: 'https://soccer-table-c68e5.firebaseio.com',
  projectId: 'soccer-table-c68e5',
  storageBucket: 'soccer-table-c68e5.appspot.com',
  messagingSenderId: '26071907727',
  appId: '1:26071907727:web:e8ecc1be5911e42bde9ffa',
  measurementId: 'G-630EZ3M15R',
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<Router />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

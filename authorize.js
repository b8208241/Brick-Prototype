//Important!! "babel-polyfill" is for es6 technique
import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import Login from './authorize/Login.jsx'
import {loginFlow, registerFlow} from './authorize/login.js'


ReactDOM.render(
  <Login loginFlow={loginFlow} registerFlow={registerFlow}/>, document.getElementById("app")
);

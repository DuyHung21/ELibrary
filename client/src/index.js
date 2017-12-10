import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import App from './js/App';
import {Provider} from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>
  , document.getElementById('root'));

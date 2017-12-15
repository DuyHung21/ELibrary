import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import './css/admin/style.css';
import AppIndex from './js/App';
import {Provider} from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store = {store}>
    <AppIndex />
  </Provider>
  , document.getElementById('root'));

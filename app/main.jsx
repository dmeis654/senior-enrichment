'use strict'
import React from 'react'
import {render} from 'react-dom'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import store from './store'
import Root from './components/Root'

render (
  <Provider store={store}>
    <Root/>
 </Provider>,
  document.getElementById('main')
)
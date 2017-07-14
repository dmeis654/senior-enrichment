import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios'
import store from '../store'


export default class Home extends Component {
  render() {
    return (
      <div>
        <h1> Welcome to Margaret Hamilton Interplanetary Academy of JavaScript! </h1>
        <img src="http://cdn.whatismyipaddress.com/images-v4/hacking.png"/>
      </div>
    )
  }
}
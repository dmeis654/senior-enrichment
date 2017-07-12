import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

export default class Navbar extends Component {

  render () {
    return (
        <nav className = "navbar navbar-default">
          <div className="container">
            <span className="col-lg-4">
              <Link to ="/">Home</Link>
            </span>
            <span className="col-lg-4">
              <Link to="/campuses">Campuses</Link>
            </span>
            <span className="col-lg-4">
              <Link to="/students">Students</Link>
            </span>
          </div>
        </nav>
    );
  }
}
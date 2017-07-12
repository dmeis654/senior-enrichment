import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios'
import store from '../store'
import {fetchCampuses, getCampuses} from "../reducers/index"

export function AllCampuses (props) {

  // componentDidMount() {
  //   this.props.allCampuses()
  // }

  // render() {

    return (
      <div>
        <h3>Campuses</h3>
        <div className="list-group">
          {
            props.campuses.map(campus => {
              return (
                <div className="list-group-item" key={campus.id}>
                  <Link to={`/campus/${campus.id}`}>{campus.name}</Link>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  //}
}

const mapStateToProps = function (state) {
  return {
    campuses: state.campuses 
  }
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    //  allCampuses: () => {
    //    return dispatch(fetchCampuses())
    //  }
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(AllCampuses)
export default Container
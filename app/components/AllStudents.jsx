import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios'
import store from '../store'
import {fetchStudents, getStudents} from "../reducers/index"

export function AllStudents (props) {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     students: [],
  //   };
  // }

  // componentDidMount() {
  //   axios.get('/api/student')
  //     .then(res => res.data)
  //     .then(students => this.setState({ students }))
  // }

  // render() {

    return (
      <div>
        <h3>Students</h3>
        <div className="list-group">
          {
            props.students.map(student => {
              return (
                <div className="list-group-item" key={student.id}>
                  <Link to={`/student/${student.id}`}>{student.name}</Link>
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
    students: state.students 
  }
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    //  allCampuses: () => {
    //    return dispatch(fetchCampuses())
    //  }
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(AllStudents)
export default Container
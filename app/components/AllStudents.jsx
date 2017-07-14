import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios'
import store from '../store'
import {fetchStudents, getStudents, deleteStudent} from "../reducers/index"
import NewStudent from './NewStudent'

class AllStudents extends Component {

  constructor(props) {
    super(props);
    this.renderDelete = this.renderDelete.bind(this)
   }

   renderDelete(studentId) {
     return (
       <button type="delete" className="btn btn-primary" onClick={() => this.props.deleteStudent(studentId)}>
        X
       </button>
     )
   }

  render() {
    const campuses = this.props.campuses
    console.log(campuses)
    return (
      <div>
        <h3 className = "studentHeader">Students</h3>
        <ul className="list-group">
          {
            this.props.students.map(student => {
              return (
                <li className="list-group-item" key={student.id}>
                  <Link to={`/student/${student.id}`}>{student.name}</Link>
                  --------
                  <Link to={`/campus/${student.campusId.id}`}>{campuses.filter(campus => student.campusId === campus.id)[0].name}
                  </Link>
                  --------
                  {this.renderDelete(student.id)}
                </li>
              );
            })
          }
        </ul>
        <NewStudent />
      </div>
    );
  }
}



const mapStateToProps = function (state) {
  return {
    students: state.students,
    campuses: state.campuses 
  }
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    deleteStudent: (studentId) => {
      dispatch(deleteStudent(studentId))
    }
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(AllStudents)
export default Container

// <button type="delete" className="btn btn-primary" onClick={() => this.props.deleteStudent(student.id)}>
//    X
//  </button>
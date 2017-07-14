import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import {connect} from 'react-redux';
import store from '../store'
import {fetchSingleStudent, getSingleStudent, getCampuses, updateStudent, deleteStudent} from "../reducers/index"

const blankFormState = {
  studentName: "",
  studentEmail: ""
}

class SingleStudent extends Component {
  constructor (props) {
    super(props);
    this.state = blankFormState
    this.studentSubmitHandler = this.studentSubmitHandler.bind(this)
    this.studentChangeHandler = this.studentChangeHandler.bind(this)
    }
  
  componentDidMount () {
    this.props.campusList(this.props.match.params.id)
  }

  studentChangeHandler(event){
    const value = event.target.value
    this.setState({
      [event.target.name]: value
    })
  }

  studentSubmitHandler(event){
    event.preventDefault()
    const newStudent = {
      name: event.target.studentName.value,
      email: event.target.studentEmail.value,
      campusId: event.target.campus.value
    }
    this.props.updateStudent(newStudent, this.props.student.id)
    this.setState(blankFormState)
  }

  render () {
    const student = this.props.student
    const campuses = this.props.campuses
    
    return (
        <div>
          <div className="Student">
            <h3 id= "studentHeader">Student</h3>
            <div className="list-group">
                Name: {student.name} ----- eMail: {student.email}
                {
                    campuses.filter(campus => campus.id === student.campusId).map(campusFromStudent => {
                            return (
                                <div className="list-group-item" key={campusFromStudent.id}>
                                    <Link to={`/campus/${campusFromStudent.id}`}>{campusFromStudent.name}</Link>
                                    <img src = {campusFromStudent.image}/>
                                </div>
                            );
                        })
                    }
            </div>
          </div>
          <div>
            <h3>Update Student Info:</h3>
            <form onSubmit={this.studentSubmitHandler}>
              <label>New Student Name</label>
              <input 
                name="studentName" 
                type="name"
                className = "form-control"
                onChange={this.studentChangeHandler}
                value={this.state.studentName}
                required
              />
              <label>New Student Email</label>
              <input 
                name="studentEmail" 
                type="name"
                className = "form-control"
                onChange={this.studentChangeHandler}
                value={this.state.studentEmail}
                required
              />
              <label>Student Campus</label>
              <select name="campus">
                {
                  this.props.campuses.map(campus => {
                    return (
                      <option value={campus.id} key={campus.id}> {campus.name} </option>
                    )
                  })
                }
              </select>
              <span className="input-group-btn">
                <button className="btn btn-default" type="submit">Submit</button>
              </span>
            </form>
          </div>
        </div>
    );
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    student: state.student,
    campuses: state.campuses
  }
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    campusList: (studentId) => {
      dispatch(fetchSingleStudent(studentId))
    },
    updateStudent: (name, studentId) => {
      dispatch(updateStudent(name, studentId))
    }
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(SingleStudent)
export default Container
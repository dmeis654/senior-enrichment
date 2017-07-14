import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import NewStudent from './NewStudent'
import {connect} from 'react-redux';
import store from '../store'
import {fetchSingleCampus, getSingleCampus, postStudent, updateCampus, deleteStudent} from "../reducers/index"


const blankFormState = {
  name: "",
  image: ""
}

class SingleCampus extends Component {
  constructor (props) {
    super(props);
    this.state = blankFormState
    this.campusSubmitHandler = this.campusSubmitHandler.bind(this)
    this.campusChangeHandler = this.campusChangeHandler.bind(this)
    }

  componentDidMount () {
    this.props.studentList(this.props.match.params.id)
  }

   campusChangeHandler(event){
    const value = event.target.value
    this.setState({
      [event.target.name]: value
    })
  }

  campusSubmitHandler(event){
    event.preventDefault()
    const updatedCampus = {
      name: event.target.name.value,
      image: event.target.image.value
    }
    this.props.updateCampus(updatedCampus, this.props.campus.id)
    this.setState(blankFormState)
  }

  render () {
    const campus = this.props.campus
    const students = this.props.students
    return (
      <div>
        <div className="campus">
          {campus.name} 
          <img src={campus.image}/>
          {
              students.filter(student => student.campusId === campus.id).map(studentFromCampus => {
                  return(
                      <div className="list-group-item" key={studentFromCampus.id}>
                          <Link to={`/student/${studentFromCampus.id}`}>{studentFromCampus.name}</Link>
                          <button type="delete" className="btn btn-primary" onClick={() => this.props.deleteStudent(studentFromCampus.id)}>
                            X
                          </button>
                      </div>
                  )
              })
          }
        </div>
        <div className="updateCampus">
          <h3>Update A Campus:</h3>
            <form onSubmit={this.campusSubmitHandler}>
              <label>New Campus Name</label>
              <input 
                name="name" 
                type="name"
                className = "form-control"
                onChange={this.campusChangeHandler}
                value={this.state.name}
                required
              />
              <label>New Campus image</label>
              <input 
                name="image" 
                type="name"
                className = "form-control"
                onChange={this.campusChangeHandler}
                value={this.state.image}
                required
              />
              <span className="input-group-btn">
                <button className="btn btn-default" type="submit">Submit</button>
              </span>
            </form>
            <NewStudent />
        </div>
      </div>

    );
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    campus: state.campus,
    students: state.students
  }
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    studentList: (campusId) => {
      dispatch(fetchSingleCampus(campusId))
    },
    updateCampus: (name, campusId) => {
      dispatch(updateCampus(name, campusId))
    },
    deleteStudent: (studentId) => {
      dispatch(deleteStudent(studentId))
    }
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(SingleCampus)
export default Container
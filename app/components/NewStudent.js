import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import {connect} from 'react-redux';
import store from '../store'
import {postStudent} from "../reducers/index"

const blankFormState = {
    name: '',
    email: ''
}

class NewStudent extends Component {
  constructor (props) {
    super(props);
    this.state = blankFormState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    }

    handleChange (event) {
        const value = event.target.value
        this.setState({
            [event.target.name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.post(event.target.name.value, event.target.email.value, event.target.campus.value)
        this.setState(blankFormState)   
    }

render () {
    return (
    
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <h3>Add a New Student:</h3>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Please Enter Student Name"
          />
          <input
            className="form-control"
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="Please Enter Student Email"
          />
          <label>Student Campus:</label>
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
        </div>
      </form>
    )
  }
}


const mapState = function (state, ownProps){
    return {
        student: state.student,
        campuses: state.campuses
    }
}

const mapDispatch = function(dispatch){
  return {
    post: (name, email, campusId) => {
      dispatch(postStudent(name, email, campusId))
    }
  }
};

const Container = connect(mapState, mapDispatch)(NewStudent);
export default Container
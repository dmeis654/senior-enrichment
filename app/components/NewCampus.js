import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import {connect} from 'react-redux';
import store from '../store'
import {postCampus} from "../reducers/index"

const blankFormState = {
    name: '',
    image: ''
}

class NewCampus extends Component {
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
        this.props.post(event.target.name.value, event.target.image.value)
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
            placeholder="Please Enter Campus Name"
          />
          <input
            className="form-control"
            type="text"
            name="image"
            value={this.state.image}
            onChange={this.handleChange}
            placeholder="Please Enter Campus Image Link"
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Submit</button>
          </span>
        </div>
      </form>
    );
  }
}

const mapState = function (){
    return {

    }
}

const mapDispatch = function(dispatch){
  return {
    post: (name, image) => {
      dispatch(postCampus(name, image))
    }
  }
};

const Container = connect(mapState, mapDispatch)(NewCampus);
export default Container
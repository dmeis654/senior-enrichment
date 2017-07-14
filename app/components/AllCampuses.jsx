import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios'
import store from '../store'
import {fetchCampuses, getCampuses, deleteCampus} from "../reducers/index"
import NewCampus from './NewCampus'

class AllCampuses extends Component {

   constructor(props) {
    super(props);
    this.renderDelete = this.renderDelete.bind(this)
   }

   renderDelete(campusId) {
     return (
       <button type="delete" className="btn btn-primary deletebutton" onClick={(event) => this.props.deleteCampus(campusId)}>
        X
       </button>
     )
   }

  render() {
    return (
      <div>
        <h3 className="camps">Campuses</h3>
        <ul className="list-group">
          {
            this.props.campuses.map(campus => {
              return (
                <li className="list-group-item" key={campus.id}>
                  <Link to={`/campus/${campus.id}`}>{campus.name}</Link>
                  <img src={campus.image}/>
                  {this.renderDelete(campus.id)}
                </li>
              );
            })
          }
        </ul>
        <NewCampus />
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    campuses: state.campuses 
  }
}

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    deleteCampus: (campusId) => {
      dispatch(deleteCampus(campusId))
    }
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(AllCampuses)
export default Container
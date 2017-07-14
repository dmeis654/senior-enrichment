//This is where all my routes are, but I called it root
//instead of routes because I can't spell ¯\_(ツ)_/¯

import React, { Component } from 'react'
import { connect } from 'react-redux';
import Navbar from './Navbar'
import AllCampuses from './AllCampuses'
import AllStudents from './AllStudents'
import SingleCampus from './SingleCampus'
import SingleStudent from './SingleStudent'
import NewCampus from './NewCampus'
import NewStudent from './NewStudent'
import Home from './Home'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import axios from 'axios'
import {fetchCampuses, fetchStudents, fetchSingleCampus, fetchSingleStudent, postCampus, postStudent} from '../reducers/index'

//export default class Root extends Component{
class Root extends Component{
  componentDidMount (){
    this.props.fetchInitialData()
  }


  render() {
    return(
      <Router>
        <div id="main" className="containerfluid">
          <div>
            <Navbar/>
          </div>
          <div className="col-xs-10">
            <Switch>
              <Route exact path ='/' component ={Home}/>
              <Route exact path="/campuses" component={AllCampuses}/>
              <Route path="/campus/:id" component={SingleCampus}/>
              <Route exact path="/students" component={AllStudents}/>
              <Route path="/student/:id" component={SingleStudent}/>
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

const mapProps = null
// storeState => ({
//   campus: storeState.campus
// })

const mapDispatch = (dispatch, ownProps) => ({
  fetchInitialData: () => {
    dispatch(fetchCampuses())
    dispatch(fetchStudents())
  }
})

export default connect(mapProps, mapDispatch)(Root);
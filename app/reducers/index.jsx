import { combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios'


//INITIAL STATE
const initialState = {
  campuses: [],
  students: []
}

//ACTION TYPES
const GET_ALL_CAMPUSES = "GET_ALL_CAMPUSES"
const GET_ALL_STUDENTS = "GET_ALL_STUDENTS"


//ACTION CREATORS
export function getCampuses (campuses) {
  const action = {type: GET_ALL_CAMPUSES, campuses}
  return action
}

export function getStudents (students) {
  const action = {type: GET_ALL_STUDENTS, students}
  return action
}



//THUNK CREATORS
export function fetchCampuses (){
  return function thunk (dispatch) {
    return axios.get('/api/campus')
      .then(res => res.data)
      .then(campuses => {
        const action = getCampuses(campuses);
        dispatch(action);
      });
  }
}

export function fetchStudents (){
  return function thunk (dispatch) {
    return axios.get('/api/student')
      .then(res => res.data)
      .then(students => {
        const action = getStudents(students);
        dispatch(action);
      });
  }
}

//REDUCERS
const rootReducer = function(prevState = initialState, action) {
  const newState = Object.assign({}, prevState);

  switch(action.type) {
    case GET_ALL_CAMPUSES:
      newState.campuses = action.campuses;
      break;

    case GET_ALL_STUDENTS:
      newState.students = action.students;
      break;

    default:
      break;
  }
  return newState
};

export default rootReducer

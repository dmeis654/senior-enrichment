import { combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios'


//INITIAL STATE
const initialState = {
  campuses: [],
  students: [],
  campus: {},
  student: {}
}

//ACTION TYPES
const GET_ALL_CAMPUSES = "GET_ALL_CAMPUSES"
const GET_ALL_STUDENTS = "GET_ALL_STUDENTS"
const GET_SINGLE_CAMPUS = "GET_SINGLE_CAMPUS"
const GET_SINGLE_STUDENT = "GET_SINGLE_STUDENT"
const POST_NEW_CAMPUS = "POST_NEW_CAMPUS"
const POST_NEW_STUDENT = "POST_NEW_STUDENT"
const DELETE_A_STUDENT = "DELETE_A_STUDENT"
const DELETE_A_CAMPUS= "DELETE_A_CAMPUS"
const UPDATE_A_CAMPUS= "UPDATE_A_CAMPUS"
const UPDATE_A_STUDENT= "UPDATE_A_STUDENT"


//ACTION CREATORS
export function getCampuses (campuses) {
  const action = {type: GET_ALL_CAMPUSES, campuses}
  return action
}

export function getStudents (students) {
  const action = {type: GET_ALL_STUDENTS, students}
  return action
}

export function getSingleCampus (campus) {
  const action = {type: GET_SINGLE_CAMPUS, campus}
  return action
}

export function getSingleStudent (student) {
  const action = {type: GET_SINGLE_STUDENT, student}
  return action
}

export function postNewCampus (newCampus) {
  const action = {
    type: POST_NEW_CAMPUS,
    newCampus: newCampus
  }
  return action
}

export function postNewStudent (newStudent) {
  const action = {
    type: POST_NEW_STUDENT,
    newStudent: newStudent
  }
  return action
}

export function deleteAStudent (studentId) {
  const action = {
    type: DELETE_A_STUDENT,
    studentId
  }
  return action
}

export function deleteACampus (campusId) {
  const action = {
    type: DELETE_A_CAMPUS,
    campusId
  }
  return action
}

export function updateACampus (campus) {
  const action = { type: UPDATE_A_CAMPUS, campus };
  return action;
}

export function updateAStudent (student) {
  const action ={ type: UPDATE_A_STUDENT, student }
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
      })
      .catch(err => console.error(`Fetching campuses unsuccesful`, err))
  }
}

export function fetchStudents (){
  return function thunk (dispatch) {
    return axios.get('/api/student')
      .then(res => res.data)
      .then(students => {
        const action = getStudents(students);
        dispatch(action);
      })
      .catch(err => console.error(`Fetching students unsuccesful`, err))
  }
}

export function fetchSingleCampus (campusId){
  return function thunk (dispatch) {
    return axios.get(`/api/campus/${campusId}`)
      .then(res => res.data)
      .then(campus => {
        const action = getSingleCampus(campus);
        dispatch(action)
      })
      .catch(err => console.error(`Fetching campus unsuccesful`, err))
  }
}

export function fetchSingleStudent (studentId){
  return function thunk (dispatch) {
    return axios.get(`/api/student/${studentId}`)
      .then(res => {return console.log(res.data), res.data})
      .then(student => {
        const action = getSingleStudent(student);
        dispatch(action);
        })
      .catch(err => console.error(`Fetching campus unsuccesful`, err))
  }
}

export function postCampus (name, image){
  return function thunk (dispatch) {
    return axios.post('/api/campus', ({name, image}))
      .then(res => res.data)
      .then(newCampus => {
        const action = postNewCampus(newCampus);
        dispatch(action);
      })
      .catch(err => console.error(`Creating campus: ${name} unsuccesful`, err))
  }
}

export function postStudent (name, email, campusId){
  return function thunk (dispatch) {
    return axios.post('/api/student', ({name, email, campusId}))
      .then(res => res.data)
      .then(newStudent => {
        const action = postNewStudent(newStudent);
        dispatch(action);
        }
      )
      .catch(err => console.error(`Creating student: ${name} unsuccesful`, err))
  }
}

export function deleteStudent (studentId){
  return function thunk (dispatch) {
    dispatch(deleteAStudent(studentId))
    return axios.delete(`/api/student/${studentId}`)
    .catch(err => console.error(`Removing student: ${studentId} unsuccesful`, err));
  }
}

export function deleteCampus (campusId){
  return function thunk (dispatch) {
    dispatch(deleteACampus(campusId))
    return axios.delete(`/api/campus/${campusId}`)
    .catch(err => console.error(`Removing campus: ${campusId} unsuccesful`, err));
  }
}

export function updateCampus (campus, campusId) {
  return function thunk (dispatch) {
    return axios.put(`/api/campus/${campusId}`, campus)
      .then(res => res.data)
      .then(updatedCampus => {
        dispatch(getSingleCampus(updatedCampus))
        return updatedCampus})
      .then(updatedCampus => {
        const action = updateAStudent(updatedCampus);
        dispatch(action);
      })
      .catch(err => console.error(`Creating campus: ${campus} unsuccesful`, err))
  }
}

export function updateStudent (student, studentId) {
  return function thunk (dispatch) {
    return axios.put(`/api/student/${studentId}`, student)
      .then(res => res.data)
      .then(updatedStudent => {
        dispatch(getSingleStudent(updatedStudent))
        return updatedStudent})
      .then(updatedStudent => {
        dispatch(fetchSingleCampus(updatedStudent.campusId))
        return updatedStudent
      })
      .then(updatedStudent => {
        const action = updateAStudent(updatedStudent);
        dispatch(action);
      })
      .catch(err => console.error(`Updating student: ${student} unsuccesful`, err))
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

    case GET_SINGLE_CAMPUS:
      newState.campus = action.campus
      break;

    case GET_SINGLE_STUDENT:
      newState.student = action.student
      break;

    case POST_NEW_CAMPUS:
      newState.campuses = [...prevState.campuses, action.newCampus]
      break;

    case POST_NEW_STUDENT:
      newState.students = [...prevState.students, action.newStudent]
      break;
    
    case DELETE_A_STUDENT:
      newState.students = prevState.students.filter(student => student.id !== action.studentId)
      break;

    case DELETE_A_CAMPUS:
      newState.campuses = prevState.campuses.filter(campus => campus.id !== action.campusId)
      break;
    
    case UPDATE_A_CAMPUS:
      newState.campuses = prevState.campuses.map(campus => {
        return (campus.id === action.campus.id) ? action.campus : campus
      })
      break;
    
    case UPDATE_A_STUDENT:
      newState.students = prevState.students.map(student => {
        return (student.id === action.student.id) ? action.student : student
      })

    default:
      break;
  }
  return newState
};

export default rootReducer

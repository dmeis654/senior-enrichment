import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';

export default class SingleStudent extends Component {

  constructor (props) {
    super(props);
    this.state = {
      student: {},
      studentCampus: []
    };
  }

  componentDidMount () {
    const studentId = this.props.match.params.id;
    axios.get(`/api/student/${studentId}`)
        .then(res => res.data)
        .then(student => {
            this.setState({
                student
            })
            axios.get('/api/campus')
                .then(res => res.data)
                .then(campuses => {
                    const actualCampus = campuses.filter(campus => campus.id === this.state.student.campusId)
                    this.setState({
                        studentCampus: actualCampus
                    })
                })
            }
        )
  }

  render () {
    
    const student = this.state.student
    const studentCampus = this.state.studentCampus
    
    return (
        <div> 
            <h3>Student</h3>
            <div className="list-group">
                Name: {student.name} eMail: {student.email}
                {
                    this.state.studentCampus.map(campus => {
                        return (
                            <div className="list-group-item" key={campus.id}>
                                <Link to={`/campus/${campus.id}`}>{campus.name}</Link>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
  }
}
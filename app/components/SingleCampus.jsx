import React, {Component} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';

export default class SingleCampus extends Component {

  constructor (props) {
    super(props);
    this.state = {
      campus: {},
      studentsFromCampus: []
    };
  }

  componentDidMount () {
    const campusId = this.props.match.params.id;

    axios.get(`/api/campus/${campusId}`)
        .then(res => res.data)
        .then(campus => {
            this.setState({
                campus
            })
            axios.get('/api/student')
                .then(res => res.data)
                .then(students => {
                    const actualStudents = students.filter(student => student.campusId === this.state.campus.id)
                    this.setState({
                        studentsFromCampus: actualStudents
                    })
                })
            }
        )
  }

  render () {
    
    const campus = this.state.campus
    const campusStudents = this.state.studentsFromCampus
    return (
      <div className="campus">
        {campus.name} {campus.image}
        {
            campusStudents.map(student =>{
                return(
                    <div className="list-group-item" key={student.id}>
                         <Link to={`/student/${student.id}`}>{student.name}</Link>
                    </div>
                )
            })
        }
      </div>
    );
  }
}
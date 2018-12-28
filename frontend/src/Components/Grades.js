import React, { Component } from 'react';
import axios from 'axios';
import { Button, Grid, MenuItem, TextField } from '@material-ui/core';

import styles from '../App.module.css';

const API_URL = 'http://localhost:51054/api';

class Grades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grade: {
        StudentId: '',
        SubjectId: '',
        Value: ''
      },
      selectedStudent: '',
      selectedSubject: '',
      students: [],
      subjects: []
    };
    this.fetchStudents();
    this.fetchSubjects();
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    const grade = this.state.grade;
    grade[name] = value;
    this.setState({ grade: grade });
  };

  fetchStudents = () => {
    axios.get(`${API_URL}/Students`).then(res => {
      this.setState({ students: res.data });
    });
  };

  fetchSubjects = () => {
    axios.get(`${API_URL}/Subjects`).then(res => {
      this.setState({ subjects: res.data });
    });
  };

  registerGrade = () => {
    axios.post(`${API_URL}/Grades`, this.state.grade).then(res => {
      this.resetState();
    });
  };

  resetState = () => {
    this.setState({
      grade: {
        StudentId: '',
        SubjectId: '',
        Value: ''
      }
    });
  };

  render() {
    return (
      <div className={styles.Grades}>
        <h1>Registrar notas</h1>
        <Grid container>
          <Grid item md={3}>
            <form>
              <TextField
                autoComplete="off"
                fullWidth
                label="Seleccione el alumno"
                margin="normal"
                name="StudentId"
                onChange={this.handleInputChange}
                required
                select
                value={this.state.grade.StudentId}
                variant="outlined"
              >
                {this.state.students.map(student => {
                  return (
                    <MenuItem key={student.Id} value={student.Id}>
                      {student.Name}
                    </MenuItem>
                  );
                })}
              </TextField>
              <TextField
                autoComplete="off"
                fullWidth
                label="Seleccione la materia"
                margin="normal"
                name="SubjectId"
                onChange={this.handleInputChange}
                required
                select
                value={this.state.grade.SubjectId}
                variant="outlined"
              >
                {this.state.subjects.map(subject => {
                  return (
                    <MenuItem key={subject.Id} value={subject.Id}>
                      {subject.Name}
                    </MenuItem>
                  );
                })}
              </TextField>
              <TextField
                autoComplete="off"
                fullWidth
                label="Nota"
                margin="normal"
                name="Value"
                onChange={this.handleInputChange}
                required
                value={this.state.grade.Value}
                variant="outlined"
              />
            </form>
            <Button
              classes={{ root: styles['submit-button'] }}
              color="secondary"
              onClick={this.registerGrade}
              variant="contained"
            >
              Registrar notas
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Grades;

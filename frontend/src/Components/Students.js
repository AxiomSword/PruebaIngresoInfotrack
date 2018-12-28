import React, { Component } from 'react';
import axios from 'axios';
import { Button, Grid, Snackbar } from '@material-ui/core';

import StudentsForm from './StudentsForm';
import StudentsTable from './StudentsTable';

import styles from '../App.module.css';

const API_URL = 'http://localhost:51054/api';

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: 'create',
      lastStudent: {},
      snackbarMessage: '',
      student: {},
      studentToUpdate: {}
    };
    this.toggleForm = this.toggleForm.bind(this);
  }

  connectionFailed = () => {
    this.setSnackbarMessage(
      'Error conectando con el servidor, verifique el servidor o recargue la página.'
    );
  };

  studentPosted = student => {
    this.setState({ lastStudent: student });
    this.setSnackbarMessage('Alumno añadido exitósamente.');
  };

  studentUpdated = student => {
    this.setState({ studentToUpdate: student });
    this.setSnackbarMessage('Alumnno actualizado exitósamente.');
  };

  toggleForm = (form, studentId) => {
    this.setState({ form: form });
    if (form === 'create') {
      this.setState({
        student: {
          Names: '',
          Surnames: '',
          BirthDate: '1999-01-01',
          Phone: '',
          Address: '',
          Email: ''
        }
      });
    } else if (form === 'update') {
      this.fetchStudent(studentId);
    }
  };

  fetchStudent = Id => {
    axios
      .get(`${API_URL}/Students/${Id}`)
      .then(res => {
        let student = res.data;
        // Convert BirthDate from '1999-01-01T00:00:00' to '1999-01-01'
        student.BirthDate = student.BirthDate.slice(0, 10);
        if (student.Phone === null) student.Phone = '';
        if (student.Address === null) student.Address = '';
        if (student.Email === null) student.Email = '';
        this.setState({ student: student });
      })
      .catch(err => this.connectionFailed());
  };

  getCreateStudentButton = () => {
    if (this.state.form === 'update') {
      return (
        <Button
          classes={{ root: styles['create-student-button'] }}
          color="secondary"
          onClick={this.toggleForm.bind(null, 'create')}
          variant="contained"
        >
          Registrar nuevo alumno
        </Button>
      );
    }
  };

  setSnackbarMessage = message => {
    this.setState({
      snackbarMessage: message
    });
  };

  render() {
    return (
      <div className={styles.Students}>
        <h1>Alumnos</h1>
        {this.getCreateStudentButton()}
        <Grid container spacing={40}>
          <Grid item md={3}>
            <StudentsForm
              form={this.state.form}
              student={this.state.student}
              studentPosted={this.studentPosted}
              studentUpdated={this.studentUpdated}
            />
          </Grid>
          <Grid item md={8}>
            <StudentsTable
              connectionFailed={this.connectionFailed}
              lastStudent={this.state.lastStudent}
              studentToUpdate={this.state.studentToUpdate}
              toggleForm={this.toggleForm}
            />
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          autoHideDuration={4000}
          open={this.state.snackbarMessage !== ''}
          onClose={this.setSnackbarMessage.bind(null, '')}
          message={this.state.snackbarMessage}
        />
      </div>
    );
  }
}

export default Students;

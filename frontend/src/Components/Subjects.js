import React, { Component } from 'react';
import { Grid, Snackbar } from '@material-ui/core';

import SubjectsForm from './SubjectsForm';
import SubjectsTable from './SubjectsTable';

import styles from '../App.module.css';

class Subjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: 'create',
      lastSubject: {},
      snackbarMessage: '',
      subject: {},
      subjectToUpdate: {}
    };
  }

  connectionFailed = () => {
    this.setSnackbarMessage(
      'Error conectando con el servidor, verifique el servidor o recargue la página.'
    );
  };

  subjectPosted = subject => {
    this.setState({ lastSubject: subject });
    this.setSnackbarMessage('Materia añadida exitósamente.');
  };

  subjectUpdated = subject => {
    this.setState({ subjectToUpdate: subject });
    this.setSnackbarMessage('Materia actualizada exitósamente.');
  };

  toggleForm = (form, subject) => {
    this.setState({ form: form });
    if (form === 'create') {
      this.setState({
        subject: { Name: '', Department: '' }
      });
    } else if (form === 'update') {
      this.setState({
        subject: {
          Id: subject.Id,
          Name: subject.Name,
          Department: subject.Department
        }
      });
    }
  };

  setSnackbarMessage = message => {
    this.setState({
      snackbarMessage: message
    });
  };

  render() {
    return (
      <div className={styles.Subjects}>
        <h1>Materias</h1>
        <Grid container spacing={40}>
          <Grid item md={3}>
            <SubjectsForm
              form={this.state.form}
              subject={this.state.subject}
              subjectPosted={this.subjectPosted}
              subjectUpdated={this.subjectUpdated}
            />
          </Grid>
          <Grid item md={8}>
            <SubjectsTable
              connectionFailed={this.connectionFailed}
              lastSubject={this.state.lastSubject}
              subjectToUpdate={this.state.subjectToUpdate}
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

export default Subjects;

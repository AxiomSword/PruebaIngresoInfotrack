import React, { Component } from 'react';
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';

import styles from '../App.module.css';

const API_URL = 'http://localhost:51054/api';

class SubjectsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: {
        Name: '',
        Department: ''
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    const subject = this.state.subject;
    subject[name] = value;
    this.setState({ subject: subject });
  };

  postSubject = () => {
    axios.post(`${API_URL}/Subjects`, this.state.subject).then(res => {
      this.setState({ subject: { Name: '', Department: '' } });
      this.props.subjectPosted(res.data);
    });
  };

  updateSubject = () => {
    axios.put(`${API_URL}/Subjects`, this.state.subject).then(res => {
      this.setState({ subject: { Name: '', Department: '' } });
      this.props.subjectUpdated(res.data);
    });
  };

  getButton = () => {
    if (this.props.form === 'create') {
      return (
        <Button
          classes={{ root: styles['submit-button'] }}
          color="secondary"
          onClick={this.postSubject}
          variant="contained"
        >
          Registrar nueva materia
        </Button>
      );
    } else if (this.props.form === 'update') {
      return (
        <Button
          classes={{ root: styles['submit-button'] }}
          color="primary"
          onClick={this.updateSubject}
          variant="contained"
        >
          Actualizar materia
        </Button>
      );
    }
  };

  componentDidUpdate = prevProps => {
    if (this.props.subject !== prevProps.subject) {
      this.setState({ subject: this.props.subject });
    }
  };

  render() {
    return (
      <div className={styles.SubjectsForm}>
        <form>
          <TextField
            autoComplete="off"
            fullWidth
            label="Nombre"
            margin="normal"
            name="Name"
            onChange={this.handleInputChange}
            required
            value={this.state.subject.Name}
            variant="outlined"
          />
          <TextField
            autoComplete="off"
            fullWidth
            label="Facultad"
            margin="normal"
            name="Department"
            onChange={this.handleInputChange}
            required
            value={this.state.subject.Department}
            variant="outlined"
          />
          {this.getButton()}
        </form>
      </div>
    );
  }
}

export default SubjectsForm;

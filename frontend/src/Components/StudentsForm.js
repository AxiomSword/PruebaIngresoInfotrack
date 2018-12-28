import React, { Component } from 'react';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';

import styles from '../App.module.css';

const API_URL = 'http://localhost:51054/api';

class StudentsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {
        Names: '',
        Surnames: '',
        BirthDate: '1999-01-01',
        Phone: '',
        Address: '',
        Email: ''
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    const student = this.state.student;
    student[name] = value;
    this.setState({ student: student });
  };

  postStudent = () => {
    axios.post(`${API_URL}/Students`, this.state.student).then(res => {
      this.resetState();
      this.props.studentPosted(res.data);
    });
  };

  updateStudent = () => {
    axios.put(`${API_URL}/Students`, this.state.student).then(res => {
      this.resetState();
      this.props.studentUpdated(res.data);
    });
  };

  resetState = () => {
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
  };

  getButton = () => {
    if (this.props.form === 'create') {
      return (
        <Button
          classes={{ root: styles['submit-button'] }}
          color="secondary"
          onClick={this.postStudent}
          variant="contained"
        >
          Registrar nuevo alumno
        </Button>
      );
    } else if (this.props.form === 'update') {
      return (
        <Button
          classes={{ root: styles['submit-button'] }}
          color="primary"
          onClick={this.updateStudent}
          variant="contained"
        >
          Actualizar alumno
        </Button>
      );
    }
  };

  componentDidUpdate = prevProps => {
    if (this.props.student !== prevProps.student) {
      this.setState({ student: this.props.student });
    }
  };

  render() {
    return (
      <div className={styles.StudentsForm}>
        <form>
          <TextField
            autoComplete="off"
            fullWidth
            label="Nombres"
            margin="normal"
            name="Names"
            onChange={this.handleInputChange}
            required
            value={this.state.student.Names}
            variant="outlined"
          />
          <TextField
            autoComplete="off"
            fullWidth
            label="Apellidos"
            margin="normal"
            name="Surnames"
            onChange={this.handleInputChange}
            required
            value={this.state.student.Surnames}
            variant="outlined"
          />
          <TextField
            autoComplete="off"
            fullWidth
            label="Fecha de nacimiento"
            margin="normal"
            name="BirthDate"
            onChange={this.handleInputChange}
            type="date"
            value={this.state.student.BirthDate}
            variant="outlined"
          />
          <TextField
            autoComplete="off"
            fullWidth
            label="Teléfono"
            margin="normal"
            name="Phone"
            onChange={this.handleInputChange}
            value={this.state.student.Phone}
            variant="outlined"
          />
          <TextField
            autoComplete="off"
            fullWidth
            label="Dirección"
            margin="normal"
            name="Address"
            onChange={this.handleInputChange}
            value={this.state.student.Address}
            variant="outlined"
          />
          <TextField
            autoComplete="off"
            fullWidth
            label="Correo electrónico"
            margin="normal"
            name="Email"
            onChange={this.handleInputChange}
            value={this.state.student.Email}
            variant="outlined"
          />
          {this.getButton()}
        </form>
      </div>
    );
  }
}

export default StudentsForm;

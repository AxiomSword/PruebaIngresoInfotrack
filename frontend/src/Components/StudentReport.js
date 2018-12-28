import React, { Component } from 'react';
import axios from 'axios';
import {
  Button,
  Grid,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';

import styles from '../App.module.css';

const API_URL = 'http://localhost:51054/api';

class StudentReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: [],
      selectedStudentId: '',
      students: []
    };
    this.fetchStudents();
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  fetchStudents = () => {
    axios.get(`${API_URL}/Students`).then(res => {
      this.setState({ selectedStudentId: res.data[0].Id, students: res.data });
    });
  };

  fetchGrades = () => {
    axios
      .get(`${API_URL}/Grades/${this.state.selectedStudentId}`)
      .then(res => this.setState({ grades: res.data }));
  };

  getAverage = () => {
    if (this.state.grades.length > 0) {
      const sum = this.state.grades
        .map(grade => grade.Value)
        .reduce((total, grade) => total + grade);
      let average = sum / this.state.grades.length;
      average = average.toFixed(2);
      if (average < 3) {
        return <TableCell classes={{ root: styles.red }}>{average}</TableCell>;
      } else if (average > 4.5) {
        return (
          <TableCell classes={{ root: styles.green }}>{average}</TableCell>
        );
      } else {
        return <TableCell classes={{ root: styles.red }}>{average}</TableCell>;
      }
    } else {
      return null;
    }
  };

  render() {
    return (
      <div className={styles.StudentReport}>
        <h1>Informe estudiantes</h1>
        <Grid container spacing={40}>
          <Grid item md={3}>
            <form>
              <TextField
                fullWidth
                label="Seleccione el estudiante"
                onChange={this.handleInputChange('selectedStudentId')}
                required
                select
                value={this.state.selectedStudentId}
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
              <Button
                classes={{ root: styles['submit-button'] }}
                color="secondary"
                onClick={this.fetchGrades}
                variant="contained"
              >
                Generar informe
              </Button>
            </form>
          </Grid>
          <Grid item md={8}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Materia</TableCell>
                  <TableCell />
                  <TableCell>Nota</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.grades.map(grade => {
                  return (
                    <TableRow key={grade.Id}>
                      <TableCell>{grade.SubjectName}</TableCell>
                      <TableCell />
                      <TableCell>{grade.Value}</TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell />
                  <TableCell>Promedio</TableCell>
                  {this.getAverage()}
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default StudentReport;

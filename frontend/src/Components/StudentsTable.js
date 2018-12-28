import React, { Component } from 'react';
import axios from 'axios';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import styles from '../App.module.css';

const API_URL = 'http://localhost:51054/api';

class StudentsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: []
    };
    this.fetchStudents();
  }

  fetchStudents = () => {
    axios
      .get(`${API_URL}/Students`)
      .then(res => {
        this.setState({ students: res.data });
      })
      .catch(() => {
        this.props.connectionFailed();
      });
  };

  deleteStudent = Id => {
    axios.delete(`${API_URL}/Students/${Id}`).then(res => {
      let students = this.state.students;
      students = students.filter(student => student.Id !== Id);
      this.setState({ students: students });
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.lastStudent !== prevProps.lastStudent) {
      this.setState({
        students: [...this.state.students, this.props.lastStudent]
      });
    }
    if (this.props.studentToUpdate !== prevProps.studentToUpdate) {
      let students = [...this.state.students];
      students.forEach(student => {
        if (student.Id === this.props.studentToUpdate.Id) {
          student.Name =
            this.props.studentToUpdate.Names +
            ' ' +
            this.props.studentToUpdate.Surnames;
        }
      });
      this.setState({ students: students });
    }
  }

  render() {
    return (
      <div className={styles.StudentsTable}>
        <Table padding="checkbox">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.students.map(student => {
              return (
                <TableRow key={student.Id}>
                  <TableCell>{student.Id}</TableCell>
                  <TableCell>{student.Name}</TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      onClick={this.props.toggleForm.bind(
                        null,
                        'update',
                        student.Id
                      )}
                    >
                      Actualizar
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Delete
                      className={styles['delete-button']}
                      onClick={this.deleteStudent.bind(null, student.Id)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default StudentsTable;

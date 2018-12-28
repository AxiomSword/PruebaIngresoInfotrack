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

class SubjectsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: []
    };
    this.fetchSubjects();
  }

  fetchSubjects() {
    axios
      .get(`${API_URL}/Subjects`)
      .then(res => {
        this.setState({ subjects: res.data });
      })
      .catch(() => {
        this.props.connectionFailed();
      });
  }

  deleteSubject = Id => {
    axios.delete(`${API_URL}/Subjects/${Id}`).then(res => {
      let subjects = this.state.subjects;
      subjects = subjects.filter(subject => subject.Id !== Id);
      this.setState({ subjects: subjects });
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.lastSubject !== prevProps.lastSubject) {
      this.setState({
        subjects: [...this.state.subjects, this.props.lastSubject]
      });
    }
    if (this.props.subjectToUpdate !== prevProps.subjectToUpdate) {
      let subjects = [...this.state.subjects];
      subjects.forEach(subject => {
        if (subject.Id === this.props.subjectToUpdate.Id) {
          subject.Id = this.props.subjectToUpdate.Id;
          subject.Name = this.props.subjectToUpdate.Name;
          subject.Department = this.props.subjectToUpdate.Department;
        }
      });
      this.setState({ subjects: subjects });
    }
  }

  render() {
    return (
      <div className={styles.SubjectsTable}>
        <Table padding="checkbox">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Facultad</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.subjects.map(subject => {
              return (
                <TableRow key={subject.Id}>
                  <TableCell>{subject.Id}</TableCell>
                  <TableCell>{subject.Name}</TableCell>
                  <TableCell>{subject.Department}</TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      onClick={this.props.toggleForm.bind(
                        null,
                        'update',
                        subject
                      )}
                    >
                      Actualizar
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Delete
                      className={styles['delete-button']}
                      onClick={this.deleteSubject.bind(null, subject.Id)}
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

export default SubjectsTable;

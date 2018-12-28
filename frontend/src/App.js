import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
  AppBar,
  createMuiTheme,
  Button,
  MuiThemeProvider,
  Toolbar
} from '@material-ui/core';

import Students from './Components/Students';
import Subjects from './Components/Subjects';
import Grades from './Components/Grades';
import StudentReport from './Components/StudentReport';

import styles from './App.module.css';

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  },
  typography: {
    useNextVariants: true
  }
});

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <MuiThemeProvider theme={theme}>
          <Router>
            <div>
              <AppBar position="fixed">
                <Toolbar>
                  <nav>
                    <ul>
                      <li>
                        <Link to="/Alumnos">
                          <Button size="large">Alumnos</Button>
                        </Link>
                      </li>
                      <li>
                        <Link to="/Materias">
                          <Button size="large">Materias</Button>
                        </Link>
                      </li>
                      <li>
                        <Link to="/Notas">
                          <Button size="large">Registrar notas</Button>
                        </Link>
                      </li>
                      <li>
                        <Link to="/InformeAlumno">
                          <Button size="large">Informe alumnos</Button>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </Toolbar>
              </AppBar>
              <Route path="/" exact component={Students} />
              <Route path="/Alumnos" component={Students} />
              <Route path="/Materias" component={Subjects} />
              <Route path="/Notas" component={Grades} />
              <Route path="/InformeAlumno" component={StudentReport} />
            </div>
          </Router>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;

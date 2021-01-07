import React from 'react';
import ScheduleViewer from './components/schedules_viewer/table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';

function App() {

  /*<header className="App-header">
  </header>*/

  return (
    <Container>
        <Navbar>
          <Navbar.Brand href="#home"> RedBeat Scheduler</Navbar.Brand>
        </Navbar>
        <Row>
          <ScheduleViewer/>
        </Row>
      </Container>
  );
}

export default App;

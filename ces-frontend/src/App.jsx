import React from 'react';
import TopNav from './components/TopNav';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { Container, Row, Col, } from 'react-bootstrap';

const App = () => {
  return (
    <div>
      
      <Container fluid>
        <Row>
          <Col md={10} lg={2} className="d-md-block bg-light sidebar" style={{padding: '0px'}}>
            <Sidebar />
          </Col>
          <Col>
            <TopNav/>
          </Col>
          <Col md={9} lg={10} className="ms-sm-auto px-md-4">
            <MainContent />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;

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
          <Col md={1} lg={2} style={{padding: '0px'}}>
            <Sidebar />
          </Col>
          <Col md={9} lg={10} className="maincon ms-sm-auto px-md-0">
            <TopNav/><br /><br />
            <MainContent />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;

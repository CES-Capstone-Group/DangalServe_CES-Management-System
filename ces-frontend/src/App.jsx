import React from 'react';
import TopNav from './components/TopNav';
import BrgySidebar from './components/BrgySidebar';
import MainContent from './components/MainContent';
import AdminSidebar from './components/AdminSidebar';
import { Container, Row, Col, } from 'react-bootstrap';
import CoorSidebar from './components/CoorSidebar';

const App = () => {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={1} lg={2} style={{padding: '0px', boxShadow: '20px'}}>
            <AdminSidebar />
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

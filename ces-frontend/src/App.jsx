import React from 'react';
import TopNav from './components/TopNav';
import BrgySidebar from './components/BrgySidebar';
import MainContent from './components/MainContent';
import { Container, Row, Col, } from 'react-bootstrap';
import CoorSidebar from './components/CoorSidebar';
import UserManagementCon from './components/UserManagementCon';
import BrgyProposalPage from './components/BrgyProposalPage';

const App = () => {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={1} lg={2} style={{padding: '0px', boxShadow: '20px'}}>
            <BrgySidebar />
          </Col>
          <Col md={9} lg={10} className="maincon ms-sm-auto px-md-0">
            <TopNav/><br /><br />
            <UserManagementCon />
            <BrgyProposalPage/>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;

import React from 'react';
import TopNav from './components/TopNav';
import BrgySidebar from './components/BrgySidebar';
import MainContent from './components/MainContent';
import { Container, Row, Col, } from 'react-bootstrap';
import CoorSidebar from './components/CoorSidebar';
import UserManagementCon from './components/UserManagementCon';
import AdminSidebar from './components/AdminSidebar';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import BrgyPenProposalPage from './components/BrgyPenProposalPage';
import ApprovedProposalPage from './components/ApprovedProposalPage';
import CoorPenProposal from './components/CoorPenProposal';

const App = () => {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={1} lg={2} style={{padding: '0px'}}>
            <CoorSidebar/>
          </Col>
          <Col md={9} lg={10} className="p-0 m-0">
            <TopNav/><br /><br />
            <CoorPenProposal />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;

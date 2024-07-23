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
import BrgyCalendar from './components/BrgyCalendar';
import ProposalForm from './components/ProposalForm';

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
            <BrgyCalendar />
          </Col>
        </Row>
      </Container>
     
      {/* <Container fluid> <ProposalForm/>  </Container> */}
      
    </div>
  );
};

export default App;

import React from 'react';
import TopNav from './components/TopNav';
import BrgySidebar from './components/BrgySidebar';
import MainContent from './components/MainContent';
import { Container, Row, Col, } from 'react-bootstrap';
import CoorSidebar from './components/CoorSidebar';
import UserManagementCon from './components/UserManagementCon';
import AdminSidebar from './components/AdminSidebar';
import AdminMainContent from './components/AdminMainContent';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import BrgyPenProposalPage from './components/BrgyPenProposalPage';
import ApprovedProposalPage from './components/ApprovedProposalPage';
import CoorPenProposal from './components/CoorPenProposal';
import BrgyCalendar from './components/BrgyCalendar';
import ProposalForm from './components/ProposalForm';
import DocumentPage from './components/DocumentPage';
import AdminPenAchievements from './components/AdminPenAchievements';
import KpiPage from './components/KpiPage';
import InvolvementPage from './components/InvolvementPage';

const App = () => {
  return (

    <div>
      <header><TopNav /></header>
      <br /> <br /><br /> <br />
      
      <Row>
        <Col md={1} lg={2}>
          <AdminSidebar />
        </Col>
        <Col md={3} lg={10}>
          <AdminMainContent />
        </Col>
      </Row>
    </div>
  );
};

export default App;

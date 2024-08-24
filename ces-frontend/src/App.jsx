import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import TopNav from './components/TopNav';
import BrgySidebar from './components/BrgySidebar';
import MainContent from './components/MainContent';
import { Container, Row, Col, } from 'react-bootstrap';
import CoorSidebar from './components/CoorSidebar';
import UserManagementCon from './components/UserManagementCon';
import AdminSidebar from './components/AdminSidebar';
import AdminMainContent from './components/AdminMainContent';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import AdminPenProposal from './components/AdminPenProposal';
import AdminApprovedPro from './components/AdminApprovedPro'; 
import AdminPenAchievements from './components/AdminPenAchievements';
import AdminApprovedAch from './components/AdminApprovedAch';
import AdminCalendar from './components/AdminCalendar';
import KpiPage from './components/KpiPage';
import InvolvementPage from './components/InvolvementPage';
import BrgyPenProposalPage from './components/BrgyPenProposalPage';
import BrgyApprovedPro from './components/BrgyApprovedPro';
import CoorPenProposal from './components/CoorPenProposal';
import CoorCalendar from './components/CoorCalendar';
import CoorApprovedPro from './components/CoorApprovedPro';
import BrgyCalendar from './components/BrgyCalendar';
import ProposalForm from './components/ProposalForm';
import DocumentPage from './components/DocumentPage';
import UserAdminPage from './components/UserAdminPage';
import UserBarangayPage from './components/UserBarangayPage';
import UserCoorPage from './components/UserCoorPage';
import CoorPenAchievements from './components/CoorPenAchievements';
import CoorApprovedAch from './components/CoorApprovedAch';




const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/admin' element={<UserAdminPage/>}/>
          <Route path='/barangay' element={<UserBarangayPage/>}/>
          <Route path='/coor' element={<UserCoorPage/>}/>
          <Route path='/dashboard' element={<MainContent/>}/>
          <Route path='/proposal-form' element={<ProposalForm/>}/>
          <Route path='/admin-dashboard' element={<AdminMainContent/>}/>
          <Route path='/admin-accmngmnt' element={<UserManagementCon/>}/>
          <Route path='/admin-pending-proposal' element={<AdminPenProposal/>}/>
          <Route path='/admin-approved-proposal' element={<AdminApprovedPro/>}/>
          <Route path='/admin-pending-achievements' element={<AdminPenAchievements/>}/>
          <Route path='/admin-approved-achievements' element={<AdminApprovedAch/>}/>
          <Route path='/admin-docs' element={<DocumentPage/>}/>
          <Route path='/admin-calendar' element={<AdminCalendar/>}/>
          <Route path='/admin-involvement' element={<InvolvementPage/>}/>
          <Route path='/admin-kpi' element={<KpiPage/>}/>
          <Route path='/barangay-pending-proposal' element={<BrgyPenProposalPage/>}/>
          <Route path='/barangay-approved-proposal' element={<BrgyApprovedPro/>}/>
          <Route path='/barangay-calendar' element={<BrgyCalendar/>}/>
          <Route path='/coor-pending-proposal' element={<CoorPenProposal/>}/>
          <Route path='/coor-approved-proposal' element={<CoorApprovedPro/>}/>
          <Route path='/coor-pending-achievements' element={<CoorPenAchievements/>}/>
          <Route path='/coor-approved-achievements' element={<CoorApprovedAch/>}/>
          <Route path='/coor-docs' element={<DocumentPage/>}/>
          <Route path='/coor-calendar' element={<CoorCalendar/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

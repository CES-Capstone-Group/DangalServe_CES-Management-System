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
import AdminEventRequest from './components/AdminEventRequest';
import AdminApprovedAch from './components/AdminApprovedAch';
import AdminCalendar from './components/AdminCalendar';
import KpiPage from './components/KpiPage';
import InvolvementPage from './components/InvolvementPage';
import BrgyPenProposalPage from './components/BrgyPenProposalPage';
import BrgyApprovedPro from './components/BrgyApprovedPro';
import BrgyEventRequest from './components/BrgyEventRequest';
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
        <Routes>
          <Route index element={<LoginPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          
          <Route path='/admin' element={<UserAdminPage/>}>
            <Route path='proposal-form' element={<ProposalForm/>}/>
            <Route path='dashboard' element={<AdminMainContent/>}/>
            <Route path='accmngmnt' element={<UserManagementCon/>}/>
            <Route path='pending-proposal' element={<AdminPenProposal/>}/>
            <Route path='approved-proposal' element={<AdminApprovedPro/>}/>
            <Route path='pending-achievements' element={<AdminPenAchievements/>}/>
            <Route path='approved-achievements' element={<AdminApprovedAch/>}/>
            <Route path='resched' element={<AdminEventRequest/>}/>
            <Route path='docs' element={<DocumentPage/>}/>
            <Route path='calendar' element={<AdminCalendar/>}/>
            <Route path='involvement' element={<InvolvementPage/>}/>
            <Route path='kpi' element={<KpiPage/>}/>
          </Route>

          <Route path='/barangay' element={<UserBarangayPage/>}>
            <Route path='dashboard' element={<MainContent/>}/>
            <Route path='pending-proposal' element={<BrgyPenProposalPage/>}/>
            <Route path='approved-proposal' element={<BrgyApprovedPro/>}/>
            <Route path='resched' element={<BrgyEventRequest/>}/>
            <Route path='calendar' element={<BrgyCalendar/>}/>
          </Route>

          <Route path='/coor' element={<UserCoorPage/>}>
            <Route path='dashboard' element={<MainContent/>}/>
            <Route path='pending-proposal' element={<CoorPenProposal/>}/>
            <Route path='approved-proposal' element={<CoorApprovedPro/>}/>
            <Route path='pending-achievements' element={<CoorPenAchievements/>}/>
            <Route path='approved-achievements' element={<CoorApprovedAch/>}/>
            <Route path='docs' element={<DocumentPage/>}/>
            <Route path='calendar' element={<CoorCalendar/>}/>
            <Route path='kpi' element={<KpiPage/>}/>
          </Route>

        </Routes>
    </div>
  );
};

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import TopNav from './components/TopNav';
import BrgySidebar from './components/BrgySidebar';
import MainContent from './components/MainContent';
import { Container, Row, Col } from 'react-bootstrap';
import CoorSidebar from './components/CoorSidebar';
import UserManagementCon from './components/UserManagementCon.jsx';
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
import UserAdminPage from './components/MainPages/UserAdminPage';
import UserBarangayPage from './components/MainPages/UserBarangayPage';
import UserCoorPage from './components/MainPages/UserCoorPage';
import CoorPenAchievements from './components/CoorPenAchievements';
import CoorApprovedAch from './components/CoorApprovedAch';
import CoorEventRequest from './components/CoorEventRequest';
import UserEvalPage from './components/MainPages/UserEvalPage';
import EvalPage from './components/EvalPage';
import ActEvalForm from './components/ActEvalForm';
import FundingProposalForm from './components/FundingProposalForm.jsx';
import CesEvalForm from './components/CesEvalForm.jsx';
import AARForm from './components/AARForm.jsx';
import PrivateRoute from './components/PrivateRoute';
import UnauthorizedPage from './components/MainPages/UnauthorizedPage.jsx'

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route index element={<LoginPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/unauthorized' element={<UnauthorizedPage />} />
        {/* Admin Routes - Only accessible to Admin */}
        <Route element={<PrivateRoute allowedRoles={['Admin']} />}>
          <Route path='/admin' element={<UserAdminPage />}>
            <Route path='proposal-form' element={<ProposalForm />} />
            <Route index element={<AdminMainContent />} />
            <Route path='dashboard' element={<AdminMainContent />} />
            <Route path='accmngmnt' element={<UserManagementCon />} />
            <Route path='pending-proposal' element={<AdminPenProposal />} />
            <Route path='approved-proposal' element={<AdminApprovedPro />} />
            <Route path='pending-achievements' element={<AdminPenAchievements />} />
            <Route path='approved-achievements' element={<AdminApprovedAch />} />
            <Route path='resched' element={<AdminEventRequest />} />
            <Route path='docs' element={<DocumentPage />} />
            <Route path='calendar' element={<AdminCalendar />} />
            <Route path='involvement' element={<InvolvementPage />} />
            <Route path='kpi' element={<KpiPage />} />
          </Route>
        </Route>

        {/* Barangay Routes - Only accessible to Barangay Officials */}
        <Route element={<PrivateRoute allowedRoles={['Brgy. Official']} />}>
          <Route path='/barangay' element={<UserBarangayPage />}>
            <Route index element={<MainContent />} />
            <Route path='dashboard' element={<MainContent />} />
            <Route path='pending-proposal' element={<BrgyPenProposalPage />} />
            <Route path='approved-proposal' element={<BrgyApprovedPro />} />
            <Route path='resched' element={<BrgyEventRequest />} />
            <Route path='calendar' element={<BrgyCalendar />} />
          </Route>
        </Route>

        {/* Coordinator Routes - Only accessible to Proponents */}
        <Route element={<PrivateRoute allowedRoles={['Proponent']} />}>
          <Route path='/coor' element={<UserCoorPage />}>
            <Route index element={<MainContent />} />
            <Route path='dashboard' element={<MainContent />} />
            <Route path='pending-proposal' element={<CoorPenProposal />} />
            <Route path='approved-proposal' element={<CoorApprovedPro />} />
            <Route path='pending-achievements' element={<CoorPenAchievements />} />
            <Route path='approved-achievements' element={<CoorApprovedAch />} />
            <Route path='resched' element={<CoorEventRequest />} />
            <Route path='docs' element={<DocumentPage />} />
            <Route path='calendar' element={<CoorCalendar />} />
            <Route path='kpi' element={<KpiPage />} />
            <Route path='proposal-form' element={<ProposalForm />} />
          </Route>
        </Route>

        {/* Evaluator Routes - Only accessible to Evaluators */}
        <Route element={<PrivateRoute allowedRoles={['Evaluator']} />}>
          <Route path='/eval' element={<UserEvalPage />}>
            <Route index element={<MainContent />} />
            <Route path='dashboard' element={<MainContent />} />
            <Route path='eval-page' element={<EvalPage />} />
          </Route>
        </Route>

        {/* Other Routes */}
        <Route path='/propForm' element={<ProposalForm />} />
        <Route path='/actEvalForm' element={<ActEvalForm />} />
        <Route path='/funding' element={<FundingProposalForm />} />
        <Route path='/cesEvalForm' element={<CesEvalForm />} />
        <Route path='aarForm' element={<AARForm />} />
      </Routes>
    </div>
  );
};

export default App;

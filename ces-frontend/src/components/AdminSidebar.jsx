import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableColumns, faChartLine, faUserPen, faTrophy, faFileLines, faFile, faChevronDown, faInbox, faCalendar } from '@fortawesome/free-solid-svg-icons'
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import Logo from '../assets/pnclogo.png'
import '../App.css'
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {

  return (
    <div className='sideBar'>
      <SidebarMenu expand="lg" className="d-md-block bg-light flex-column" style={{ width: '300px', boxShadow: '0px 3px 30px' }}>
        {/*SidebarMenu Header*/}
        <SidebarMenu.Toggle>
          <SidebarMenu.Brand>
            <img className='logo img-fluid' src={Logo} alt="pnclogo" />
          </SidebarMenu.Brand>
        </SidebarMenu.Toggle>

        <SidebarMenu.Header>
          <SidebarMenu.Brand>
            <h5>Community Extension Service Management System</h5>
          </SidebarMenu.Brand>
        </SidebarMenu.Header>

        <SidebarMenu.Body>
          <SidebarMenu.Nav >
            <NavLink to={'/admin/dashboard'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
              <SidebarMenu.Nav.Icon>
                <FontAwesomeIcon icon={faTableColumns} style={{ color: 'black' }} />
              </SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title> Dashboard </SidebarMenu.Nav.Title>
            </NavLink>
          </SidebarMenu.Nav>

          <SidebarMenu.Nav>
            <NavLink to={'/admin/accmngmnt'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
              <SidebarMenu.Nav.Icon>
                <FontAwesomeIcon icon={faUserPen} style={{ color: 'black' }} />
              </SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title> Account Management </SidebarMenu.Nav.Title>
            </NavLink>
          </SidebarMenu.Nav>

          {/* PROPOSALS */}
          <SidebarMenu.Nav>
            <SidebarMenu.Sub>
              <SidebarMenu.Sub.Toggle>
                <SidebarMenu.Nav.Icon>
                  <FontAwesomeIcon icon={faFileLines}></FontAwesomeIcon>
                </SidebarMenu.Nav.Icon>
                <SidebarMenu.Nav.Title> Proposals </SidebarMenu.Nav.Title>
                <SidebarMenu.Nav.Icon>
                  <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
                </SidebarMenu.Nav.Icon>
              </SidebarMenu.Sub.Toggle>

              <SidebarMenu.Sub.Collapse>
                <SidebarMenu.Nav>
                  <NavLink to={'/admin/pending-proposal'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                    <SidebarMenu.Nav.Title> Pending Proposals </SidebarMenu.Nav.Title>
                  </NavLink>
                </SidebarMenu.Nav>

                <SidebarMenu.Nav>
                  <NavLink to={'/admin/approved-proposal'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                    <SidebarMenu.Nav.Title> Approved Proposals </SidebarMenu.Nav.Title>
                  </NavLink>
                </SidebarMenu.Nav>
              </SidebarMenu.Sub.Collapse>
            </SidebarMenu.Sub>
          </SidebarMenu.Nav>

          {/* ACHIEVEMENTS */}
          <SidebarMenu.Nav>
            <SidebarMenu.Sub>
              <SidebarMenu.Sub.Toggle>
                <SidebarMenu.Nav.Icon>
                  <FontAwesomeIcon icon={faTrophy} />
                </SidebarMenu.Nav.Icon>
                <SidebarMenu.Nav.Title> Achievements </SidebarMenu.Nav.Title>
                <SidebarMenu.Nav.Icon>
                  <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
                </SidebarMenu.Nav.Icon>
              </SidebarMenu.Sub.Toggle>

              <SidebarMenu.Sub.Collapse>
                <SidebarMenu.Nav>
                  <NavLink to={'/admin/pending-achievements'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                    <SidebarMenu.Nav.Title> Pending Achievements </SidebarMenu.Nav.Title>
                  </NavLink>
                </SidebarMenu.Nav>

                <SidebarMenu.Nav>
                  <NavLink to={'/admin/approved-achievements'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                    <SidebarMenu.Nav.Title> Approved Achievements </SidebarMenu.Nav.Title>
                  </NavLink>
                </SidebarMenu.Nav>
              </SidebarMenu.Sub.Collapse>
            </SidebarMenu.Sub>
          </SidebarMenu.Nav>

          {/* REQUESTS */}
          <SidebarMenu.Nav>
            <SidebarMenu.Sub>
              <SidebarMenu.Sub.Toggle>
                <SidebarMenu.Nav.Icon>
                  <FontAwesomeIcon icon={faInbox}></FontAwesomeIcon>
                </SidebarMenu.Nav.Icon>
                <SidebarMenu.Nav.Title> Requests </SidebarMenu.Nav.Title>
                <SidebarMenu.Nav.Icon>
                  <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
                </SidebarMenu.Nav.Icon>
              </SidebarMenu.Sub.Toggle>

              <SidebarMenu.Sub.Collapse>

                <SidebarMenu.Nav>
                  <SidebarMenu.Nav.Link>
                    <SidebarMenu.Nav.Title> Event Reschedule </SidebarMenu.Nav.Title>
                  </SidebarMenu.Nav.Link>
                </SidebarMenu.Nav>

              </SidebarMenu.Sub.Collapse>
            </SidebarMenu.Sub>
          </SidebarMenu.Nav>

          {/* DOCUMENTS */}
          <SidebarMenu.Nav>
            <NavLink to={'/admin/docs'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
              <SidebarMenu.Nav.Icon>
                <FontAwesomeIcon icon={faFile} style={{ color: 'black' }} />
              </SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title> Documents </SidebarMenu.Nav.Title>
            </NavLink>
          </SidebarMenu.Nav>

          {/* CALENDAR */}
          <SidebarMenu.Nav>
            <NavLink to={'/admin/calendar'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
              <SidebarMenu.Nav.Icon>
                <FontAwesomeIcon icon={faCalendar} style={{ color: 'black' }}></FontAwesomeIcon>
              </SidebarMenu.Nav.Icon>
              <SidebarMenu.Nav.Title> Calendar </SidebarMenu.Nav.Title>
            </NavLink>
          </SidebarMenu.Nav>

          {/* Reports */}
          <SidebarMenu.Nav>
            <SidebarMenu.Sub>
              <SidebarMenu.Sub.Toggle>
                <SidebarMenu.Nav.Icon>
                  <FontAwesomeIcon icon={faChartLine} />
                </SidebarMenu.Nav.Icon>
                <SidebarMenu.Nav.Title> Reports </SidebarMenu.Nav.Title>
                <SidebarMenu.Nav.Icon>
                  <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
                </SidebarMenu.Nav.Icon>
              </SidebarMenu.Sub.Toggle>

              <SidebarMenu.Sub.Collapse>
                <SidebarMenu.Nav>
                  <NavLink to={'/admin/involvement'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                    <SidebarMenu.Nav.Title> Involvement </SidebarMenu.Nav.Title>
                  </NavLink>
                </SidebarMenu.Nav>

                <SidebarMenu.Nav>
                  <NavLink to={'/admin/kpi'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}> 
                    <SidebarMenu.Nav.Title> KPI </SidebarMenu.Nav.Title>
                  </NavLink>
                </SidebarMenu.Nav>

                <SidebarMenu.Nav>
                  <SidebarMenu.Nav.Link>
                    <SidebarMenu.Nav.Title> Impact </SidebarMenu.Nav.Title>
                  </SidebarMenu.Nav.Link>
                </SidebarMenu.Nav>
              </SidebarMenu.Sub.Collapse>
            </SidebarMenu.Sub>
          </SidebarMenu.Nav>
        </SidebarMenu.Body>
      </SidebarMenu>
    </div>
  );
}

export default AdminSidebar;

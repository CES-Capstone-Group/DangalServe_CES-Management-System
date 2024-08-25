import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTableColumns, faTrophy, faFileLines,faChevronDown, faCodePullRequest, faInbox, faCalendar, faChartLine, faFile} from '@fortawesome/free-solid-svg-icons'
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import Logo from '../assets/pnclogo.png'
import '../App.css'
import { NavLink } from 'react-router-dom';

const CoorSidebar = () => {
  return(
    <SidebarMenu expand="lg" className="d-md-block bg-light flex-column" style={{width:'300px', boxShadow: '0px 3px 30px'}}>
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

        {/* DASHBOARD */}
      <SidebarMenu.Body>
        <SidebarMenu.Nav>
          <NavLink to={'/coor/dashboard'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
            <SidebarMenu.Nav.Icon>
              <FontAwesomeIcon icon={faTableColumns} style={{color: 'black'}} />
            </SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title> Dashboard </SidebarMenu.Nav.Title>
          </NavLink>
        </SidebarMenu.Nav>

        {/* KPI */}
        <SidebarMenu.Nav>
          <NavLink to={'/coor/kpi'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
            <SidebarMenu.Nav.Icon>
            <FontAwesomeIcon icon={faChartLine} style={{color: 'black'}} />
            </SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title> KPI </SidebarMenu.Nav.Title>
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
                <NavLink to={'/coor/pending-proposal'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                  <SidebarMenu.Nav.Title> Pending Proposals </SidebarMenu.Nav.Title>
                </NavLink>
              </SidebarMenu.Nav>

              <SidebarMenu.Nav>
                <NavLink to={'/coor/approved-proposal'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
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
                <NavLink to={'/coor/pending-achievements'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                  <SidebarMenu.Nav.Title> Pending Achievements </SidebarMenu.Nav.Title>
                </NavLink>
              </SidebarMenu.Nav>

              <SidebarMenu.Nav>
                <NavLink to={'/coor/approved-achievements'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
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
          <NavLink to={'/coor/docs'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
            <SidebarMenu.Nav.Icon>
            <FontAwesomeIcon icon={faFile} style={{color: 'black'}}/>
            </SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title> Documents </SidebarMenu.Nav.Title>
          </NavLink>
        </SidebarMenu.Nav>

        {/* CALENDAR */}
        <SidebarMenu.Nav>
          <NavLink to={'/coor/calendar'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
            <SidebarMenu.Nav.Icon>
              <FontAwesomeIcon icon={faCalendar} style={{color: 'black'}}></FontAwesomeIcon>
            </SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title> Calendar </SidebarMenu.Nav.Title>
          </NavLink>
        </SidebarMenu.Nav>
      </SidebarMenu.Body>
    </SidebarMenu>
  );
}

export default CoorSidebar;

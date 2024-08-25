import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTableColumns, faFileLines,faChevronDown, faInbox, faCalendar} from '@fortawesome/free-solid-svg-icons'
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import Logo from '../assets/pnclogo.png'
import '../App.css'
import { NavLink } from 'react-router-dom';

const BrgySidebar = () => {
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

      <SidebarMenu.Body>
        <SidebarMenu.Nav>
          <NavLink to={'/barangay/dashboard'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
            <SidebarMenu.Nav.Icon>
              <FontAwesomeIcon icon={faTableColumns} style={{color: 'black'}} />
            </SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title> Dashboard </SidebarMenu.Nav.Title>
          </NavLink>
        </SidebarMenu.Nav>

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
                <NavLink to={'/barangay/pending-proposal'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                  <SidebarMenu.Nav.Title> Pending Proposals </SidebarMenu.Nav.Title>
                </NavLink>
              </SidebarMenu.Nav>

              <SidebarMenu.Nav>
                <NavLink to={'/barangay/approved-proposal'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                  <SidebarMenu.Nav.Title> Approved Proposals </SidebarMenu.Nav.Title>
                </NavLink>
              </SidebarMenu.Nav>
            </SidebarMenu.Sub.Collapse>
          </SidebarMenu.Sub>
        </SidebarMenu.Nav>

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

        <SidebarMenu.Nav>
          <NavLink to={'/barangay/calendar'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
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

export default BrgySidebar;

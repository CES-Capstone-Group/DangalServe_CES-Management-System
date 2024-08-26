import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableColumns, faClipboardList, faFileLines, faChevronDown, faInbox, faCalendar } from '@fortawesome/free-solid-svg-icons'
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import Logo from '../assets/pnclogo.png'
import '../App.css'
import { NavLink } from 'react-router-dom';

const EvalSidebar = () => {
    return (
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
                <SidebarMenu.Nav>
                    <NavLink to={'/eval/dashboard'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                        <SidebarMenu.Nav.Icon>
                            <FontAwesomeIcon icon={faTableColumns} style={{ color: 'black' }} />
                        </SidebarMenu.Nav.Icon>
                        <SidebarMenu.Nav.Title> Dashboard </SidebarMenu.Nav.Title>
                    </NavLink>
                </SidebarMenu.Nav>

                <SidebarMenu.Nav>
                    <NavLink to={'/eval/eval-page'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                        <SidebarMenu.Nav.Icon>
                        <FontAwesomeIcon icon={faClipboardList} style={{ color: 'black' }} />
                        </SidebarMenu.Nav.Icon>
                        <SidebarMenu.Nav.Title> Activity Evaluation </SidebarMenu.Nav.Title>
                    </NavLink>
                </SidebarMenu.Nav>
            </SidebarMenu.Body>
        </SidebarMenu>
    );
}

export default EvalSidebar;

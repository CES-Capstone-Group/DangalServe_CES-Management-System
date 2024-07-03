import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTableColumns, faFileLines,faChevronDown, faCodePullRequest, faInbox, faCalendar} from '@fortawesome/free-solid-svg-icons'
import SidebarMenu, { SidebarMenuNav } from 'react-bootstrap-sidebar-menu';
import Logo from '../assets/pnclogo.png'
import '../App.css'
import { faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons';

// const Sidebar = () => {
  //   return (
//       <Navbar bg="light" expand="lg" className="flex-column">
//           <Navbar.Brand className="text-center py-3">
//               <img
//                   src="src\assets\pnclogo.png" // Add your logo URL
//                   alt="University of Cabuyao Logo"
//                   className="mb-2"
//                   style={{ width: '275px' }}
//               />
//               <div className="bg-green text-wrap text-center text-white px-2 py-1">
//                   Community Extension Service Management System
//               </div>
//               <br />
//               <div className="bg-green text-wrap text-center text-white px-2 py-1">
//                   Dashboard
//               </div>
//           </Navbar.Brand>
//           <Nav className="flex-column w-100">
//               <br />
//               <NavDropdown title="Proposals" id="proposals-dropdown" className='nav'>
//                   <NavDropdown.Item href="#">Pending Proposals</NavDropdown.Item>
//                   <NavDropdown.Item href="#">Approved Proposals</NavDropdown.Item>
//               </NavDropdown>
//               <NavDropdown title="Requests" id="requests-dropdown" className='nav'>
//                   <NavDropdown.Item href="#">Event Reschedule</NavDropdown.Item>
//               </NavDropdown>
//               <Nav.Item>
//                   <Nav.Link href="#">Calendar</Nav.Link>
//               </Nav.Item>
//           </Nav>
//       </Navbar>
//   );
// };

const Sidebar = () => {
  return(
    <SidebarMenu className='flex-column'>
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
          <SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Icon>
              <FontAwesomeIcon icon={faTableColumns} style={{color: 'black'}} />
            </SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title> Dashboard </SidebarMenu.Nav.Title>
          </SidebarMenu.Nav.Link>
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
                <SidebarMenu.Nav.Link>
                  <SidebarMenu.Nav.Title> Pending Proposals </SidebarMenu.Nav.Title>
                </SidebarMenu.Nav.Link>
              </SidebarMenu.Nav>

              <SidebarMenu.Nav>
                <SidebarMenu.Nav.Link>
                  <SidebarMenu.Nav.Title> Approved Proposals </SidebarMenu.Nav.Title>
                </SidebarMenu.Nav.Link>
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
          <SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Icon>
              <FontAwesomeIcon icon={faCalendar} style={{color: 'black'}}></FontAwesomeIcon>
            </SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title> Calendar </SidebarMenu.Nav.Title>
          </SidebarMenu.Nav.Link>
        </SidebarMenu.Nav>
      </SidebarMenu.Body>
    </SidebarMenu>
  );
}

export default Sidebar;

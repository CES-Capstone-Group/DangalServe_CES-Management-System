import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHouse} from '@fortawesome/free-solid-svg-icons'
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import Logo from '../assets/pnclogo.png'
import '../App.css'

// const Sidebar = () => {
//   return (
//     <Nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
//       <div className="position-sticky">
//         <Nav.Item>
//           <Nav.Link href="#">Dashboard</Nav.Link>
//         </Nav.Item>
//         <NavDropdown title="Proposals" id="proposals-dropdown">
//           <NavDropdown.Item href="#">Pending Proposals</NavDropdown.Item>
//           <NavDropdown.Item href="#">Approved Proposals</NavDropdown.Item>
//         </NavDropdown>
//         <NavDropdown title="Requests" id="requests-dropdown">
//           <NavDropdown.Item href="#">Event Reschedule</NavDropdown.Item>
//         </NavDropdown>
//         <Nav.Item>
//           <Nav.Link href="#">Calendar</Nav.Link>
//         </Nav.Item>
//       </div>
//     </Nav>
//   );
// };

const Sidebar = () => {
  return(
    <SidebarMenu>
      <SidebarMenu.Header>
        <SidebarMenu.Brand>
          <img className='logo' src={Logo} alt="" />
        </SidebarMenu.Brand>
        <SidebarMenu.Toggle/>
      </SidebarMenu.Header>
      <SidebarMenu.Body>
        <SidebarMenu.Nav>
          <SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Icon>
              <FontAwesomeIcon icon={faHouse}/>
            </SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title>
              Dashboard
            </SidebarMenu.Nav.Title>
          </SidebarMenu.Nav.Link>
        </SidebarMenu.Nav>
        <SidebarMenu.Sub>
          <SidebarMenu.Sub.Toggle>
            <SidebarMenu.Nav.Icon />
            <SidebarMenu.Nav.Title>
              Main Title
            </SidebarMenu.Nav.Title>
          </SidebarMenu.Sub.Toggle>
          <SidebarMenu.Sub.Collapse>
            <SidebarMenu.Nav>
              <SidebarMenu.Nav.Link>
                <SidebarMenu.Nav.Icon>
                  {/* Submenu item icon */}
                </SidebarMenu.Nav.Icon>
                <SidebarMenu.Nav.Title>
                  Sub Item
                </SidebarMenu.Nav.Title>
              </SidebarMenu.Nav.Link>
            </SidebarMenu.Nav>
            <SidebarMenu.Nav>
              <SidebarMenu.Nav.Link>
                <SidebarMenu.Nav.Icon>
                  {/* Submenu item icon */}
                </SidebarMenu.Nav.Icon>
                <SidebarMenu.Nav.Title>
                  Sub Item
                </SidebarMenu.Nav.Title>
              </SidebarMenu.Nav.Link>
            </SidebarMenu.Nav>
        </SidebarMenu.Sub.Collapse>
        </SidebarMenu.Sub>
      </SidebarMenu.Body>
    </SidebarMenu>
  );
}

export default Sidebar;

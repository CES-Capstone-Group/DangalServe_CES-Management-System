import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';

const Sidebar = () => {
  return (
    <Nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
      <div className="position-sticky">
        <Nav.Item>
          <Nav.Link href="#">Dashboard</Nav.Link>
        </Nav.Item>
        <NavDropdown title="Proposals" id="proposals-dropdown">
          <NavDropdown.Item href="#">Pending Proposals</NavDropdown.Item>
          <NavDropdown.Item href="#">Approved Proposals</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Requests" id="requests-dropdown">
          <NavDropdown.Item href="#">Event Reschedule</NavDropdown.Item>
        </NavDropdown>
        <Nav.Item>
          <Nav.Link href="#">Calendar</Nav.Link>
        </Nav.Item>
      </div>
    </Nav>
  );
};

export default Sidebar;

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const TopNav = () => {
  return (
    <Navbar  expand="lg" style={{backgroundColor: '#4CAF50'}}>
      <Container>
        <Navbar.Brand href="#">Barangay Name</Navbar.Brand>
        <Nav className="ms-auto">
          <Navbar.Text className="me-3">BRGY. SAN ISIDRO</Navbar.Text>
          <Nav.Link href="#">
            <i className="bi bi-person-circle"></i>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default TopNav;

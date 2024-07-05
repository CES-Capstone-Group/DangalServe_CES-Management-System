import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleUser} from '@fortawesome/free-solid-svg-icons'

const TopNav = () => {
  return (
    <Navbar  expand="lg" style={{backgroundColor: '#71A872'}}>
      <Container>
        <Navbar.Brand href="#" style={{color: 'white'}}>USER</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link href="#">
            <FontAwesomeIcon style={{fontSize: '35px', color: 'white'}} icon={faCircleUser} />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default TopNav;

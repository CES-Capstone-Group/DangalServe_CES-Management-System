/* eslint-disable react/prop-types */
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircleUser } from '@fortawesome/free-solid-svg-icons'

const TopNav = ({sidebarOpen ,sidebarToggle}) => {

  return (
    <div className='topNav'>
      <Navbar expand="lg" style={{ 
        backgroundColor: '#71A872', 
        paddingLeft: sidebarOpen ? '300px' : '0px', 
        transition: 'padding-left 0.3s ease' 
        }}>

        <Container fluid className='d-flex '>
          <Navbar.Brand style={{ color: 'white' }}>
            <Button variant="" className="ms-2" onClick={sidebarToggle}>
              <FontAwesomeIcon icon={faBars} />
            </Button> 
            <Navbar.Text className='ps-4 h3' style={{color: 'white'}}  >
            USER
            </Navbar.Text>
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link>
              <FontAwesomeIcon style={{ fontSize: '35px', color: 'white' }} icon={faCircleUser} />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>

  );
};

export default TopNav;

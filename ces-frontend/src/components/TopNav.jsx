import React from 'react';
import Logo from '../assets/pnclogo.png'
import { Navbar, Nav, Container, NavbarText, NavLink, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircleUser } from '@fortawesome/free-solid-svg-icons'

const TopNav = ({sidebarToggle}) => {

  return (
    <div className='topNav'>
      <Navbar expand="lg" style={{ backgroundColor: '#71A872' }}>
        <Container fluid>
          <Navbar.Brand style={{ color: 'white' }}>
          <img className='logo img-fluid' src={Logo} alt="pnclogo" style={{backgroundColor: 'white', borderRadius: '20px'}} /> 
            <Navbar.Text className='ps-4 h3' style={{color: 'white'}}  >
            USER
            </Navbar.Text>
            <Button variant="outline-light" className="ms-2" onClick={sidebarToggle}>
              <FontAwesomeIcon icon={faBars} />
            </Button> 
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

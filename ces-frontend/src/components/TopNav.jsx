import React, { useState } from 'react';
import Logo from '../assets/pnclogo.png';
import { Navbar, Nav, Container, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircleUser, faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const TopNav = ({ sidebarOpen, sidebarToggle }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State to show/hide modal
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Function to handle showing the logout modal
  const handleShowLogoutModal = () => setShowLogoutModal(true);

  // Function to handle closing the logout modal
  const handleCloseLogoutModal = () => setShowLogoutModal(false);

  // Logout function
  const handleLogout = () => {
    // Clear authentication tokens and other session-related data
    localStorage.removeItem('access_token'); // Remove access token
    localStorage.removeItem('refresh_token'); // Remove refresh token
    localStorage.removeItem('authToken'); // Example: removing any other tokens from local storage

    // Close the modal
    setShowLogoutModal(false);

    // Navigate to the login page
    navigate('/login');
  };

  return (
    <div className='topNav'>
      <Navbar expand="lg" style={{ 
        backgroundColor: '#71A872', 
        paddingLeft: sidebarOpen ? '300px' : '0px', 
        transition: 'padding-left 0.3s ease' 
        }}>
        <Container fluid className='d-flex '>
          <Navbar.Brand style={{ color: 'white' }}>
            <Button variant="outline-light" className="ms-2" onClick={sidebarToggle}>
              <FontAwesomeIcon icon={faBars} />
            </Button> 
            <Navbar.Text className='ps-4 h3' style={{ color: 'white' }}>
              USER
            </Navbar.Text>
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link onClick={handleShowLogoutModal} style={{ display: 'flex', alignItems: 'center' }}>
              <FontAwesomeIcon style={{ fontSize: '35px', color: 'white' }} icon={faCircleUser} />
              <span className="ps-2" style={{ color: 'white', fontSize: '18px', cursor: 'pointer' }}>Logout</span>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={handleCloseLogoutModal} centered>
        <Modal.Header className="border-0" closeButton>
          <Modal.Title>
            <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Confirm Logout
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center" style={{ fontSize: '16px' }}>Are you sure you want to log out?</p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="outline-secondary" onClick={handleCloseLogoutModal}>
            <FontAwesomeIcon icon={faTimes} className="me-2" /> Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TopNav;

import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import '../App.css'
import { Navbar, Nav, Container, Button, Modal, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faBars, faCircleUser, faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const AdminTopNav = ({ sidebarOpen, sidebarToggle }) => {
  const [isHovered, setIsHovered] = useState(false);

  const [showLogoutModal, setShowLogoutModal] = useState(false); // State to show/hide modal
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleNavigation = (path) => {
    navigate(path);
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggle = (isOpen) => {
    setShowDropdown(isOpen);
  };

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
    localStorage.removeItem('accountType'); // Example: removing any other tokens from local storage

    // Close the modal
    setShowLogoutModal(false);

    // Navigate to the login page
    navigate('/login');
  };

  const accountType = localStorage.getItem('accountType');
  return (
    <div className='topNav'>
      <Navbar expand="lg" style={{
        backgroundColor: '#71A872',
        paddingLeft: sidebarOpen ? '250px' : '0px',
        transition: 'padding-left 0.3s ease'
      }}>
        <Container fluid className='d-flex '>
          <Navbar.Brand style={{ color: 'white' }}>
            <Button
              variant='outline-light'
              className={`ms-1 ${isHovered ? 'border-1' : 'border-0'}`}
              onClick={sidebarToggle}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{ backgroundColor: "transparent", transition: 'none' }}
            >
              <FontAwesomeIcon icon={faBars} color='white' />
            </Button>
            <Navbar.Text className='ps-4 h3' style={{ color: 'white' }}>
              {accountType}
            </Navbar.Text>
          </Navbar.Brand>

          <Dropdown align='end' onToggle={handleToggle} show={showDropdown}>
            <Dropdown.Toggle style={{ borderWidth: '0px', backgroundColor: '#dddddd00' }}>
              <FontAwesomeIcon style={{ fontSize: '35px', color: 'white' }} icon={faCircleUser} />
            </Dropdown.Toggle>
            <CSSTransition in={showDropdown} timeout={300} classNames="dropdown" unmountOnExit>
              <Dropdown.Menu className='dropDown'>
                <Dropdown.Item onClick={() => handleNavigation('/admin/profile')} >My Profile</Dropdown.Item>
                <Dropdown.Item onClick={handleShowLogoutModal}>
                  Logout
                  <FontAwesomeIcon style={{ paddingLeft: '5px', color: '#71A872' }} icon={faSignOutAlt} />
                </Dropdown.Item>
              </Dropdown.Menu>
            </CSSTransition>
          </Dropdown>
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

export default AdminTopNav;

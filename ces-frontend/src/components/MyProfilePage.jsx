import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode'; 

const MyProfilePage = () => {
    const [showModal, setShowModal] = useState(false);
    const [showModalPass, setShowModalPass] = useState(false);
    const [accountName, setAccountName] = useState('');
    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const navigate = useNavigate(); 

    // Example: Fetch user data for profile page
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setAccountName(decodedToken.name);
            setDepartment(decodedToken.department);
            setPosition(decodedToken.position);
        }
    }, []);

    // Function to handle profile update submission
    const handleProfileUpdate = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const userId = jwtDecode(token).user_id;  // Assuming `user_id` is in the token payload
            const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}/update-profile/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    username: accountName,  // Use your form state for username
                    department: department,  // Use your form state for department
                    position: position,  // Use your form state for position
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update profile');
            }
            else{
                const result = await response.json();
                setShowModal(false);
                setAccountName(accountName);
                alert('Profile updated successfully');

            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };
    
    

    // Function to hnadle password change
   const handlePasswordChange = async () => {
    // Check if the new password and confirm password match
    if (newPassword !== confirmNewPassword) {
        alert('New password and confirm password do not match!');
        return;
    }

    try {
        const token = localStorage.getItem('access_token');
        const userId = jwtDecode(token).user_id;  // Assuming `user_id` is in the token payload

        const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}/change-password/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                currentPassword: currentPassword,
                newPassword: newPassword,
            }),
        });

        const result = await response.json();

        // Handle cases where the response is not successful
        if (!response.ok) {
            if (result.error === 'Current password is incorrect') {
                alert('Your current password is incorrect. Please try again.');
            } else {
                alert('Failed to change password: ' + result.error);
            }
            return;
        }

        // If successful, show success alert and close modal
        setShowModalPass(false);
        alert('Password changed successfully');
        setCurrentPassword('')
        setNewPassword('')
        setConfirmNewPassword('')

    } catch (error) {
        console.error('Error changing password:', error);
        alert('Failed to change password');
    }
};

    
    

    return (
        <Container fluid className="profile-container">
            {/* Profile Header */}
            <div className="profileContainer" style={{ backgroundColor: '#f7f7f7' }}>
                <div
                    className="profile-header text-center py-5"
                    style={{ backgroundColor: '#0a3d62', color: 'white' }}
                >
                    <h2 className="mt-3">{accountName}</h2>
                    <p>{position}</p>
                    <Button variant="success" className="mt-3" onClick={() => setShowModal(true)}>
                        Update Profile
                    </Button>
                </div>

                {/* Profile Details */}
                <Row className="py-4 m-1 profile-details">
                    <Col>
                        <p><strong>Account ID</strong>: #######</p>
                        <p><strong>Department</strong>: {department}</p>
                        <p><strong>Position</strong>: {position}</p>
                        <p><strong>Password</strong>: {'********'}</p>
                        <Button variant='link' className='text-success text-decoration-none' onClick={() => setShowModalPass(true)}>
                            Change Password
                        </Button>
                    </Col>
                </Row>
            </div>

            {/* Modal for Updating Password */}
            <Modal show={showModalPass} onHide={() => setShowModalPass(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="formCurrentPass">
                                    <Form.Label>Current Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)} 
                                        placeholder="Current Password" 
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formNewPass">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)} 
                                        placeholder="New Password" 
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="formConNewPass">
                                    <Form.Label>Confirm New Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)} 
                                        placeholder="Confirm New Password" 
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowModalPass(false)}>Close</Button>
                    <Button variant="success" onClick={handlePasswordChange}>Save Changes</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for Updating Profile */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="formAccountName">
                                    <Form.Label>Account Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        value={accountName}
                                        onChange={(e) => setAccountName(e.target.value)} 
                                        placeholder="Account Name" 
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formDepartment">
                                    <Form.Label>Department</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)} 
                                        placeholder="Department Name" 
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="formPosition">
                                    <Form.Label>Position</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        value={position}
                                        onChange={(e) => setPosition(e.target.value)} 
                                        placeholder="Position" 
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="success" onClick={handleProfileUpdate}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default MyProfilePage;

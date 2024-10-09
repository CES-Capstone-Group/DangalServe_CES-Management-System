import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import '/src/App.css';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'; // Import the icons you want to use

const MyProfilePage = () => {
    const [showModal, setShowModal] = useState(false);

    const [showModalPass, setShowModalPass] = useState(false);

    // Function to show the modal
    const handleShowModal = () => setShowModal(true);

    // Function to hide the modal
    const handleCloseModal = () => setShowModal(false);

    // Function to show the modal
    const handleShowModalPass = () => setShowModalPass(true);

    // Function to hide the modal
    const handleCloseModalPass = () => setShowModalPass(false);

    const navigate = useNavigate(); // Hook to programmatically navigate

    return (
        <Container fluid className="profile-container">
            {/* Profile Header */}
            <div className="profileContainer" style={{ backgroundColor: '#f7f7f7' }}>
                <div
                    className="profile-header text-center py-5"
                    style={{ backgroundColor: '#0a3d62', color: 'white' }}
                >
                    <h2 className="mt-3">NAME</h2>
                    <p>USER TYPE</p>
                    <Button variant="success" className="mt-3" onClick={handleShowModal}>
                        Update Profile
                    </Button>
                </div>


                {/* Profile Details */}
                <Row className="py-4 m-1 profile-details">
                    <Col>
                        <p>
                            <strong>Account ID</strong>: Account Number
                        </p>
                        <p>
                            <strong>Department</strong>: Department Name
                        </p>
                        <p>
                            <strong>Position</strong>: Position
                        </p>
                        <p>
                            <strong>Password</strong>: {'********'}
                        </p>
                        <p>
                            <Button variant='link' className='text-success text-decoration-none' onClick={handleShowModalPass}>Change Password</Button>
                        </p>
                    </Col>
                </Row>
            </div>

            {/* Modal for Updating Password */}
            <Modal show={showModalPass} onHide={handleCloseModalPass} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="formCurrentPass">
                                    <Form.Label>Current Password</Form.Label>
                                    <Form.Control type="password" placeholder="Current Password" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formNewPass">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control type="password" placeholder="New Password" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="formConNewPass">
                                    <Form.Label>Confirm New Password</Form.Label>
                                    <Form.Control type="password" placeholder="Confirm New Password" />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModalPass}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleCloseModalPass}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for Updating Profile */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="formAccountName">
                                    <Form.Label>Account Name</Form.Label>
                                    <Form.Control type="text" placeholder="Account Name" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formDepartment">
                                    <Form.Label>Department</Form.Label>
                                    <Form.Control type="text" placeholder="Department Name" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="formPosition">
                                    <Form.Label>Position</Form.Label>
                                    <Form.Control type="text" placeholder="Position" />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleCloseModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default MyProfilePage;

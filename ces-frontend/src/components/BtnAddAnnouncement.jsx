import React, { useState } from "react";
import { Button, Container, Modal, Row, Col, Form} from "react-bootstrap";

const BtnAddAnnouncement = () => {
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return(
        <div className="d-flex justify-content-end m-3">
            <div>
                <Button style={{backgroundColor:"#71A872", border: '0px'}} onClick={handleShowModal}>    
                    Add User
                </Button>
            </div>

            <Modal backdrop='static' centered size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Button onClick={handleCloseModal} className="me-5 mb-5 p-0 ps-2 pe-2" variant="success">Back</Button>
                    <Modal.Title> Add New Account </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Account ID:</Form.Label>
                            <Col sm={8}>
                                <Form.Control placeholder="#######" disabled/>
                            </Col>
                        </Form.Group>

                        <Form.Group  as={Row} className="mb-3">
                            <Form.Label column sm={4} >Type of Account</Form.Label>
                            <Col sm={8}>
                                <Form.Select>
                                    <option value="1">Admin</option>
                                    <option value="2">Coordinator</option>
                                    <option value="3">Brgy. Official</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Department</Form.Label>
                            <Col column sm={8}>
                                <Form.Select>
                                    <option value="1">Bachelor of Science in Computer Science</option>
                                    <option value="2">Bachelor of Science in Information Technology</option>
                                    <option value="3">Bachelor of Science in Accounting</option>
                                    <option value="4">Bachelor of Science in Nursing</option>
                                    <option value="5"> Bachelor of Science in Industrial Engineering</option>
                                </Form.Select> 
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Activation Date</Form.Label>
                            <Col column sm={8}>
                               <Form.Control type="date"/> 
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Deactivation Date</Form.Label>
                            <Col column sm={8}>
                               <Form.Control type="date"/> 
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Department</Form.Label>
                            <Col column sm={8}>
                                <Form.Select>
                                    <option value="1">Active</option>
                                    <option value="2">Inactive</option>   
                                </Form.Select> 
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center">
                    <Button variant='success'>
                        Save Changes
                    </Button>
                    <Button variant="danger">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
       </div>
    );
};

export default BtnAddAnnouncement;
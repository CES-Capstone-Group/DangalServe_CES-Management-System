import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";

const BtnAddSection = ({ onSectionAdded }) => {  
    const [showModal, setShowModal] = useState(false);
    const [section, setSection] = useState([]);  // Store departments

    // **Open the modal**
    const handleShowModal = () => setShowModal(true);

    // **Close the modal and reset form fields**
    const handleCloseModal = () => {
        setShowModal(false);
    };

    
    return (
        <div style={{width:"100%"}}>
            <Button 
                className="shadow w-100 " 
                style={{ backgroundColor: "#71A872", border: '0px', color: 'white' }} 
                onClick={handleShowModal}>
                <FontAwesomeIcon icon={faPlus}/>
                <span className="h5"> Add Section </span>
            </Button>

            <Modal backdrop='static' centered size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Button onClick={handleCloseModal} className="me-5 mb-5 p-0 ps-2 pe-2" variant="success">Back</Button>
                    <Modal.Title> Add New Section </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* Combo box for department */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Section:</Form.Label>
                            <Col>
                                <Form.Control 
                                    type="text"
                                    placeholder="Enter section" 
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center">
                    <Button variant='success'>  
                        Add Section
                    </Button>
                    <Button onClick={handleCloseModal} variant="danger">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BtnAddSection;

import React, { useEffect, useState } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";

const BtnAddQuestion = ({ onQuestionAdded }) => {  
    const [showModal, setShowModal] = useState(false);
    const [questionName, setQuestionName] = useState("");  // State for Course name
    const [question, setDepartments] = useState([]);  // Store departments

    // **Open the modal**
    const handleShowModal = () => setShowModal(true);

    // **Close the modal and reset form fields**
    const handleCloseModal = () => {
        setShowModal(false);
    };

    
    return (
        <div className="d-flex justify-content-end m-3">
            <Button 
                className="shadow" 
                style={{ backgroundColor: "#71A872", border: '0px', color: 'white' }} 
                onClick={handleShowModal}>
                Add Question 
            </Button>

            <Modal backdrop='static' centered size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Button onClick={handleCloseModal} className="me-5 mb-5 p-0 ps-2 pe-2" variant="success">Back</Button>
                    <Modal.Title> Add New Question </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* Combo box for department */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Question:</Form.Label>
                            <Col>
                                <Form.Control 
                                    type="text"
                                    placeholder="Enter Question" 
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center">
                    <Button variant='success'>  
                        Add Question
                    </Button>
                    <Button onClick={handleCloseModal} variant="danger">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BtnAddQuestion;

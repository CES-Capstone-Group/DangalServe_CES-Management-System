import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import bcrypt from 'bcryptjs';  // Import bcryptjs


const BtnAddBrgy= ({onBrgyAdded }) => {
    const [brgyName, setBrgyName] = useState("");  // <-- Barangay name state
    const [moaFile, setMoaFile] = useState(null);  // <-- File upload state

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);

    const handleCloseModal = () => {
        setShowModal(false);
        setBrgyName("");  // <-- Reset Name
        setMoaFile(null);  // <-- Reset File
        
    }

    // **Function to Handle Form Submission**
    const handleSubmit = async () => {  
        const formData = new FormData();  
        formData.append("brgy_name", brgyName);  // Append the barangay name
        if (moaFile) {
            formData.append("moa", moaFile);  // Append the file if selected
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/barangays/create/", {  // <-- Use your backend URL
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Barangay added successfully!");
                handleCloseModal();  // Close the modal on success
                onBrgyAdded();  // Call the onBrgyAdded callback
            } else {
                const data = await response.json();
                alert(`Failed to add barangay: ${data}`);
                alert(`Failed to add barangay: ${JSON.stringify(data)}`);  // Convert the error object to a readable format

            }
        } catch (error) {
            console.error("Error adding barangay:", error);
        }
    };


    return (
            <div className="d-flex justify-content-end m-3">
            <Button className="shadow" style={{ backgroundColor: "#71A872", border: '0px', color: 'white' }} onClick={handleShowModal}>
                Add Barangay
            </Button>

            <Modal backdrop='static' centered size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Button onClick={handleCloseModal} className="me-5 mb-5 p-0 ps-2 pe-2" variant="success">Back</Button>
                    <Modal.Title> Add New Barangay </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Account ID:</Form.Label>
                            <Col sm={8}>
                                <Form.Control placeholder="#######" disabled />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Name:</Form.Label>
                            <Col sm={8}>
                                {/* **Added onChange to update state** */}
                                <Form.Control 
                                    type="text"
                                    name="brgyName"
                                    placeholder="Enter Barangay Name"
                                    value={brgyName}  // <-- Link to state
                                    onChange={(e) => setBrgyName(e.target.value)}  // <-- Handle change
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Memorandum of Agreement:</Form.Label>
                            <Col sm={8}>
                                {/* **Added onChange to update file state** */}
                                <Form.Control 
                                    className="inputFile" 
                                    type="file" 
                                    accept="image/*, application/pdf"
                                    onChange={(e) => setMoaFile(e.target.files[0])}  // <-- Handle file selection
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center">
                    <Button onClick={handleSubmit} variant='success'>  {/* <-- Call handleSubmit */}
                        Save Changes
                    </Button>
                    <Button onClick={handleCloseModal} variant="danger">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BtnAddBrgy;

import React, { useState } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";

const BtnAddDocument = ({ onDocumentAdded }) => {  // <-- Added `onDepartmentAdded` prop
    const [showModal, setShowModal] = useState(false);
    const [documentName, setDocumentName] = useState("");  // <-- State for document name
    const [documentFile, setDocumentFile] = useState("");  // <-- Set Document File 

    // Open the modal
    const handleShowModal = () => setShowModal(true);

    // Close the modal and reset form fields
    const handleCloseModal = () => {
        setShowModal(false);
        setDocumentName("");  // Reset department name
    };

    // **Function to handle form submission and backend integration**
    const handleSubmit = async () => {
        const formData = { doc_name: documentName };  // Prepare data to send to backend

        try {
            const response = await fetch("http://127.0.0.1:8000/api/departments/create/", {  // Backend URL
                method: "POST",
                headers: {
                    "Content-Type": "application/json",  // Specify the content type
                },
                body: JSON.stringify(formData),  // Convert formData to JSON
            });

            if (response.ok) {
                alert("Document added successfully!");
                handleCloseModal();  // Close the modal on success
                onDocumentAdded();  // Trigger parent to re-fetch data
            } else {
                const data = await response.json();
                alert(`Failed to add document: ${JSON.stringify(data)}`);
            }
        } catch (error) {
            console.error("Error adding document:", error);
        }
    };

    return (
        <div className="d-flex justify-content-end m-3">
            <Button className="shadow" style={{ backgroundColor: "#71A872", border: '0px', color: 'white' }} onClick={handleShowModal}>
                Add Document
            </Button>

            <Modal backdrop='static' centered size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Button onClick={handleCloseModal} className="me-5 mb-5 p-0 ps-2 pe-2" variant="success">Back</Button>
                    <Modal.Title> Add New Document </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Document Title:</Form.Label>
                            <Col sm={8}>
                                <Form.Control 
                                    type="text"
                                    name="docName"
                                    placeholder="Enter Department Name"
                                    value={documentName}  // Link the state
                                    onChange={(e) => setDocumentName(e.target.value)}  // Update state on change
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                 className="inputFile" 
                                 type="file" 
                                 accept="image/*, application/pdf"
                                 onChange={(e) => setDocumentFile(e.target.files[0])}  // <-- Handle file selection
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center">
                    <Button onClick={handleSubmit} variant='success'>  {/* <-- Call handleSubmit on click */}
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

export default BtnAddDocument;

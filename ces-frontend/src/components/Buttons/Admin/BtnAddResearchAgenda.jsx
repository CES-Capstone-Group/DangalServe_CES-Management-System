import React, { useState } from "react";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";

const BtnAddResearchAgenda = ({ onResearchAgendaAdded }) => {
    const [showModal, setShowModal] = useState(false);
    const [label, setLabel] = useState(""); // Label for the research agenda
    const [image, setImage] = useState(null); // Image for the research agenda

    const handleShowModal = () => setShowModal(true);

    const handleCloseModal = () => {
        // Reset all form fields to their default values
        setLabel("");
        setImage(null);

        // Close the modal
        setShowModal(false);
    };

    const addResearchAgenda = async (e) => {
        e.preventDefault();

        const researchAgendaData = new FormData();
        researchAgendaData.append("label", label); // Add the label field
        
        if (image) {
            researchAgendaData.append("image", image); // Add the image if available
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/research-agendas/create/", {
                method: "POST",
                body: researchAgendaData,
            });

            if (response.ok) {
                // Trigger the callback to reload research agendas
                onResearchAgendaAdded();

                // Close the modal
                handleCloseModal();

                alert("Research Agenda added successfully!");
            } else {
                alert("There was an error adding the research agenda.");
            }
        } catch (error) {
            alert("There was an error adding the research agenda.");
        }
    };

    return (
        <div className="justify-content-end m-3">
            <div>
                <Button className="shadow" style={{ backgroundColor: "#71A872", border: '0px', fontSize: '1rem' }} onClick={handleShowModal}>
                    + Add Research Agenda
                </Button>
            </div>

            <Modal backdrop='static' centered size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Button onClick={handleCloseModal} className="me-5 mb-5 p-0 ps-2 pe-2" variant="success">Back</Button>
                    <Modal.Title> Add New Research Agenda </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={addResearchAgenda}>
                        <Form.Group className='mb-3' controlId='ResearchLabel'>
                            <Form.Label className='h5'>Research Agenda Label</Form.Label>
                            <InputGroup>
                                <Form.Control 
                                    className='input' 
                                    type='text' 
                                    placeholder='Enter research agenda label' 
                                    value={label}
                                    onChange={(e) => setLabel(e.target.value)}
                                    required
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='ResearchImage'>
                            <Form.Label className='h5'>Upload Research Image</Form.Label>
                            <InputGroup>
                                <Form.Control 
                                    className="inputFile" 
                                    type="file" 
                                    onChange={(e) => setImage(e.target.files[0])} 
                                    accept="image/*"
                                />
                            </InputGroup>
                            <p className="text-sm">Max Size: 25MB</p>
                        </Form.Group>

                        <Modal.Footer className="d-flex justify-content-center">
                            <Button size="lg" variant='success' type="submit">
                                Add
                            </Button>
                            <Button size="lg" variant="danger" onClick={handleCloseModal}>
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default BtnAddResearchAgenda;

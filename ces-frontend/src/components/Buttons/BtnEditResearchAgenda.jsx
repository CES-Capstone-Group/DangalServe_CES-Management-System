import React, { useState, useEffect } from "react";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";

const BtnEditResearchAgenda = ({ show, onHide, researchAgenda, onResearchAgendaUpdated }) => {
    const [label, setLabel] = useState("");
    const [image, setImage] = useState(null);

    // Prefill fields when modal opens
    useEffect(() => {
        if (researchAgenda) {
            setLabel(researchAgenda.label || "");  // Set the initial label value
        }
    }, [researchAgenda]);

    // Handle form submission to update research agenda
    const updateResearchAgenda = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("label", label);  // Append updated label

        if (image) {
            formData.append("image", image);  // Append updated image if selected
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/research-agendas/${researchAgenda.id}/`, {
                method: "PUT",  // Use PUT method for update
                body: formData,
            });

            if (response.ok) {
                onResearchAgendaUpdated();  // Refresh research agendas
                onHide();  // Close modal
                alert("Research agenda updated successfully!");
            } else {
                alert("There was an error updating the research agenda.");
            }
        } catch (error) {
            alert("There was an error updating the research agenda.");
        }
    };

    return (
        <Modal backdrop='static' centered size="lg" show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Research Agenda</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={updateResearchAgenda}>
                    <Form.Group className='mb-3' controlId='ResearchLabel'>
                        <Form.Label className='h5'>Research Agenda Label</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type='text'
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                required
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='ResearchImage'>
                        <Form.Label className='h5'>Upload New Image (Optional)</Form.Label>
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
                            Save Changes
                        </Button>
                        <Button size="lg" variant="danger" onClick={onHide}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default BtnEditResearchAgenda;

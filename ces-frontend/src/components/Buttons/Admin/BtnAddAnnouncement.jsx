import React, { useState } from "react";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";

const BtnAddAnnouncement = ({ onAnnouncementAdded }) => {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [image, setImage] = useState(null);

    const handleShowModal = () => setShowModal(true);

    const handleCloseModal = () => {
        // Reset all form fields to their default values
        setTitle("");
        setDetails("");
        setImage(null);

        // Close the modal
        setShowModal(false);
    };

    const addAnnouncement = async (e) => {
        e.preventDefault();

        const announcementData = new FormData();
        announcementData.append("title", title);
        announcementData.append("details", details);
        
        if (image) {
            announcementData.append("image", image);
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/announcements/create/", {
                method: "POST",
                body: announcementData,
            });

            if (response.ok) {
                // Trigger the callback to reload announcements
                onAnnouncementAdded();

                // Close the modal
                handleCloseModal();

                alert("Announcement added successfully!");
            } else {
                alert("There was an error adding the announcement.");
            }
        } catch (error) {
            alert("There was an error adding the announcement.");
        }
    };

    return (
        <div className="d-flex justify-content-end m-3">
            <div>
                <Button className="shadow" style={{ backgroundColor: "#71A872", border: '0px', color: 'white' , fontSize: '1rem' }} onClick={handleShowModal}>
                    + Add Announcement
                </Button>
            </div>

            <Modal backdrop='static' centered size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Button onClick={handleCloseModal} className="me-5 mb-5 p-0 ps-2 pe-2" variant="success">Back</Button>
                    <Modal.Title> Add New Announcement </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={addAnnouncement}>
                        <Form.Group className='mb-3' controlId='AnnouncementTitle'>
                            <Form.Label className='h5'>Announcement Title</Form.Label>
                            <InputGroup>
                                <Form.Control 
                                    className='input' 
                                    type='text' 
                                    placeholder='' 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='AnnouncementDetails'>
                            <Form.Label className='h5'>Announcement Details</Form.Label>
                            <InputGroup>
                                <Form.Control 
                                    className='input' 
                                    as='textarea' 
                                    rows={4}
                                    placeholder='' 
                                    value={details}
                                    onChange={(e) => setDetails(e.target.value)}
                                    required
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='AnnImage'>
                            <Form.Label className='h5'>Upload your Image</Form.Label>
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

export default BtnAddAnnouncement;

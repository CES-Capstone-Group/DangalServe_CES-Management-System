import React, { useState, useEffect } from "react";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";

const BtnEditAnnouncement = ({ show, onHide, announcement, onAnnouncementUpdated }) => {
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [image, setImage] = useState(null);
    
    // Pre-fill data when modal opens
    useEffect(() => {
        if (announcement) {
            setTitle(announcement.title);
            setDetails(announcement.details);
        }
    }, [announcement]);

    const updateAnnouncement = async (e) => {
        e.preventDefault();

        const announcementData = new FormData();
        announcementData.append("title", title);
        announcementData.append("details", details);
        
        if (image) {
            announcementData.append("image", image);
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/announcements/${announcement.id}/`, {
                method: "PUT", // for updating
                body: announcementData,
            });

            if (response.ok) {
                onAnnouncementUpdated();  // Trigger the callback to reload announcements
                onHide();                 // Close the modal
                alert("Announcement updated successfully!");
            } else {
                alert("There was an error updating the announcement.");
            }
        } catch (error) {
            alert("There was an error updating the announcement.");
        }
    };

    return (
        <Modal backdrop='static' centered size="lg" show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Announcement</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={updateAnnouncement}>
                    <Form.Group className='mb-3' controlId='AnnouncementTitle'>
                        <Form.Label className='h5'>Announcement Title</Form.Label>
                        <InputGroup>
                            <Form.Control 
                                type='text' 
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
                                as='textarea'
                                rows={4}
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                                required
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='AnnouncementImage'>
                        <Form.Label className='h5'>Upload your Image (Optional)</Form.Label>
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

export default BtnEditAnnouncement;

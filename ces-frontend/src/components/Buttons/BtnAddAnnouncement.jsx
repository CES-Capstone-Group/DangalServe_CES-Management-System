import React, { useState } from "react";
import { Button, Container, Modal, Row, Col, Form, InputGroup } from "react-bootstrap";


const BtnAddAnnouncement = () => {
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <div className="d-flex justify-content-end m-3">
            <div>
                <Button style={{ backgroundColor: "#71A872", border: '0px' }} onClick={handleShowModal}>
                    + Add Announcement
                </Button>
            </div>

            <Modal backdrop='static' centered size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Button onClick={handleCloseModal} className="me-5 mb-5 p-0 ps-2 pe-2" variant="success">Back</Button>
                    <Modal.Title> Add New Announcement </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className='mb-3' controlId='AnnouncementTitle'>
                            <Form.Label className='h5'>Announcement Title</Form.Label>
                            <InputGroup>
                                <Form.Control className='input' type='text' placeholder='' />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='Details'>
                            <Form.Label className='h5'>Announcement Details</Form.Label>
                            <InputGroup>
                                <Form.Control className='input' type='text' placeholder='' />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='AnnImage'>
                            <Form.Label className='h5'>Upload your Image</Form.Label>
                            <InputGroup>
                                <Form.Control className="inputFile" type="file" />
                            </InputGroup>
                            <p className="text-sm">Max Size: 25MB</p>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center">
                    <Button size="lg" variant='success'>
                        Add
                    </Button>
                    <Button size="lg" variant="danger">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BtnAddAnnouncement;
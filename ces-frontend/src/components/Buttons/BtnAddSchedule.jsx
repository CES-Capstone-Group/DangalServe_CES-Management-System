import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Modal, Row, Col, Form, InputGroup, Container } from "react-bootstrap";

const BtnAddSchedule = () => {
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false)
        setFileInputs([{id:1}])
    };
    const [fileInputs, setFileInputs] = useState([{ id: 1 }]);

    const handleAddMoreFile = () => {
        setFileInputs([...fileInputs, { id: fileInputs.length + 1 }]);
    } 
    const handleRemoveFile = (id) => {
        setFileInputs(fileInputs.filter(input => input.id !== id));
    } 

    const handleFileChange = (e, id) => {
        const files = e.target.files;
        console.log(`Files for input ${id}:`, files);
    };

    return (
        <div className="d-flex justify-content-start m-3">
            <div>
                <Button style={{ backgroundColor: "#71A872", border: '0px', color: 'white' }} onClick={handleShowModal}>
                    Add Schedule
                </Button>
            </div>

            <Modal backdrop='static' centered size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Button onClick={handleCloseModal} className="me-5 mb-5 p-0 ps-2 pe-2" variant="success">Back</Button>
                    <Modal.Title> Activity Details </Modal.Title>
                </Modal.Header>
                <Modal.Body className="">
                    <Form>
                        <Form.Group as={Row} className='mb-3' controlId='ActivityTitle'>
                            <Form.Label column sm={2} className='h5'>Proposal:</Form.Label>
                            <Col>
                                <Form.Select>
                                    <option label="Community Cleanup Drive" type="checkbox" />
                                    <option label="Tree Planting" type="checkbox" />
                                    <option label="Technology Education" type="checkbox" />
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        
                        <Form.Group as={Row} className='mb-3' controlId='txtActivityTitle'>
                            <Form.Label column sm={2} className='h5'>Activity Title: </Form.Label>
                            <Col>
                                <InputGroup>
                                    <Form.Control className='input' type='text' placeholder='' />
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className='mb-3' controlId='DateActivty'>
                            <Form.Label column sm ={2} className='h5'>Target Date: </Form.Label>
                            <Col>
                                <InputGroup>
                                    <Form.Control className='input' type='date' placeholder='' />
                                </InputGroup>
                            </Col>
                            <Form.Label column sm ={2} className='h5'>Target Time: </Form.Label>
                            <Col>
                                <InputGroup>
                                    <Form.Control className='input' type='time' placeholder='' />
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        
                        {fileInputs.map((input, index) => (
                            <Form.Group as={Row} className="mb-3 align-items-center" controlId={`file-${input.id}`} key={input.id}>
                                <Form.Label column sm={2} className="h5">
                                    File {index + 1}
                                </Form.Label>
                                <Col className="d-flex align-items-center">
                                    <InputGroup>
                                        <Form.Control
                                            className="inputFile"
                                            type="file"
                                            name={`file-${input.id}`}
                                            onChange={(e) => handleFileChange(e, input.id)}
                                            style={{ height: '38px' }} // Ensure this matches the button height
                                        />
                                        {fileInputs.length > 1 && (
                                            <Button
                                                onClick={() => handleRemoveFile(input.id)}
                                                variant="danger"
                                                className="d-flex align-items-center"
                                                style={{ height: '38px' }} // Ensure button height matches the input
                                            >
                                                <FontAwesomeIcon icon={faMinus} />
                                            </Button>
                                        )}
                                    </InputGroup>
                                </Col>
                                <p className="text-sm">Max Size: 25MB</p>
                            </Form.Group>
                        ))}


                    {/* Button to add a new file input */}
                    <Container fluid className='d-flex justify-content-center align-items-center'>
                        <Button onClick={handleAddMoreFile} variant="success" className="mt-2 ">
                            <FontAwesomeIcon icon={faPlus}/>
                        </Button>
                    </Container>
                    </Form>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center">
                    <Button size="lg" variant='success' onClick={handleCloseModal}>
                        Request Reschedule
                    </Button>
                    <Button size="lg" variant="danger" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BtnAddSchedule;
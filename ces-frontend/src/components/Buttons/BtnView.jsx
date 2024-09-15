import React, { useState } from "react";
import { Button, Form, Modal, Col, Row} from "react-bootstrap";

const BtnView = () => {
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);   

    const handleEditMode = () => setEditMode(true);
    const handleCancel = () => setEditMode(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
        

    return(
        <>
            
            <Button className='me-3' onClick={handleShow} style={{backgroundColor:"#71A872", border: '0px', color: 'white'}}>View</Button>             
            
            <Modal backdrop='static' centered size="lg" show={show} onHide={handleClose} className="p-6">
                <Modal.Header closeButton>
                    <Button onClick={handleClose} className="me-5 mb-5 p-0 ps-2 pe-2" variant="success">Back</Button>
                    <Modal.Title> [Award ID] </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4} >Proposal Title</Form.Label>
                            <Col sm={8}>
                                <Form.Control readOnly type="text" value={"CCLIP: PC Awareness"}/> 
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Location</Form.Label>
                            <Col column sm={8}>
                                <Form.Control readOnly type="text" value={"San Isidro Elementary School"}/>  
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Target Date</Form.Label>
                            <Col column sm={8}>
                               <Form.Control readOnly type="text" value={"April 21, 2023"}/> 
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Status</Form.Label>
                            <Col column sm={8}>
                                <Form.Control readOnly type="text" value={"Active"}/>  
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}> 
                        Close</Button>
                </Modal.Footer>
            </Modal>
        </> 
    );
};

export default BtnView;
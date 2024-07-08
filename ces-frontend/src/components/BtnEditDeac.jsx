import React, { useState } from "react";
import { Button, Form, Modal, Col, Row} from "react-bootstrap";

const BtnEditDeac = () => {
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);   

    const handleEditMode = () => setEditMode(true);
    const handleCancel = () => setEditMode(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setEditMode(false);
    }

    return(
        <div>
            <td style={{border: '0px'}}>
                <Button className='me-3' style={{backgroundColor:"#71A872", border: '0px'}} onClick={handleShow}>View</Button>             
                <Button style={{backgroundColor:'#71A872', border: '0px'}}>Deactivate</Button>
            </td>
            
            <Modal centered size="lg" show={show} onHide={handleClose} className="p-6">
                <Modal.Header closeButton>
                    <Button onClick={handleClose} className="me-5 mb-5 p-0 ps-2 pe-2" variant="success">Back</Button>
                    <Modal.Title> [Account ID] </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4} >Type of Account</Form.Label>
                            <Col sm={8}>
                                <Form.Select>
                                    <option value="1">Admin</option>
                                    <option value="2">Coordinator</option>
                                    <option value="3">Brgy. Official</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Department</Form.Label>
                            <Col column sm={8}>
                                <Form.Select>
                                    <option value="1">Bachelor of Science in Computer Science</option>
                                    <option value="2">Bachelor of Science in Information Technology</option>
                                    <option value="3">Bachelor of Science in Accounting</option>
                                    <option value="4">Bachelor of Science in Nursing</option>
                                    <option value="5"> Bachelor of Science in Industrial Engineering</option>
                                </Form.Select> 
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Activation Date</Form.Label>
                            <Col column sm={8}>
                               <Form.Control type="date"/> 
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Deactivation Date</Form.Label>
                            <Col column sm={8}>
                               <Form.Control type="date"/> 
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Department</Form.Label>
                            <Col column sm={8}>
                                <Form.Select>
                                    <option value="1">Active</option>
                                    <option value="2">Inactive</option>   
                                </Form.Select> 
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant="success" onClick={editMode ? handleCancel : handleEditMode}>
                         {editMode ? 'Cancel' : 'Edit'} 
                    </Button>
                    <Button variant="success" onClick={handleClose}> 
                        {editMode ? 'Save Changes' : 'Close'} </Button>
                </Modal.Footer>
            </Modal>
        </div>
    ); 
};

export default BtnEditDeac;
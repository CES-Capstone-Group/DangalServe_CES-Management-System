import React, { useState } from "react";
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Modal, ModalTitle, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons'

const BtnEditKpi = () => {
    const [show, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false); 
   
    return(
        <div>
            <Button variant="success" onClick={handleShowModal}>
                <FontAwesomeIcon icon={faEdit}/>
                Edit
            </Button>
            
            <Modal centered backdrop="static" show={show} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Button className="me-5 mb-5 p-0 ps-2 pe-2" variant="success" onClick={handleCloseModal}>Back</Button>
                    <Modal.Title className="ms-5 p-0 ps-5">KEY PERFORMANCE INDICATOR</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FormGroup as={Row}>
                            <FormLabel column className="h4">
                               KEY PERFORMANCE INDICATOR
                            </FormLabel>
                            <Col>
                                <FormControl className="input" type=""/>
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                
            </Modal>
        </div>
        
    );
}

export default BtnEditKpi;
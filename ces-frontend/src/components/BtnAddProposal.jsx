import React, { useState } from "react";
import { Button, Container, Modal, Row, Col, Form, InputGroup } from "react-bootstrap";
import ProposalForm from "./ProposalForm";
import { NavLink } from "react-router-dom";

const BtnAddProposal = () => {
    // const [showModal, setShowModal] = useState(false);
    // const handleShowModal = () => setShowModal(true);
    // const handleCloseModal = () => setShowModal(false);
    const handleAddForm = () => {<NavLink to={'/eval/proposal-form'} className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}></NavLink>}

    return (
        <div className="d-flex justify-content-end m-3">
            <div>
                <Button style={{ backgroundColor: "#71A872", border: '0px' }} onClick={handleAddForm}>
                    + Add Proposal
                </Button>
            </div>

            {/* <Modal backdrop='static' centered size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Button onClick={handleCloseModal} className="me-5 mb-5 p-0 ps-2 pe-2" variant="success">Back</Button>
                    <Modal.Title> Add New Proposal </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className='mb-3' controlId='AwardTitle'>
                            <Form.Label className='h5'>Proposal Title</Form.Label>
                            <InputGroup>
                                <Form.Control className='input' type='text' placeholder='' />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='Awardee'>
                            <Form.Label className='h5'>Location</Form.Label>
                            <InputGroup>
                                <Form.Control className='input' type='text' placeholder='' />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='DateAwarded'>
                            <Form.Label className='h5'>Target Date</Form.Label>
                            <InputGroup>
                                <Form.Control className='input' type='date' placeholder='' />
                            </InputGroup>
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
            </Modal> */}
        </div>
    );
};

export default BtnAddProposal;
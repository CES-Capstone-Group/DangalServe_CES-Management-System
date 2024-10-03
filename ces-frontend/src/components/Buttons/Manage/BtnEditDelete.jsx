import React, { useState } from "react";
import { Button, Row, Col, Form, Modal} from "react-bootstrap";


const BtnEditDelete = () => {
    
    const [showEdit, setShowEdit] = useState(false);
    const handleShowEdit = () => setShowEdit(true);
    const handleCloseEdit = () => setShowEdit(false);

    return (
        < >
            <Button className="shadow" onClick={handleShowEdit} style={{ backgroundColor: "#71a872", border: '0px', color: 'white', margin: '15px', fontSize:'20px'}}>
                Edit
            </Button>
            <Button className="shadow" style={{ backgroundColor: "#ff3232", border: '0px', color: 'white', fontSize:'20px' }}>
                Delete
            </Button>

            <Modal size="lg" centered show={showEdit} onHide={handleCloseEdit} backdrop="static">
                <Modal.Header closeButton={handleCloseEdit}>
                    <h1>Edit Barangay</h1>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                                <Form.Label column>
                                    Barangay Id:
                                </Form.Label>
                            <Col>
                                <Form.Control type="text" name="brgyId" value='1' disabled/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                                <Form.Label column>
                                    Barangay Name:
                                </Form.Label>
                            <Col>
                                <Form.Control type="text" name="brgyName"/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                                <Form.Label column>
                                    Memorandum of Agreement:
                                </Form.Label>
                            <Col>
                                <Form.Control className="inputFile" type="file" accept="image/*, application/pdf" />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button /*onClick={handleSubmit}*/ variant='success'>
                        Save Changes
                    </Button>
                    <Button onClick={handleCloseEdit} variant="danger">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BtnEditDelete;
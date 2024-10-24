import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import axios from "axios";

const BtnAddEval = () => {
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {setShowModal(true)};
    const handleCloseModal = () => {setShowModal(false)};
    const [barangays, setBarangays] = useState([]);
    const [selectedBarangays, setSelectedBarangays] = useState('');
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');  

    useEffect(()=>{
        const fetchBarangay = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/barangays/');
                setBarangays(response.data);
            }catch (error) {
                console.error("There was an error fetching the barangay data!", error);
            }
        };
        
        const fetchDepartments = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/departments/');
                setDepartments(response.data); // Set the department data in state
            } catch (error) {
                console.error("There was an error fetching the department data!", error);
            }
        };

        fetchDepartments();
        fetchBarangay();
    }, []);

    const handleDepartmentChange = (e) => {
        setSelectedDepartment(e.target.value);  // Capture selected department
    };
    
    const handleBarangayChange = (e) => {
        setSelectedBarangays(e.target.value);  // Capture selected department
    };

    return(
        <>
            <Button onClick={handleShowModal} className='me-3' style={{backgroundColor:"#71A872", border: '0px', color: 'white'}}>Add Evaluation</Button> 

            <Modal size="lg" centered show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <h2 className="h2">Add Evaluation Form</h2>
                </Modal.Header>
                <Modal.Body>
                        <Form>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Department:</Form.Label>
                                <Col>
                                    <Form.Select value={selectedDepartment} onChange={handleDepartmentChange}>
                                        {departments.map(department => (
                                            <option key={department.id} value={department.id}>
                                                {department.dept_name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Title of Activity:</Form.Label>
                                <Col>
                                    <Form.Control type="text" placeholder=""/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Barangay:</Form.Label>
                                <Col>
                                    <Form.Select value={selectedBarangays} onChange={handleBarangayChange}>
                                        {barangays.map(barangay => (
                                            <option key={barangay.id} value={barangay.id}>
                                                {barangay.brgy_name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                        </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseModal} style={{backgroundColor:"#71A872", border: '0px', color: 'white'}} variant='success' type="submit">Add Form</Button>
                </Modal.Footer>
            </Modal>            
        </>
    );
    
};

export default BtnAddEval;
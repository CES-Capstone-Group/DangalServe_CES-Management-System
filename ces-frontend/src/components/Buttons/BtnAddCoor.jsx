import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import bcrypt from 'bcryptjs';  // Import bcryptjs

const BtnAddAcc = (/*{ onAccountAdded }*/) => {
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        //setUserChangedDepartment(false);

        // setFormData({
        //     username: '',
        //     password: '',
        //     accountType: 'Admin',
        //     department: '',
        //     position: '',
        //     activationDate: getCurrentDate(),
        //     deactivationDate: '',
        //     status: 'Active',
        // });
    }

    // const getCurrentDate = () => {
    //     const today = new Date();
    //     const yyyy = today.getFullYear();
    //     const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    //     const dd = String(today.getDate()).padStart(2, '0');
    //     return `${yyyy}-${mm}-${dd}`;
    // };

    // const [formData, setFormData] = useState({
    //     username: '',
    //     password: '',
    //     accountType: 'Admin', // Default value
    //     department: '',
    //     position: '',
    //     activationDate: getCurrentDate(),
    //     deactivationDate: '',
    //     status: 'Active', // Default value
    // });

    // const [userChangedDepartment, setUserChangedDepartment] = useState(false);

    // useEffect(() => {
    //     if (!userChangedDepartment) {
    //         if (formData.accountType === 'Brgy. Official') {
    //             setFormData((prevData) => ({
    //                 ...prevData,
    //                 department: 'Baclaran', 
    //             }));
    //         } else if (formData.accountType === 'Proponent') {
    //             setFormData((prevData) => ({
    //                 ...prevData,
    //                 department: 'Bachelor of Science in Computer Science', 
    //             }));
    //         } else {
    //             setFormData((prevData) => ({
    //                 ...prevData,
    //                 department: '', 
    //             }));
    //         }
    //     }
    // }, [formData.accountType, userChangedDepartment]);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData(prevState => ({
    //         ...prevState,
    //         [name]: value || null
    //     }));
    //     if (name === 'department') {
    //         setUserChangedDepartment(true);
    //     }
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const dataToSend = {
    //         ...formData,
            
    //         deactivationDate: formData.deactivationDate || null,
    //     };
    //     try {
    //         const response = await fetch('http://127.0.0.1:8000/api/users/create_user/', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(dataToSend),
    //         });

    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             throw new Error(`HTTP error! Status: ${response.status}, Details: ${JSON.stringify(errorData)}`);
    //         }

    //         const data = await response.json();
    //         console.log('Account created:', data);
    //         handleCloseModal();

    //         if (onAccountAdded) onAccountAdded(); // Notify parent component to refresh the list
    //     } catch (error) {
    //         console.error('Error creating account:', error);
    //     }
    // };

    return (
        <div className="d-flex justify-content-end m-3">
            <Button className="shadow" style={{ backgroundColor: "#71A872", border: '0px', color: 'white' }} onClick={handleShowModal}>
                Add Coordinator
            </Button>

            <Modal backdrop='static' centered size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Button onClick={handleCloseModal} className="me-5 mb-5 p-0 ps-2 pe-2" variant="success">Back</Button>
                    <Modal.Title> Add New Coordinator </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Account ID:</Form.Label>
                            <Col sm={8}>
                                <Form.Control placeholder="#######" disabled/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Name:</Form.Label>
                            <Col sm={8}>
                                <Form.Control 
                                    type="text"
                                    name="brgyName"
                                    placeholder="Enter Barangay Name"
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center">
                    <Button /*onClick={handleSubmit}*/ variant='success'>
                        Save Changes
                    </Button>
                    <Button onClick={handleCloseModal} variant="danger">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BtnAddAcc;

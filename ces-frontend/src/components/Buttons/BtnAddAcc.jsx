import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import bcrypt from 'bcryptjs';  // Import bcryptjs

const BtnAddAcc = ({ onAccountAdded }) => {
    const [showModal, setShowModal] = useState(false);

    const getCurrentDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        accountType: 'Admin', // Default value
        department: '',
        position: '',
        activationDate: getCurrentDate(),
        deactivationDate: '',
        status: 'Active', // Default value
    });

    const [userChangedDepartment, setUserChangedDepartment] = useState(false);

    useEffect(() => {
        if (!userChangedDepartment) {
            if (formData.accountType === 'Brgy. Official') {
                setFormData((prevData) => ({
                    ...prevData,
                    department: 'Baclaran', 
                }));
            } else if (formData.accountType === 'Proponent') {
                setFormData((prevData) => ({
                    ...prevData,
                    department: 'Bachelor of Science in Computer Science', 
                }));
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    department: '', 
                }));
            }
        }
    }, [formData.accountType, userChangedDepartment]);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setUserChangedDepartment(false);

        setFormData({
            username: '',
            password: '',
            accountType: 'Admin',
            department: '',
            position: '',
            activationDate: getCurrentDate(),
            deactivationDate: '',
            status: 'Active',
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value || null
        }));
        if (name === 'department') {
            setUserChangedDepartment(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = {
            ...formData,
            
            deactivationDate: formData.deactivationDate || null,
        };
        try {
            const response = await fetch('http://127.0.0.1:8000/api/users/create_user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! Status: ${response.status}, Details: ${JSON.stringify(errorData)}`);
            }

            const data = await response.json();
            console.log('Account created:', data);
            handleCloseModal();

            if (onAccountAdded) onAccountAdded(); // Notify parent component to refresh the list
        } catch (error) {
            console.error('Error creating account:', error);
        }
    };

    return (
        <div className="d-flex justify-content-end m-3">
            <Button style={{ backgroundColor: "#71A872", border: '0px', color: 'white' }} onClick={handleShowModal}>
                Add User
            </Button>

            <Modal backdrop='static' centered size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Button onClick={handleCloseModal} className="me-5 mb-5 p-0 ps-2 pe-2" variant="success">Back</Button>
                    <Modal.Title> Add New Account </Modal.Title>
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
                            <Form.Label column sm={4}>Name</Form.Label>
                            <Col sm={8}>
                                <Form.Control 
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Enter Name"
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Type of Account</Form.Label>
                            <Col sm={8}>
                                <Form.Select 
                                    onChange={handleChange} 
                                    value={formData.accountType}  
                                    name="accountType"
                                >                                
                                    <option value="Admin">Admin</option>
                                    <option value="Proponent">Proponent</option>
                                    <option value="Brgy. Official">Brgy. Official</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Password</Form.Label>
                            <Col sm={8}>
                                <Form.Control 
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                />
                            </Col>
                        </Form.Group>

                        {(formData.accountType === "Brgy. Official" || formData.accountType === "Proponent") && (
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={4}>Department</Form.Label>
                                <Col sm={8}>
                                    <Form.Select
                                        name="department" 
                                        value={formData.department}
                                        onChange={handleChange}
                                    >
                                        {formData.accountType === "Brgy. Official" ? (
                                            <>
                                                <option value="Baclaran">Baclaran</option>
                                                <option value="Bigaa">Bigaa</option>
                                                <option value="Casile">Casile</option>
                                                <option value="Sala">Sala</option>
                                                <option value="San Isidro">San Isidro</option>
                                            </>
                                        ) : (
                                            <>
                                                <option value="Bachelor of Science in Computer Science">Bachelor of Science in Computer Science</option>
                                                <option value="Bachelor of Science in Information Technology">Bachelor of Science in Information Technology</option>
                                                <option value="Bachelor of Science in Accounting">Bachelor of Science in Accounting</option>
                                                <option value="Bachelor of Science in Nursing">Bachelor of Science in Nursing</option>
                                                <option value="Bachelor of Science in Industrial Engineering">Bachelor of Science in Industrial Engineering</option>
                                            </>
                                        )}
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                        )}

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Position</Form.Label>
                            <Col sm={8}>
                                <Form.Control 
                                    type="text"
                                    name="position"
                                    value={formData.position}
                                    onChange={handleChange}
                                    placeholder="Enter Position"
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Activation Date</Form.Label>
                            <Col sm={8}>
                                <Form.Control 
                                    type="date"
                                    name="activationDate"
                                    value={formData.activationDate}
                                    onChange={handleChange}
                                /> 
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Deactivation Date</Form.Label>
                            <Col sm={8}>
                                <Form.Control 
                                    type="date"
                                    name="deactivationDate"
                                    value={formData.deactivationDate || ''}
                                    onChange={handleChange}
                                /> 
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center">
                    <Button onClick={handleSubmit} variant='success'>
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

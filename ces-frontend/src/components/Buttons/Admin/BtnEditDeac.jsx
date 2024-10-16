import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

const BtnEditDeac = ({ account, onDeactivate, onSave }) => {
    console.log(account);
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState(account); // Initialize formData with account details

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    // Track user department changes
    const [userChangedDepartment, setUserChangedDepartment] = useState(false);

    // Dynamically update department options based on account type
    useEffect(() => {
        if (!userChangedDepartment) {
            if (formData.accountType === "Brgy. Official") {
                setFormData((prevData) => ({
                    ...prevData,
                    department: "Baclaran", // Default for Brgy. Official
                }));
            } else if (formData.accountType === "Proponent") {
                setFormData((prevData) => ({
                    ...prevData,
                    department: "Bachelor of Science in Computer Science", // Default for Proponent
                }));
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    department: "", // Clear for Admin
                }));
            }
        }
    }, [formData.accountType, userChangedDepartment]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (name === "department") {
            setUserChangedDepartment(true);  // If user manually changes department
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/users/user_info_action/${account.user_id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData), // Send formData with updated name and other details
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Account updated:", data);
            onSave(); // Notify parent to refresh data
            handleClose();
        } catch (error) {
            console.error("Failed to update account:", error);
        }
    };

    const handleDeactivate = () => {
        const newStatus = formData.status === "Active" ? "Inactive" : "Active";
        onDeactivate(account.user_id, newStatus);
        setFormData((prev) => ({ ...prev, status: newStatus }));
    };

    return (
        <>
            <Button style={{ backgroundColor: "#71A872", border: '0px', color: 'white' }} className="mb-2" onClick={handleShow}>
                View/Edit
            </Button>

            <Button style={{ backgroundColor: formData.status === "Active" ? "#ff3232" : "#71A872", color: "white", border: '0px' }} onClick={handleDeactivate}>
                {formData.status === "Active" ? "Deactivate" : "Activate"}
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" centered size="lg">
                <Modal.Header closeButton>
                    <Button onClick={handleClose} className="me-5 mb-5 p-0 ps-2 pe-2" variant="danger">
                        Back
                    </Button>
                    <Modal.Title> Edit Account </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSave}>
                        {/* Account ID */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Account ID:</Form.Label>
                            <Col sm={8}>
                                <Form.Control value={formData.user_id} disabled />
                            </Col>
                        </Form.Group>

                        {/* Username */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>User Name</Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    disabled
                                />
                            </Col>
                        </Form.Group>

                        {/* Name */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Name</Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={formData.name} // Bind formData.name to input field
                                    onChange={handleChange} // Update formData when name is changed
                                />
                            </Col>
                        </Form.Group>

                        {/* Account Type */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Type of Account</Form.Label>
                            <Col sm={8}>
                                <Form.Select name="accountType" value={formData.accountType} onChange={handleChange}>
                                    <option value="Admin">Admin</option>
                                    <option value="Proponent">Proponent</option>
                                    <option value="Brgy. Official">Brgy. Official</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        {/* Department */}
                        {(formData.accountType === "Brgy. Official" || formData.accountType === "Proponent") && (
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={4}>Department</Form.Label>
                                <Col sm={8}>
                                    <Form.Select name="department" value={formData.department} onChange={handleChange}>
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

                        {/* Position */}
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

                        {/* Deactivation Date */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Deactivation Date</Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    type="date"
                                    name="deactivationDate"
                                    value={formData.deactivationDate || ""}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center">
                    <Button type="submit" onClick={handleSave} style={{ backgroundColor: "#71A872", color: "white" }}>
                        Save Changes
                    </Button>
                    <Button onClick={handleClose} variant="danger" style={{ backgroundColor: "red", color: "white" }}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BtnEditDeac;

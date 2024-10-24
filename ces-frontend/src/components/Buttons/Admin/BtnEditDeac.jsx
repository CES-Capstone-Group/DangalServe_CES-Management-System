import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

const BtnEditDeac = ({ account, onDeactivate, onSave }) => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState(account); // Initialize formData with account details

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [userChangedDepartment, setUserChangedDepartment] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [barangays, setBarangays] = useState([]);

    // Fetch departments
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/departments/');
                if (response.ok) {
                    const data = await response.json();
                    setDepartments(data);
                } else {
                    console.error("Failed to fetch departments");
                }
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };
        fetchDepartments();
    }, []);

    // Fetch courses
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/courses/');
                if (response.ok) {
                    const data = await response.json();
                    setCourses(data);
                } else {
                    console.error("Failed to fetch courses");
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchCourses();
    }, []);

    // Fetch barangays
    useEffect(() => {
        const fetchBarangays = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/barangays/');
                if (response.ok) {
                    const data = await response.json();
                    setBarangays(data);
                } else {
                    console.error("Failed to fetch barangays");
                }
            } catch (error) {
                console.error("Error fetching barangays:", error);
            }
        };
        fetchBarangays();
    }, []);

    // Populate formData on modal open
    useEffect(() => {
        console.log(account)
        if (account) {
            if(account.accountType === "Proponent"){
                setFormData({
                    ...account,
                    department: account.department_name || "", // Assuming `department_name` is coming from the API
                    course: account.course_name || "" // Assuming `course_name` is coming from the API
                });
            }
            else if(account.accountType === "Brgy. Official"){
                setFormData({
                    ...account,
                    barangay: account.barangay || "", // Assuming `barangay
                });

            }
        }
    }, [account]);

    // Pre-fill department and courses based on the account data when modal is shown
    useEffect(() => {
        if (formData.department && courses.length > 0) {
            const filtered = courses.filter(course => course.department_id === formData.department);
            setFilteredCourses(filtered);
        }
    }, [formData.department, courses]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // Filter courses when department changes
        if (name === "department") {
            setUserChangedDepartment(true);
            const filtered = courses.filter(course => course.department_id === value);
            setFilteredCourses(filtered);
            setFormData((prevState) => ({
                ...prevState,
                course: "" // Reset course when department changes
            }));
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

                        {/* Proponent Account Type */}
                        {formData.accountType === "Proponent" && (
                            <>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={4}>Department</Form.Label>
                                    <Col sm={8}>
                                        <Form.Select 
                                            name="department" 
                                            value={formData.department}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Department</option>
                                            {departments.map(dept => (
                                                <option key={dept.dept_id} value={dept.dept_id}>
                                                    {dept.dept_name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                </Form.Group>

                                {formData.department && (
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={4}>Course</Form.Label>
                                        <Col sm={8}>
                                            <Form.Select
                                                name="course"
                                                value={formData.course}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Course</option>
                                                {filteredCourses.map(course => (
                                                    <option key={course.course_id} value={course.course_id}>
                                                        {course.course_name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>
                                )}
                            </>
                        )}

                        {/* Barangay Official Account Type */}
                        {formData.accountType === "Brgy. Official" && (
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={4}>Barangay</Form.Label>
                                <Col sm={8}>                                        
                                    <Form.Select 
                                        name="barangay" 
                                        value={formData.barangay}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Barangay</option>
                                        {barangays.map(b => (
                                            <option key={b.id} value={b.brgy_name}>
                                                {b.brgy_name}
                                            </option>
                                        ))}
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

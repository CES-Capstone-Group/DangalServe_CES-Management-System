import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";

const BtnAddAcc = ({ onAccountAdded }) => {
    const [showModal, setShowModal] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [courses, setCourses] = useState([]);
    const [barangays, setBarangays] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [errors, setErrors] = useState({});

    const getCurrentDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const [formData, setFormData] = useState({
        username: '',
        name: '',
        password: '',
        accountType: 'Admin',
        department: '',
        course: '',
        position: '',
        barangay: '',
        activationDate: getCurrentDate(),
        deactivationDate: '',
        status: 'Active',
    });

    // Fetch departments, courses, barangays
    // Add fetch functions here...

    // Update filtered courses when department changes
    useEffect(() => {
        const filtered = courses.filter(course => course.department_id === formData.department);
        setFilteredCourses(filtered);
    }, [formData.department, courses]);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({
            username: '',
            name: '',
            password: '',
            accountType: 'Admin',
            department: '',
            course: '',
            position: '',
            barangay: '',
            activationDate: getCurrentDate(),
            deactivationDate: '',
            status: 'Active',
        });
        setErrors({}); // Reset errors on close
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value || null
        }));
    };

    // Form validation logic
    const validateForm = () => {
        const newErrors = {};

        if (!formData.username || formData.username.trim() === '') {
            newErrors.username = 'Username is required';
        }
        if (!formData.name || formData.name.trim() === '') {
            newErrors.name = 'Name is required';
        }
        if (!formData.password || formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }
        if (formData.accountType === 'Proponent' && !formData.department) {
            newErrors.department = 'Department is required for Proponents';
        }
        if (formData.accountType === 'Proponent' && !formData.course) {
            newErrors.course = 'Course is required for Proponents';
        }
        if (formData.accountType === 'Brgy. Official' && !formData.barangay) {
            newErrors.barangay = 'Barangay is required for Brgy. Officials';
        }
        if (!formData.position || formData.position.trim() === '') {
            newErrors.position = 'Position is required';
        }
        if (!formData.activationDate) {
            newErrors.activationDate = 'Activation date is required';
        }
        if (formData.deactivationDate && formData.deactivationDate < formData.activationDate) {
            newErrors.deactivationDate = 'Deactivation date cannot be earlier than activation date';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return; // Stop submission if validation fails
        }
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
            <Button className="shadow" style={{ backgroundColor: "#71A872", border: '0px', color: 'white' }} onClick={handleShowModal}>
                Add User
            </Button>

            <Modal backdrop='static' centered size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title> Add New Account </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        {/* Username */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>User Name</Form.Label>
                            <Col sm={8}>
                                <Form.Control 
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Enter Username"
                                    isInvalid={!!errors.username}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.username}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        {/* Name */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Name</Form.Label>
                            <Col sm={8}>
                                <Form.Control 
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter Name"
                                    isInvalid={!!errors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        {/* Password */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Password</Form.Label>
                            <Col sm={8}>
                                <Form.Control 
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                    isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        {/* Proponent Account Type */}
                        {formData.accountType === "Proponent" && (
                            <>
                                {/* Department */}
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={4}>Department</Form.Label>
                                    <Col sm={8}>
                                        <Form.Select 
                                            name="department" 
                                            value={formData.department}
                                            onChange={handleChange}
                                            isInvalid={!!errors.department}
                                        >
                                            <option value="">Select Department</option>
                                            {departments.map(dept => (
                                                <option key={dept.dept_id} value={dept.dept_id}>
                                                    {dept.dept_name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.department}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>

                                {/* Course */}
                                {formData.department && (
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={4}>Course</Form.Label>
                                        <Col sm={8}>
                                            <Form.Select
                                                name="course"
                                                value={formData.course}
                                                onChange={handleChange}
                                                isInvalid={!!errors.course}
                                            >
                                                <option value="">Select Course</option>
                                                {filteredCourses.map(course => (
                                                    <option key={course.course_id} value={course.course_id}>
                                                        {course.course_name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.course}
                                            </Form.Control.Feedback>
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
                                        isInvalid={!!errors.barangay}
                                    >
                                        <option value="">Select Barangay</option>
                                        {barangays.map(b => (
                                            <option key={b.id} value={b.brgy_name}>
                                                {b.brgy_name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.barangay}
                                    </Form.Control.Feedback>
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
                                    isInvalid={!!errors.position}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.position}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        {/* Activation Date */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Activation Date</Form.Label>
                            <Col sm={8}>
                                <Form.Control 
                                    type="date"
                                    name="activationDate"
                                    value={formData.activationDate}
                                    onChange={handleChange}
                                    isInvalid={!!errors.activationDate}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.activationDate}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        {/* Deactivation Date */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Deactivation Date</Form.Label>
                            <Col sm={8}>
                                <Form.Control 
                                    type="date"
                                    name="deactivationDate"
                                    value={formData.deactivationDate || ''}
                                    onChange={handleChange}
                                    isInvalid={!!errors.deactivationDate}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.deactivationDate}
                                </Form.Control.Feedback>
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

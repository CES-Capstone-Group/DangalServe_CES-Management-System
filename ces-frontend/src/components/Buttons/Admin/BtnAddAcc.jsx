import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";

const BtnAddAcc = ({ onAccountAdded }) => {
    const [showModal, setShowModal] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [courses, setCourses] = useState([]);
    const [barangays, setBarangays] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [userChangedDepartment, setUserChangedDepartment] = useState(false);

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

    //fetch barangays
    useEffect(() => {
        const fetchBarangays = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/barangays/');
                if (response.ok) {
                    const data = await response.json();
                    setBarangays(data);
                } else {
                    console.error("Failed to fetch departments");
                }
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };
        fetchBarangays();
    }, []);

    // Update filtered courses when department changes
    useEffect(() => {
        const filtered = courses.filter(course => course.department_id === formData.department);
        setFilteredCourses(filtered);
    }, [formData.department, courses]);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setUserChangedDepartment(false);

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
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value || null
        }));
    
        if (name === 'department') {
            setUserChangedDepartment(true);
            setFormData(prevState => ({
                ...prevState,
                course: '', // Reset course selection when department changes
            }));
    
            // Fetch courses based on department selection
            if (value) {
                fetch(`http://127.0.0.1:8000/api/departments/${value}/courses/`)
                    .then((response) => response.json())
                    .then((data) => {
                        setFilteredCourses(data);  // Update the filtered courses state
                    })
                    .catch((error) => {
                        console.error("Error fetching courses:", error);
                    });
            } else {
                setFilteredCourses([]);  // Clear courses if no department selected
            }
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
            // console.log('Account created:', data);
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
                            <Form.Label column sm={4}>User Name</Form.Label>
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
                            <Form.Label column sm={4}>Name</Form.Label>
                            <Col sm={8}>
                                <Form.Control 
                                    type="text"
                                    name="name"
                                    value={formData.name}
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

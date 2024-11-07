import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Container, Button, Modal, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import pncbg from '../assets/pncbg.png'
import { useNavigate } from 'react-router-dom';



const EvalSelect = () => {
    const [showModal, setShowModal] = useState(false);
    const [role, setRole] = useState("");

    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [filteredCourses, setFilteredCourses] = useState([]);

    const [barangays, setBarangays] = useState([]);
    const [selectedBarangays, setSelectedBarangays] = useState('');
    
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [userChangedDepartment, setUserChangedDepartment] = useState(false);

    const [isOtherSelected, setIsOtherSelected] = useState(false);
    const [otherDepartment, setOtherDepartment] = useState('');

    const handleShowModal = () => { setShowModal(true); };
    const handleCloseModal = () => { setShowModal(false) };
    const navigate = useNavigate();

    const [errors, setErrors] = useState({}); // Validation error state

    const handleSetRole = (selectedRole) => {
        setRole(selectedRole);
        handleShowModal();
    };

    const handleSubmit = () => {
        navigate("/eval");
    }

    const [formData, setFormData] = useState({
        department: '',
        course: '',
    });

    useEffect(() => {
        const fetchBarangay = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/barangays/');
                setBarangays(response.data);
            } catch (error) {
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
        fetchDepartments();
        fetchBarangay();
    }, []);

    // Update filtered courses when department changes
    useEffect(() => {
        const filtered = courses.filter(course => course.dept_id === formData.department);
        // console.log("filtered",filtered);
        setFilteredCourses(filtered);
    }, [formData.department, courses]);
    
    const handleDepartmentChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedDepartment(selectedValue);

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

        // Check if "Other" is selected
        if (selectedValue === 'Other') {
            setIsOtherSelected(true);
        } else {
            setIsOtherSelected(false);
            setOtherDepartment(''); // Reset the other department field
        }
    };

    const handleOtherDepartmentChange = (e) => {
        setOtherDepartment(e.target.value);
    };

    const handleBarangayChange = (e) => {
        setSelectedBarangays(e.target.value);  // Capture selected department
    };

    const roles = [{ label: 'Student' },
    { label: 'Non-Teaching' },
    { label: 'Teaching' },
    { label: 'Alumni' },
    { label: 'Participant' }
    ];

    return (
        <div className="vh-100  fluid loginBg">
            <Container className="d-flex flex-column justify-content-center align-items-center evalSel">
                <h2 className="mt-4 mb-4" style={{ textAlign: 'center' }} id='propHeader1'>
                    Account Registration
                </h2>
                {roles.map((roles, index) => (
                    <Button key={index} variant="outline-success"
                        className="d-flex align-items-center mb-3 px-4"
                        style={{ borderRadius: "10px", fontSize: "50px", width: "500px" }}
                        onClick={() => handleSetRole(roles.label)}>
                        <FontAwesomeIcon icon={faUser} className="me-2" />
                        {roles.label}
                    </Button>
                ))}
            </Container>


            <Modal size="lg" centered show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <h2 className="h2">{role}</h2>
                </Modal.Header>
                <Modal.Body>
                    {role === 'Student' ?
                        (

                            <Form>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>Full Name:</Form.Label>
                                    <Col>
                                        <Form.Control required type="text" placeholder="eg. Dela Cruz, Juan B." />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>Student ID:</Form.Label>
                                    <Col>
                                        <Form.Control required type="text" placeholder="Enter Student ID" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3} >Student Email:</Form.Label>
                                    <Col>
                                        <Form.Control type="email" placeholder="eg. account@gmail.com" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>Contact Number:</Form.Label>
                                    <Col>
                                        <Form.Control type="text" placeholder="eg. 09123456789" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>Department:</Form.Label>
                                    <Col>
                                        <Form.Select 
                                            name="department" 
                                            value={formData.department}
                                            onChange={handleDepartmentChange}
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
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>Course:</Form.Label>
                                    <Col>
                                    <Form.Select
                                            name="course"
                                            value={formData.course}
                                            onChange={handleDepartmentChange}
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
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>Username:</Form.Label>
                                    <Col>
                                        <Form.Control required type="text" placeholder="Enter username" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column required sm={3}>Password:</Form.Label>
                                    <Col>
                                        <Form.Control required type="password" placeholder="Enter password" />
                                    </Col>
                                </Form.Group>
                            </Form>
                        )
                        : role === 'Non-Teaching' ? (
                            <Form>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>Full Name:</Form.Label>
                                    <Col>
                                        <Form.Control required type="text" placeholder="eg. Dela Cruz, Juan B." />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3} >Email:</Form.Label>
                                    <Col>
                                        <Form.Control type="email" placeholder="eg. account@gmail.com" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>Contact Number:</Form.Label>
                                    <Col>
                                        <Form.Control type="text" placeholder="eg. 09123456789" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>Department:</Form.Label>
                                    <Col>
                                        <Form.Select 
                                            name="department" 
                                            value={formData.department}
                                            onChange={handleDepartmentChange}
                                            isInvalid={!!errors.department}
                                        >
                                            <option value="">Select Department</option>
                                            {departments.map(dept => (
                                                <option key={dept.dept_id} value={dept.dept_id}>
                                                    {dept.dept_name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Col>

                                    {/* Conditionally render the "Please specify" input field */}
                                    {isOtherSelected && (
                                        <Col sm={6}>
                                            <Form.Control
                                                type="text"
                                                placeholder="Please specify"
                                                value={otherDepartment}
                                                onChange={handleOtherDepartmentChange}
                                            />
                                        </Col>
                                    )}
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>Position:</Form.Label>
                                    <Col>
                                        <Form.Control required type="text" placeholder="Enter Position" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>Username:</Form.Label>
                                    <Col>
                                        <Form.Control required type="text" placeholder="Enter username" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>Password:</Form.Label>
                                    <Col>
                                        <Form.Control required type="password" placeholder="Enter password" />
                                    </Col>
                                </Form.Group>
                            </Form>
                        )

                            : role === 'Teaching' ? (
                                <Form>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={3}>Full Name:</Form.Label>
                                        <Col>
                                            <Form.Control required type="text" placeholder="eg. Dela Cruz, Juan B." />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={3} >Email:</Form.Label>
                                        <Col>
                                            <Form.Control type="email" placeholder="eg. account@gmail.com" />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={3}>Contact Number:</Form.Label>
                                        <Col>
                                            <Form.Control type="text" placeholder="eg. 09123456789" />
                                        </Col>
                                    </Form.Group>
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
                                        <Form.Label column sm={3}>Username:</Form.Label>
                                        <Col>
                                            <Form.Control required type="text" placeholder="Enter username" />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={3}>Password:</Form.Label>
                                        <Col>
                                            <Form.Control required type="password" placeholder="Enter password" />
                                        </Col>
                                    </Form.Group>
                                </Form>
                            )
                                : role === 'Alumni' ? (
                                    <Form>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm={3}>Full Name:</Form.Label>
                                            <Col>
                                                <Form.Control required type="text" placeholder="eg. Dela Cruz, Juan B." />
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm={3} >Email:</Form.Label>
                                            <Col>
                                                <Form.Control type="email" placeholder="eg. account@gmail.com" />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm={3}>Contact Number:</Form.Label>
                                            <Col>
                                                <Form.Control type="text" placeholder="eg. 09123456789" />
                                            </Col>
                                        </Form.Group>
                                                <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm={3}>Department:</Form.Label>
                                            <Col>
                                                <Form.Select 
                                                    name="department" 
                                                    value={formData.department}
                                                    onChange={handleDepartmentChange}
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
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm={3}>Course:</Form.Label>
                                            <Col>
                                            <Form.Select
                                                    name="course"
                                                    value={formData.course}
                                                    onChange={handleDepartmentChange}
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
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm={3}>Username:</Form.Label>
                                            <Col>
                                                <Form.Control required type="text" placeholder="Enter username" />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm={3}>Password:</Form.Label>
                                            <Col>
                                                <Form.Control required type="password" placeholder="Enter password" />
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                )
                                    : role === 'Participant' ? (
                                        <Form>
                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm={3}>Full Name:</Form.Label>
                                                <Col>
                                                    <Form.Control required type="text" placeholder="eg. Dela Cruz, Juan B." />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm={3} >Email:</Form.Label>
                                                <Col>
                                                    <Form.Control type="email" placeholder="eg. account@gmail.com" />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm={3}>Contact Number:</Form.Label>
                                                <Col>
                                                    <Form.Control type="text" placeholder="eg. 09123456789" />
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
                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm={3}>Username:</Form.Label>
                                                <Col>
                                                    <Form.Control required type="text" placeholder="Enter username" />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm={3}>Password:</Form.Label>
                                                <Col>
                                                    <Form.Control required type="password" placeholder="Enter password" />
                                                </Col>
                                            </Form.Group>
                                        </Form>
                                    )
                                        : null}
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button onClick={handleSubmit} controlId='button' variant='success' type='submit' size='lg'>Submit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EvalSelect;
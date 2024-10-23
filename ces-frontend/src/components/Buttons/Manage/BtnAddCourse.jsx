import React, { useEffect, useState } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import axios from "axios";

const BtnAddCourse = ({ onCourseAdded }) => {  // <-- Added `onCourseAdded` prop
    const [showModal, setShowModal] = useState(false);
    const [CourseName, setCourseName] = useState("");  // <-- State for Course name
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');   

    // Open the modal
    const handleShowModal = () => setShowModal(true);

    // Close the modal and reset form fields
    const handleCloseModal = () => {
        setShowModal(false);
        setCourseName("");  // Reset Course name
    };

    // **Function to handle form submission and backend integration**
    const handleSubmit = async () => {
        const formData = { course_name: CourseName };  // Prepare data to send to backend

        try {
            const response = await fetch("http://127.0.0.1:8000/api/Courses/create/", {  // Backend URL
                method: "POST",
                headers: {
                    "Content-Type": "application/json",  // Specify the content type
                },
                body: JSON.stringify(formData),  // Convert formData to JSON
            });

            if (response.ok) {
                alert("Course added successfully!");
                handleCloseModal();  // Close the modal on success
                onCourseAdded();  // Trigger parent to re-fetch data
            } else {
                const data = await response.json();
                alert(`Failed to add Course: ${JSON.stringify(data)}`);
            }
        } catch (error) {
            console.error("Error adding Course:", error);
        }
    };

    useEffect (() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/departments/');
                setDepartments(response.data); // Set the department data in state
            } catch (error) {
                console.error("There was an error fetching the department data!", error);
            }
        };

        fetchDepartments();
    }, []);

    const handleDepartmentChange = (e) => {
        setSelectedDepartment(e.target.value);  // Capture selected department
    };

    return (
        <div className="d-flex justify-content-end m-3">
            <Button className="shadow" style={{ backgroundColor: "#71A872", border: '0px', color: 'white' }} onClick={handleShowModal}>
                Add Course
            </Button>

            <Modal backdrop='static' centered size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Button onClick={handleCloseModal} className="me-5 mb-5 p-0 ps-2 pe-2" variant="success">Back</Button>
                    <Modal.Title> Add New Course </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* combo box for department */}
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
                            <Form.Label column sm={3}>Course Name:</Form.Label>
                            <Col sm={8}>
                                <Form.Control 
                                    type="text"
                                    name="courseName"
                                    placeholder="Enter Course Name"
                                    value={CourseName}  // Link the state
                                    onChange={(e) => setCourseName(e.target.value)}  // Update state on change
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center">
                    <Button onClick={handleSubmit} variant='success'>  {/* <-- Call handleSubmit on click */}
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

export default BtnAddCourse;

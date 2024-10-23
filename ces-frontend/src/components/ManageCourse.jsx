import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Table, Button, Row, Col, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "./table.css";
import BtnEditDeleteCourse from "./Buttons/Manage/BtnEditDeleteCourse";
import BtnAddCourse from "./Buttons/Manage/BtnAddCourse";

const ManageCourse = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);
    const [contentType, setContentType] = useState("");
    const [courses, setCourses] = useState([]); // State for storing courses data
    const navigate = useNavigate();

    // Fetch Courses from Backend
    const fetchCourses = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/courses/");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCourses(data); // Store fetched data in state
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    // Fetch courses on component mount
    useEffect(() => {
        fetchCourses();
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedContent(null);
        setContentType("");
    };

    // Handle back navigation
    const handleBack = () => {
        navigate(-1); // Navigate to the previous page
    };

    // Table row component
    const Rows = ({ course_id, course_name, dept_name }) => (
        <tr>
            <td>{course_id}</td>
            <td>{course_name}</td>
            <td>{dept_name}</td>
            <td>
                <BtnEditDeleteCourse />
            </td>
        </tr>
    );

    // Table component
    const NewTable = ({ data }) => (
        <Table responsive bordered striped hover className="tableStyle">
            <thead>
                <tr>
                    <th>Course ID</th>
                    <th>Course Name</th>
                    <th>Department Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((course, index) => (
                    <Rows
                        key={index}
                        course_id={course.course_id}
                        course_name={course.course_name}
                        dept_name={course.dept_name} // Assuming dept_name comes from backend
                    />
                ))}
            </tbody>
        </Table>
    );

    return (
        <Container
            fluid
            style={{ width: "100rem" }}
            className="vh-100 d-flex flex-column justify-content-center me-0 ms-0"
        >
            <Row>
                <Button
                    variant="link"
                    onClick={handleBack}
                    className="backBtn d-flex align-items-center text-success"
                >
                    <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                    <span className="ms-2">Back</span>
                </Button>

                <Col className="d-flex justify-content-end">
                    <Button style={{ backgroundColor: "#71A872", border: "0px" }}>
                        <FontAwesomeIcon className="me-2" icon={faFilter} />
                        Filter
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1>Course Management</h1>
                </Col>
            </Row>
            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <input
                        type="search"
                        className="form-control"
                        placeholder="Search"
                        style={{ width: "300px" }}
                    />
                </Col>
            </Row>

            <NewTable data={courses} /> {/* Pass courses state to the table */}
            <BtnAddCourse onCourseAdded={fetchCourses} /> {/* Re-fetch courses when a course is added */}
        </Container>
    );
};

export default ManageCourse;

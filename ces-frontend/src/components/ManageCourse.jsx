import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Table, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import BtnAddCourse from "./Buttons/Manage/BtnAddCourse"; // Import Add Course Button
import BtnEditDeleteCourse from "./Buttons/Manage/BtnEditDeleteCourse"; // Import Edit/Delete Course Button
import "./table.css";

const CourseManagement = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]); // State to store courses

    // **Function to Fetch Courses from Backend**
    const fetchCourses = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/courses/'); // Fetch from API
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCourses(data); // Store fetched courses in state
        } catch (error) {
            console.error("Failed to fetch courses:", error);
        }
    };

    // **Fetch courses when component mounts**
    useEffect(() => {
        fetchCourses();
    }, []);

    // **Handle Back Navigation**
    const handleBack = () => {
        navigate(-1); // Navigate to the previous page
    };

    // **Row Component for Each Course**
    const Rows = (props) => {
        const { course_id, course_name, dept_name } = props;

        return (
            <tr>
                <td>{course_id}</td>
                <td>{course_name}</td>
                <td>{dept_name}</td>
                {/* Pass Props to BtnEditDeleteCourse */}
                <td>
                    <BtnEditDeleteCourse 
                        courseId={course_id} 
                        courseName={course_name} 
                        deptName={dept_name} 
                        onCourseUpdated={fetchCourses} 
                    />
                </td>
            </tr>
        );
    };

    // **NewTable Component to Display All Courses**
    const NewTable = ({ data }) => {
        return (
            <Table responsive striped bordered hover className="tableStyle">
                <thead>
                    <tr>
                        <th>Course ID</th>
                        <th>Course Name</th>
                        <th>Department Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((course) => (
                        <Rows
                            key={course.course_id}
                            course_id={course.course_id}
                            course_name={course.course_name}
                            dept_name={course.dept_name}
                        />
                    ))}
                </tbody>
            </Table>
        );
    };

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
                    className="backBtn d-flex align-items-center text-success me-3"
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
                <Col><h1>Course Management</h1></Col>
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

            {/* Render Table with Fetched Courses */}
            <NewTable data={courses} />

            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    {/* Pass `fetchCourses` as Prop to BtnAddCourse */}
                    <BtnAddCourse onCourseAdded={fetchCourses} />
                </Col>
            </Row>
        </Container>
    );
};

export default CourseManagement;

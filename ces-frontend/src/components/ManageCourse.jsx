import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Row, Col, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faChevronLeft, faEye } from "@fortawesome/free-solid-svg-icons";
import "./table.css";
import BtnEditDeleteCourse from "./Buttons/Manage/BtnEditDeleteCourse";


const ManageCourse = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);
    const [contentType, setContentType] = useState("");
    // const [achievements, setAchievements] = useState([]);  // <-- Store achievements data
    const navigate = useNavigate();

    // Fetch Achievements from Backend
    // const fetchAchievements = async () => {
    //     try {
    //         const response = await fetch("http://127.0.0.1:8000/api/achievements/");  // Adjust your backend URL
    //         if (!response.ok) throw new Error("Failed to fetch achievements.");
    //         const data = await response.json();
    //         setAchievements(data);  // Update state with fetched data
    //     } catch (error) {
    //         console.error("Error fetching achievements:", error);
    //     }
    // };

    // Fetch achievements on component mount
    // useEffect(() => {
    //     fetchAchievements();
    // }, []);

    // Handle content view modal
    const handleContentClick = (contentUrl) => {
        setContentType(contentUrl.endsWith(".pdf") ? "pdf" : "image");
        setSelectedContent(contentUrl);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedContent(null);
        setContentType("");
    };

    // Handle back navigation
    const handleBack = () => {
        navigate(-1);  // Navigate to the previous page
    };

    const array = [
        {course_id:'1', course_name:'Bachelor of Science in Information Technology'},
        {course_id:'2', course_name:'Bachelor of Science in Computer Science'},
        {course_id:'3', course_name:'Bachelor of Science in Psychology'},
        {course_id:'4', course_name:'Bachelor of Science in Nursing'},
        {course_id:'5', course_name:'Bachelor of Science in Business Accounting'},
        {course_id:'6', course_name:'Bachelor of Science in Accountancy'},
        {course_id:'7', course_name:'Bachelor of Science in Mechanical Engineering'},
        {course_id:'8', course_name:'Bachelor of Science in Computer Engineering'},
        {course_id:'9', course_name:'Bachelor of Science in Civil Engineering'},
        
    ];

    // Table row component
    const Rows = (props) => {
        const { course_id, course_name} = props;
        return (
            <tr>
                <td>{course_id}</td>
                <td>{course_name}</td>
                <td>
                    <BtnEditDeleteCourse/>
                </td>
            </tr>
        );
    };

    // Table component
    const NewTable = ({ data }) => {
        return (
            <Table responsive bordered striped hover className="tableStyle">
                <thead>
                    <tr>
                        <th>Course ID</th>
                        <th>Course Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {array.map((array, index) => (
                        <Rows 
                        key={index} 
                        course_id={array.course_id}
                        course_name={array.course_name} />
                    ))}
                </tbody>
            </Table>
        );
    };

    return (
        <Container fluid style={{width: '100rem'}}
        className="vh-100 d-flex flex-column justify-content-center me-0 ms-0" >
            <Row>
                <Button variant="link" onClick={handleBack} className="backBtn d-flex align-items-center text-success">
                    <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                    <span className="ms-2">Back</span>
                </Button>

                <Col className="d-flex justify-content-end">
                    <Button style={{ backgroundColor: '#71A872', border: '0px' }}>
                        <FontAwesomeIcon className='me-2' icon={faFilter} ></FontAwesomeIcon>
                        Filter
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col><h1>Achievement Management</h1></Col>
            </Row>
            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <input type="search" className="form-control" placeholder='Search' style={{ width: '300px' }} />
                </Col>
                {/* Modal for viewing full image */}
                <Modal size="lg" show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body className="text-center">
                        {selectedContent && contentType === "image" && (
                            <img src={selectedContent} alt="Content" style={{ width: '100%' }} />
                        )}
                        {selectedContent && contentType === "pdf" && (
                            <embed src={selectedContent} type="application/pdf" width="100%" height="900px" />
                        )}
                    </Modal.Body>
                </Modal>
            </Row>

            <NewTable data={array} />
        </Container>
    );
};

export default ManageCourse;

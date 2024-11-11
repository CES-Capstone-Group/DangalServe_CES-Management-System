import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Row, Col, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faChevronLeft, faEye } from "@fortawesome/free-solid-svg-icons";
import "./table.css";
import samplepdf from "../assets/samplepdf.pdf";


const ManageCalendar = () => {
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
        {proposal:'Tree Planting', activity_title:'Tree Planting in Bigaa Court', date:'22-Oct-2024', time:'05:30 am', calendar_file: samplepdf},
        {proposal:'Community Cleanup Drive', activity_title:'Clean Up Drive in NIA Road', date:'26-Oct-2024', time:'06:00 am', calendar_file: samplepdf},
    ];

    // Table row component
    const Rows = (props) => {
        const { proposal, activity_title, date, time, calendar_file} = props;
        return (
            <tr>
                <td>{proposal}</td>
                <td>{activity_title}</td>
                <td>{date}</td>
                <td>{time}</td>
                <td>
                    <Button variant="success link" onClick={() => handleContentClick(calendar_file)}>
                        <FontAwesomeIcon icon={faEye} />
                    </Button>
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
                        <th>Proposal</th>
                        <th>Activity Title</th>
                        <th>Target Date</th>
                        <th>Target Time</th>
                        <th>File</th>
                    </tr>
                </thead>
                <tbody>
                    {array.map((array, index) => (
                        <Rows 
                        key={index} 
                        proposal={array.proposal}
                        activity_title={array.activity_title}
                        date={array.date}
                        time={array.time}
                        calendar_file={array.calendar_file} />
                    ))}
                </tbody>
            </Table>
        );
    };

    return (
        <Container fluid 
        className="py-4 mt-5 d-flex flex-column justify-content-center me-0 ms-0" >
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
                <Col><h1>Calendar Management</h1></Col>
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

export default ManageCalendar;

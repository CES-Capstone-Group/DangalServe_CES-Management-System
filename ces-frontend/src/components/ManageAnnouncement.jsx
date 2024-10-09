import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Row, Col, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faChevronLeft, faEye } from "@fortawesome/free-solid-svg-icons";
import "./table.css";
import BtnEditDeleteAnnouncement from "./Buttons/Admin/BtnEditDeleteAnnouncement";
import BtnAddAnnouncement from "./Buttons/Admin/BtnAddAnnouncement";

const ManageAnnouncement = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null); // State for viewing images
    const [contentType, setContentType] = useState("");
    const [announcements, setAnnouncements] = useState([]); // State for announcements
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const navigate = useNavigate();

    // Fetch announcements from the backend
    const fetchAnnouncements = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/announcements/");
            if (!response.ok) {
                throw new Error("Failed to fetch announcements.");
            }
            const data = await response.json();
            setAnnouncements(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    // Handle viewing image or PDF content
    const handleContentClick = (contentUrl) => {
        if (contentUrl.endsWith(".pdf")) {
            setContentType("pdf"); // If the file is a PDF
        } else {
            setContentType("image"); // If it's an image
        }
        setSelectedContent(contentUrl);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedContent(null);
        setContentType("");
    };

    // Go back to the previous page
    const handleBack = () => {
        navigate(-1); // Navigate to the previous page in the history
    };

    // Handle announcement updates
    const handleAnnouncementUpdated = () => {
        fetchAnnouncements();
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

    // Table row component for displaying each announcement
    const Rows = ({ announcement }) => (
        <tr>
            <td>{announcement.title}</td>
            <td>{announcement.details}</td>
            <td>
                <Button variant="success link" onClick={() => handleContentClick(announcement.image_url)}>
                    <FontAwesomeIcon icon={faEye} />
                </Button>
            </td>
            <td>
                <BtnEditDeleteAnnouncement
                    announcement={announcement} // Pass the announcement data to the child component
                    onAnnouncementUpdated={handleAnnouncementUpdated} // Trigger parent function to update announcements
                />
            </td>
        </tr>
    );

    // Table component
    const NewTable = ({ data }) => (
        <Table responsive striped hover className="tableStyle">
            <thead>
                <tr style={{ backgroundColor: "#007200", color: "white" }}>
                    <th>Announcement Title</th>
                    <th>Details</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((announcement) => <Rows key={announcement.id} announcement={announcement} />)
                ) : (
                    <tr>
                        <td colSpan="4" className="text-center">No announcements found.</td>
                    </tr>
                )}
            </tbody>
        </Table>
    );

    return (
        <Container fluid>
            <Row>
                <Button variant="link" onClick={handleBack} className="backBtn d-flex align-items-center text-success me-3">
                    <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                    <span className="ms-2">Back</span>
                </Button>
                <Col className="d-flex justify-content-end">
                    <Button style={{ backgroundColor: '#71A872', border: '0px' }}>
                        <FontAwesomeIcon className='me-2' icon={faFilter} />
                        Filter
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col><h1>Announcement Management</h1></Col>
            </Row>
            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <input type="search" className="form-control" placeholder='Search' style={{ width: '300px' }} />
                </Col>
                {/* Modal for viewing full image or PDF */}
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

            {/* Render the announcements table */}
            <NewTable data={announcements} />

            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <BtnAddAnnouncement onAnnouncementAdded={handleAnnouncementUpdated} /> {/* Add announcement button */}
                </Col>
            </Row>
        </Container>
    );
};

export default ManageAnnouncement;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faBuilding,
    faUniversity,
    faFileAlt,
    faTrophy,
    faBullhorn,
    faChevronLeft,
    faFolderOpen,
    faCalendarAlt,
    faGraduationCap,
} from '@fortawesome/free-solid-svg-icons'; // Import the icons you want to use

const AdminManage = () => {
    const navigate = useNavigate();

    // Function to handle navigation
    const handleNavigation = (path) => {
        navigate(path);
    };

    // Go back to the previous page
    const handleBack = () => {
        navigate(-1); // This will navigate to the previous page in the history
    };

    // Sample data for management sections with corresponding icons
    const managementSections = [
        { title: "Account Management", path: "/manage/accmngmnt", icon: faUser },
        { title: "Barangay Management", path: "/manage/brgy-management", icon: faBuilding },
        { title: "Research Agenda Management", path: "/manage/manage-agenda", icon: faFileAlt },
        { title: "Course Management", path: "/manage/course-management", icon: faGraduationCap },
        { title: "Department Management", path: "/manage/dept-management", icon: faUniversity },
        { title: "Achievement Management", path: "/manage/manage-ach", icon: faTrophy },
        { title: "Announcement Management", path: "/manage/manage-ann", icon: faBullhorn },
        { title: "Document Management", path: "/manage/manage-docs", icon: faFolderOpen },
        { title: "Calendar Management", path: "/manage/manage-calendar", icon: faCalendarAlt },
        
    ];

    return (
        <Container fluid className="vh-100 d-flex flex-column justify-content-center align-items-center position-relative">

            {/* Row containing Back button and Management heading */}
            <Row className="d-flex align-items-center justify-content-center mb-4">
                <div className="d-flex align-items-center">
                    <Button variant="link" onClick={handleBack} className="backBtn d-flex align-items-center text-success me-3">
                        <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                        <span className="ms-2">Back</span>
                    </Button>

                    {/* Management Heading */}
                    <h2 className="m-0 text-success">Management</h2>
                </div>
            </Row>

            {/* Management Cards */}
            <Row className="g-4 d-flex justify-content-center">
                {managementSections.map((section, index) => (
                    <Col key={index} xs={12} sm={6} md={4} className="d-flex justify-content-center">
                        <Card
                            onClick={() => handleNavigation(section.path)}
                            className="landCard clickable-card text-center shadow p-4"
                            style={{
                                cursor: 'pointer',
                                width: '90%',
                                maxWidth: '300px',
                                height: 'auto',
                                minHeight: '200px',
                            }}
                        >
                            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                                <FontAwesomeIcon icon={section.icon} size="4x" className="mb-3" style={{ color: '#71A872' }} />
                                <Card.Title className="mt-auto text-success">{section.title}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default AdminManage;

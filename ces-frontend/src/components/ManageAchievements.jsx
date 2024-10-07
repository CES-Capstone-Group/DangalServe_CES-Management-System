import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Row, Col, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faChevronLeft, faEye } from "@fortawesome/free-solid-svg-icons";
import "./table.css";
import BtnEditDelete from "./Buttons/Manage/BtnEditDelete";
import BtnAddAchievement from "./Buttons/Admin/BtnAddAchievement";



const ManageAchievements = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null); // State for viewing images
    const [contentType, setContentType] = useState("");

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

    const array = [{ awardTitle: 'Outstanding Extension Personnel', awardee: 'Mr. John Doe', awardedBy: 'Community Outreach Foundation', awardDate: 'April 20, 2024', achImage: '' },
    { awardTitle: 'Outstanding Extension Personnel', awardee: 'Mr. John Doe', awardedBy: 'Community Outreach Foundation', awardDate: 'April 20, 2024', achImage: '' }];

    const Rows = (props) => {
        const { awardTitle, awardee, awardedBy, awardDate, achImage } = props
        return (
            <tr>
                <td>{awardTitle}</td>
                <td>{awardee}</td>
                <td>{awardedBy}</td>
                <td>{awardDate}</td>
                <td>
                    <Button variant="success link" onClick={() => handleContentClick(achImage)}>
                        <FontAwesomeIcon icon={faEye} />
                    </Button>
                </td>
                <td><BtnEditDelete /></td>
            </tr>
        );
    };

    const NewTable = (props) => {
        const { data } = props
        return (
            <Table responsive bordered striped hover className="tableStyle">
                <thead>
                    <th>Award Title</th>
                    <th>Awardee</th>
                    <th>Awarded By</th>
                    <th>Date Awarded</th>
                    <th>Image</th>
                    <th></th>
                </thead>
                {data.map((row, index) =>
                    <Rows key={'key-${index}'}
                        awardTitle={row.awardTitle}
                        awardee={row.awardee}
                        awardedBy={row.awardedBy}
                        awardDate={row.awardDate}
                        achImage={row.achImage}
                    />)}
            </Table>
        );
    }
    const navigate = useNavigate();

    // Go back to the previous page
    const handleBack = () => {
        navigate(-1); // This will navigate to the previous page in the history
    };
    const [rows, setRows] = useState(array)

    return (
        <Container fluid>
            <Row>
                <Button variant="link" onClick={handleBack} className="backBtn d-flex align-items-center text-success me-3">
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
                <Col><h1> Achievement Management </h1></Col>
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

            <Table>
                <NewTable data={rows} />
            </Table>

            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <BtnAddAchievement />
                </Col>
            </Row>

        </Container>

    );
};

export default ManageAchievements;


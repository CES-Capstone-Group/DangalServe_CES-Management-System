import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Row, Col, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faChevronLeft, faEye } from "@fortawesome/free-solid-svg-icons";
import "./table.css";
import BtnEditDelete from "./Buttons/Manage/BtnEditDelete";
import BtnAddAnnouncement from "./Buttons/Admin/BtnAddAnnouncement";



const ManageAnnouncement = () => {
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
    const navigate = useNavigate();

    // Go back to the previous page
    const handleBack = () => {
        navigate(-1); // This will navigate to the previous page in the history
    };

    const array = [{ announcementTitle: 'Outstanding Extension Personnel', announcementDeets: '', announcementImg: '' }];


    const Rows = (props) => {
        const { announcementTitle, announcementDeets, announcementImg } = props
        return (
            <tr>
                <td>{announcementTitle}</td>
                <td>{announcementDeets}</td>
                <td>
                    <Button variant="success link" onClick={() => handleContentClick(announcementImg)}>
                        <FontAwesomeIcon icon={faEye} />
                    </Button>
                </td>
                <td>
                    <BtnEditDelete />
                </td>
            </tr>
        );
    };

    const NewTable = (props) => {
        const { data } = props
        return (
            <Table responsive striped hover className="tableStyle">
                <thead>
                    <th>Announcement Title</th>
                    <th>Details</th>
                    <th>Image</th>
                    <th></th>
                </thead>
                {data.map((row, index) =>
                    <Rows key={'key-${index}'}
                        announcementTitle={row.announcementTitle}
                        announcementDeets={row.announcementDeets}
                        announcementImg={row.announcementImg} />)}
            </Table>
        );
    }

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
                <Col><h1> Announcement Management</h1></Col>
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
                    <BtnAddAnnouncement />
                </Col>
            </Row>

        </Container>

    );
};

export default ManageAnnouncement;


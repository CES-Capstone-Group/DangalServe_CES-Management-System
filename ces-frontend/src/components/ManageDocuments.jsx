import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Row, Col, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faChevronLeft, faEye } from "@fortawesome/free-solid-svg-icons";
import "./table.css";
import BtnEditDeleteAchievement from "./Buttons/Admin/BtnEditDeleteAchievement";
import BtnAddAchievement from "./Buttons/Admin/BtnAddAchievement";
import samplepdf from "../assets/samplepdf.pdf"
import sampledocx from "../assets/sampledocx.docx"
import BtnAddDocument from "./Buttons/Manage/BtnAddDocument";

const ManageDocuments = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);
    const [contentType, setContentType] = useState("");
    const [documents, setDocuments] = useState([]);  // <-- Store achievements data
    const navigate = useNavigate();

    // Fetch Achievements from Backend

    // const fetchDocuments = async () => {
    //     try {
    //         const response = await fetch("http://127.0.0.1:8000/api/documents/");  // Adjust your backend URL
    //         if (!response.ok) throw new Error("Failed to fetch achievements.");
    //         const data = await response.json();
    //         setDocuments(data);  // Update state with fetched data
    //     } catch (error) {
    //         console.error("Error fetching achievements:", error);
    //     }
    // };

    const array = [
        {document_id: '1', document_title: 'samplepdf', document_file: samplepdf },
        {document_id: '2', document_title: 'samplepdf', document_file: samplepdf },
        {document_id: '3', document_title: 'sampledocx', document_file: sampledocx },
    ]; 

    // Fetch achievements on component mount

     useEffect(() => {
        setDocuments(array);
     }, []);

    // useEffect(() => {
    //     fetchDocuments();  // Initial data load
    // }, []);

    // Handle content view modal
    const handleContentClick = (contentUrl) => {
        if (contentUrl.endsWith(".pdf")) {
            setContentType("pdf");
            setSelectedContent(contentUrl);
            setShowModal(true);
        } else if (contentUrl.endsWith(".docx")) {
            // Automatically trigger download for .docx files
            const link = document.createElement("a");
            link.href = contentUrl;
            link.download = contentUrl.split('/').pop(); // Use the file name from the URL
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            setContentType("image");
            setSelectedContent(contentUrl);
            setShowModal(true);
        }
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

    // Handle Achievement Update
    // const handleDocumentUpdated = () => {
    //     fetchDocuments();  // Refresh the table data after an update
    // };

    // Table row component
    const Rows = (props) => {
        const { document_id, document_title, document_file } = props;
        return (
            <tr>
                <td>{document_id}</td>
                <td>{document_title}</td>
                <td>
                    <a className="text-success" href={document_file} target="_blank" rel="noopener noreferrer">
                        View Document
                    </a>
                </td>
                <td>
                    <Button variant="success link" onClick={() => handleContentClick(document_file)}>
                        <FontAwesomeIcon icon={faEye} />
                    </Button>
                </td>
                {/* Pass required props to child component for edit/delete functionality */}
                {/* <td>
                    <BtnEditDeleteAchievement
                        achievement={achievement}
                        onAchievementUpdated={handleAchievementUpdated}  // Callback to refresh the table
                    />
                </td> */}
            </tr>
        );  
    };

    // Table component
    const NewTable = ({ data }) => {
        return (
            <Table responsive bordered striped hover className="tableStyle">
                <thead>
                    <tr>
                        <th>Document ID</th>
                        <th>Document Title</th>
                        <th>Document File</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((document) => (
                        <Rows   
                            key={document.document_id} 
                            document_id={document.document_id}
                            document_title={document.document_title} 
                            document_file={document.document_file}
                        />  // Pass each documents as a prop
                    ))}
                </tbody>
            </Table>
        );
    };

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
                        {selectedContent && contentType === "pdf" && (
                            <embed src={selectedContent} type="application/pdf" width="100%" height="900px" />
                        )}
                        {selectedContent && contentType === "docx" && (
                            <a href={selectedContent} download>
                                Click here to download the document
                            </a>
                        )}
                        {/* Handle image content if necessary */}
                    </Modal.Body>
                </Modal>
            </Row>

            {/* Render the achievements table */}
            <NewTable data={documents} />

            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    {/* Add Document Button */}
                    <BtnAddDocument  />  {/* <-- Call the refresh function on add */}
                </Col>
            </Row>
        </Container>
    );
};

export default ManageDocuments;

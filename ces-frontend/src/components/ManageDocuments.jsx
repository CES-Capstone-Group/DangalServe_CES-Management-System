import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Row, Col, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faChevronLeft, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import BtnAddDocument from "./Buttons/Manage/BtnAddDocument";

const ManageDocuments = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);
    const [contentType, setContentType] = useState("");
    const [documents, setDocuments] = useState([]);  // <-- Store documents data
    const navigate = useNavigate();

    // Fetch documents from the backend
    const fetchDocuments = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/documents/");  // Adjust your backend URL
            if (!response.ok) throw new Error("Failed to fetch documents.");
            const data = await response.json();
            setDocuments(data);  // Update state with fetched data
        } catch (error) {
            console.error("Error fetching documents:", error);
        }
    };

    // Fetch documents on component mount
    useEffect(() => {
        fetchDocuments();  // Initial data load
    }, []);

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

    // Handle Document Deletion
    const handleDeleteDocument = async (documentId) => {
        if (!window.confirm("Are you sure you want to delete this document?")) {
            return;
        }
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/documents/delete/${documentId}/`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchDocuments();  // Refresh the table data after deletion
            } else {
                throw new Error('Failed to delete document.');
            }
        } catch (error) {
            console.error("Error deleting document:", error);
        }
    };

    // Table row component
    const Rows = (props) => {
        const { id, title, file } = props;
        return (
            <tr>
                <td>{id}</td>
                <td>{title}</td>
                <td>
                    <Button variant="success link" onClick={() => handleContentClick(file)}> View Document 
                            {/* <FontAwesomeIcon icon={faEye} /> */}
                    </Button>
                </td>
                <td>
                    
                    <Button variant="danger link" onClick={() => handleDeleteDocument(id)}>
                        <FontAwesomeIcon icon={faTrash} />
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
                        <th>Document ID</th>
                        <th>Document Title</th>
                        <th>Document File</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((document) => (
                        <Rows   
                            key={document.id} 
                            id={document.id}
                            title={document.title} 
                            file={document.file}
                        />  // Pass each document as a prop
                    ))}
                </tbody>
            </Table>
        );
    };

    return (
        <Container fluid 
        className="py-4 mt-5  d-flex flex-column justify-content-center me-0 ms-0">
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
                <Col><h1>Document Management</h1></Col>
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

            {/* Render the documents table */}
            <NewTable data={documents} className="tableStyle"/>

            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    {/* Add Document Button */}
                    <BtnAddDocument onDocumentAdded={fetchDocuments}  />  {/* <-- Call the refresh function on add */}
                </Col>
            </Row>

            {/* Modal for viewing PDF content */}
            <Modal size="lg" show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body className="text-center">
                    {selectedContent && contentType === "pdf" && (
                        <embed src={selectedContent} type="application/pdf" width="100%" height="900px" />
                    )}
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default ManageDocuments;

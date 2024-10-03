import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Row, Col, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFilter, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import BtnAddBrgy from "../Buttons/Manage/BtnAddBrgy";
import "../table.css"
import sampleimg from "../../assets/sampleimg.png";
import samplepdf from "../../assets/samplepdf.pdf"
import BtnEditDelete from "../Buttons/Manage/BtnEditDelete";

const BrgyManagement = () => {
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
    // const fetchUsers = async () => {
    //     try {
    //         const response = await fetch('http://127.0.0.1:8000/api/users/');
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    //         const data = await response.json();
    //         setUsers(data);  // Update the state with the fetched users
    //     } catch (error) {
    //         console.error("Failed to fetch users:", error);
    //     }
    // };

    // useEffect(() => {
    //     fetchUsers(); 
    // }, []);

    // const handleAccountAdded = () => {
    //     fetchUsers();  
    // };

    const array = [{ brgy_id: '1', brgyName: 'Bigaa', moa: sampleimg },
    { brgy_id: '2', brgyName: 'Diezmo', moa: samplepdf }];

    const Rows = (props) => {
        const { brgy_id, brgyName, moa } = props;

        return (
            <tr>
                <td>{brgy_id}</td>
                <td>{brgyName}</td>
                <td>
                    <Button variant="success link" onClick={() => handleContentClick(moa)}>
                        <FontAwesomeIcon icon={faEye} />
                    </Button>
                </td>
                <td><BtnEditDelete /></td>
            </tr>
        );
    };

    const NewTable = ({ data, /*fetchUsers*/ }) => {
        return (
            <Table responsive striped bordered hover className="tableStyle">
                <thead>
                    <th>Barangay ID</th>
                    <th>Barangay Name</th>
                    <th>MOA</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <Rows
                            key={row.brgy_id}  // Use a unique ID, like accountID
                            brgy_id={row.brgy_id}
                            brgyName={row.brgyName}
                            moa={row.moa}
                        //fetchUsers={fetchUsers}
                        />
                    ))}
                </tbody>
            </Table>
        );
    };

    return (
        <Container fluid className="fs-5">
            <Row>

                <Button variant="link" onClick={handleBack} className="d-flex align-items-center text-success me-3">
                    <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                </Button>

                <Col className="d-flex justify-content-end">
                    <Button style={{ backgroundColor: '#71A872', border: '0px' }}>
                        <FontAwesomeIcon className='me-2' icon={faFilter}></FontAwesomeIcon>
                        Filter
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col><h1>Barangay Management</h1></Col>
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

            {/* Render the table with the latest data */}
            <NewTable data={array} />

            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <BtnAddBrgy />
                </Col>
            </Row>
        </Container>
    );
};

export default BrgyManagement;
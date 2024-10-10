import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Row, Col, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFilter, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import BtnAddBrgy from "../Buttons/Manage/BtnAddBrgy";
import "../table.css";
import BtnEditDelete from "../Buttons/Manage/BtnEditDelete";  // <-- Import BtnEditDelete

const BrgyManagement = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);
    const [contentType, setContentType] = useState("");

    // State to hold the barangay data fetched from the backend
    const [barangays, setBarangays] = useState([]);

    // Function to fetch barangay data from the backend
    const fetchBarangays = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/barangays/');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setBarangays(data);  // Set the fetched data into state
        } catch (error) {
            console.error("Failed to fetch barangays:", error);
        }
    };

    // Fetch barangay data when the component mounts
    useEffect(() => {
        fetchBarangays();  // Initial data load
    }, []);

    // Handle file view logic
    const handleContentClick = (contentUrl) => {
        if (contentUrl.endsWith(".pdf")) {
            setContentType("pdf");
        } else {
            setContentType("image");
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
        navigate(-1);
    };

    // Updated `Rows` component to pass all required props to `BtnEditDelete`
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
                {/* Pass `brgy_id` and `brgyName` to `BtnEditDelete` */}
                <td><BtnEditDelete brgyId={brgy_id} brgyName={brgyName} onBrgyUpdated={fetchBarangays} /></td> {/* <-- Pass `brgyName` as a prop */}
            </tr>
        );
    };

    const NewTable = ({ data }) => {
        return (
            <Table responsive striped bordered hover className="tableStyle">
                <thead>
                    <tr>
                        <th>Barangay ID</th>
                        <th>Barangay Name</th>
                        <th>MOA</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <Rows
                            key={row.id}
                            brgy_id={row.id}
                            brgyName={row.brgy_name}  // <-- Pass `brgy_name` to the child component
                            moa={row.moa}
                        />
                    ))}
                </tbody>
            </Table>
        );
    };

    return (
        <Container fluid 
        style={{width: '100rem'}} 
        className="vh-100 d-flex flex-column justify-content-center me-0 ms-0">
            <Row>
                <Button variant="link" onClick={handleBack} className="backBtn d-flex align-items-center text-success me-3">
                    <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                    <span className="ms-2">Back</span>
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

            {/* Render the table with the fetched data */}
            <NewTable data={barangays} />

            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    {/* Pass `fetchBarangays` as `onBrgyAdded` prop */}
                    <BtnAddBrgy onBrgyAdded={fetchBarangays} />  {/* <-- Pass `fetchBarangays` as a prop */}
                </Col>
            </Row>
        </Container>
    );
};

export default BrgyManagement;

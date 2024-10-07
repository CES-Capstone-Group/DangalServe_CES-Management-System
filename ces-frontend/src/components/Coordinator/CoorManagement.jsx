import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Row, Col, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import BtnAddCoor from "../Buttons/Manage/BtnAddCoor";
import "../table.css"
import BtnEditDelete from "../Buttons/Manage/BtnEditDelete";

const CoorManagement = () => {
    const navigate = useNavigate();

    // Go back to the previous page
    const handleBack = () => {
        navigate(-1); // This will navigate to the previous page in the history
    };

    // const [showImageModal, setShowImageModal] = useState(false);
    // const [selectedImage, setSelectedImage] = useState(null); // State for viewing images

    // const handleImageClick = (imageUrl) => {
    //     setSelectedImage(imageUrl);
    //     setShowImageModal(true);
    // };

    // const handleCloseModal = () => {
    //     setShowImageModal(false);
    //     setSelectedImage(null);
    // };
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

    const array = [{ coor_id: '1', coorName: 'CCS' },
    { coor_id: '2', coorName: 'CBAA' }];

    const Rows = (props) => {
        const { coor_id, coorName } = props;

        return (
            <tr>
                <td>{coor_id}</td>
                <td>{coorName}</td>
                <td><BtnEditDelete /></td>
            </tr>
        );
    };

    const NewTable = ({ data, /*fetchUsers*/ }) => {
        return (
            <Table responsive striped bordered hover className="tableStyle">
                <thead>
                    <th>Coordinator ID</th>
                    <th>Coordinator Name</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <Rows
                            key={row.coor_id}  // Use a unique ID, like accountID
                            coor_id={row.coor_id}
                            coorName={row.coorName}
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
                <Col><h1>Department Management</h1></Col>
            </Row>
            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <input type="search" className="form-control" placeholder='Search' style={{ width: '300px' }} />
                </Col>
            </Row>

            {/* Render the table with the latest data */}
            <NewTable data={array} />

            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <BtnAddCoor />
                </Col>
            </Row>
        </Container>
    );
};

export default CoorManagement;
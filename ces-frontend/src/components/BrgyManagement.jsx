import React, { useState, useEffect } from "react";
import { Container, Table, Button, Row, Col, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import BtnAddBrgy from "./Buttons/BtnAddBrgy";
import "./table.css"
import sampledocs from "../assets/sampledocs.png"; 
import BtnEditDelete from "./Buttons/BtnEditDelete";

const BrgyManagement = () => {
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null); // State for viewing images

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setShowImageModal(true);
    };

    const handleCloseModal = () => {
        setShowImageModal(false);
        setSelectedImage(null);
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
    
    const array = [{brgy_id:'1', brgyName:'Bigaa' , moa: sampledocs },
                   {brgy_id:'2', brgyName:'Diezmo' , moa: sampledocs}];
    
    const Rows = (props) => {
        const {brgy_id, brgyName, moa} = props;
        
        return (
            <tr>
                <td>{brgy_id}</td>
                <td>{brgyName}</td>
                <td>
                    {moa ? <img src={moa} alt="MOA Logo" onClick = {() => handleImageClick(moa)} style={{ width: '50px', height: '100px' }} /> : "No MOA"}
                </td>
                <td><BtnEditDelete/></td>
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
                <Col className="d-flex justify-content-end">
                    <Button style={{ backgroundColor: '#71A872', border: '0px' }}>
                        <FontAwesomeIcon className='me-2' icon={faFilter}></FontAwesomeIcon>
                        Filter
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col><h1>ACCOUNT MANAGEMENT</h1></Col>
            </Row>
            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <input type="search" className="form-control" placeholder='Search' style={{ width: '300px' }} />
                </Col>
                {/* Modal for viewing full image */}
                <Modal size="lg" show={showImageModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body className="text-center">
                        {selectedImage && (
                            <img src={selectedImage} alt="Full Size" style={{width:"100%"}} />
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
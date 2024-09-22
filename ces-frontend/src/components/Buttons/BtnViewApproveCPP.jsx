import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Col, Row } from "react-bootstrap";
import {jwtDecode} from "jwt-decode";  // Import jwt-decode

const BtnViewApproveCPP = ({ proposal, onApprove }) => {
    const [show, setShow] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    // Check if the user is an admin by decoding the JWT token
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            const decodedToken = jwtDecode(token);
            // Assuming the token has `is_staff` or `accountType` field
            const isAdmin = decodedToken.is_staff || decodedToken.accountType === "Admin";  // Adjust according to the structure of your token
            setIsAdmin(isAdmin);
        }
    }, []);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    // Function to handle approval of the proposal
    const handleApprove = async () => {
        const token = localStorage.getItem("access_token"); // Get access token
    
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/proposals/${proposal.proposal_id}/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: "Approved" }), // Update status to "Approved"
            });
    
            if (response.ok) {
                console.log("Proposal approved successfully");
                if (onApprove) onApprove(); // Trigger parent update on approve
                handleClose(); // Close modal after approval
            } else {
                console.error("Failed to approve the proposal");
            }
        } catch (error) {
            console.error("Error approving the proposal:", error);
        }
    };

    return (
        <>
            <Button
                className="me-3"
                onClick={handleShow}
                style={{ backgroundColor: "#71A872", border: "0px", color: "white" }}
            >
                View
            </Button>
            {isAdmin && (
                <Button
                    onClick={handleApprove}
                    style={{ backgroundColor: "#71A872", border: "0px", color: "white" }}
                >
                    Approve
                </Button>
            )}

            {/* Modal for viewing proposal details */}
            <Modal backdrop="static" centered size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Proposal Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>
                                Proposal Title
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control readOnly type="text" value={proposal.title} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>
                                Location
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control readOnly type="text" value={proposal.location} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>
                                Target Date
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    readOnly
                                    type="text"
                                    value={new Date(proposal.target_date).toLocaleDateString()} // Format the date
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>
                                Status
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control readOnly type="text" value={proposal.status} />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BtnViewApproveCPP;

import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Col, Row } from "react-bootstrap";
import {jwtDecode} from "jwt-decode"; // Assuming jwtDecode is available

const  BtnViewApproveAPA = ({ proposal }) => {
    const [show, setShow] = useState(false);
    const [userBarangay, setUserBarangay] = useState("");  // To store user's barangay
    const [isApproved, setIsApproved] = useState(false);   // To track if barangay has already approved
    const [remarks, setRemarks] = useState("");  // To store remarks

    // Fetch user barangay (assuming it's stored in JWT or from API)
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            const decodedToken = jwtDecode(token);  // Assuming you have jwtDecode function
            setUserBarangay(decodedToken.department || "");  // Replace department with the correct claim
        }
    }, []);

    // Check if the user's barangay has already approved the proposal
    useEffect(() => {
        if (proposal.barangay_approvals && proposal.barangay_approvals.some(approval => approval.barangay_name === userBarangay && approval.status === 'Approved')) {
            setIsApproved(true);
        }
    }, [proposal, userBarangay]);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleApprove = async () => {
        if (!userBarangay) {
            alert("Your barangay is not recognized.");
            return;
        }

        try {
            const token = localStorage.getItem("access_token");

            const response = await fetch(
                `http://127.0.0.1:8000/api/proposals/${proposal.proposal_id}/approve/`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        status: "Approved",  // Approve the proposal
                        barangay: userBarangay,
                        remarks: remarks,
                    }),
                }
            );

            if (response.ok) {
                alert("Proposal approved successfully.");
                setIsApproved(true);  // Disable the button after approval
            } else {
                const data = await response.json();
                console.error("Failed to approve the proposal", data);
            }
        } catch (error) {
            console.error("Error approving the proposal:", error);
        }
    };

    return (
        <>
            <Button
                className="mt-2 mb-2 ms-3 me-5 ps-3 pe-3"
                onClick={handleShow}
                style={{
                    backgroundColor: "#71A872",
                    margin: "0px",
                    border: "0px",
                    color: "white",
                }}
            >
                View
            </Button>

            <Button
                className="mt-2 mb-2"
                style={{
                    backgroundColor: isApproved ? "#ccc" : "#71A872",
                    margin: "0px",
                    border: "0px",
                    color: "white",
                }}
                onClick={handleApprove}
                disabled={isApproved} // Disable if already approved
            >
                {isApproved ? "Already Approved" : "Approve"}
            </Button>

            <Modal backdrop="static" centered size="lg" show={show} onHide={handleClose} className="p-6">
                <Modal.Header closeButton>
                    <Button onClick={handleClose} className="me-5 mb-5 p-0 ps-2 pe-2" variant="success">
                        Back
                    </Button>
                    <Modal.Title>Proposal Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Proposal Title</Form.Label>
                            <Col sm={8}>
                                <Form.Control readOnly type="text" value={proposal.title}/> 
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Lead Proponent</Form.Label>
                            <Col sm={8}>
                                <Form.Control readOnly type="text" value={proposal.lead_proponent}/>  
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Department</Form.Label>
                            <Col sm={8}>
                                <Form.Control readOnly type="text" value={proposal.department}/>  
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={4}>Remarks</Form.Label>
                            <Col sm={8}>
                                <Form.Control as="textarea" rows={3} value={remarks} onChange={e => setRemarks(e.target.value)} placeholder="Add any remarks (optional)" />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BtnViewApproveAPA;

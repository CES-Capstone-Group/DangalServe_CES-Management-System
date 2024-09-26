import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Col, Row } from "react-bootstrap";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import ProposalPB from "../ProposalPB";

const BtnViewApproveCPP = ({ proposal, onApprove }) => {
  const [show, setShow] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [rejectShow, setRejectShow] = useState(false);
  const handleRejectShow = () => setRejectShow(true);
  const handleRejectClose = () => setRejectShow(false);

  const [dirProgress, setDirProgress] = useState(0);
  const [vpreProgress, setVpreProgress] = useState(0);
  const [preProgress, setPreProgress] = useState(0);

  const [dirApproved, setDirApprove] = useState(false);
  const [vpreApproved, setVpreApprove] = useState(false);
  const [preApproved, setPreApprove] = useState(false);
  const [buttonText, setButtonText] = useState("Approve");

  // Check if the user is an admin by decoding the JWT token
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const isAdmin =
        decodedToken.is_staff || decodedToken.accountType === "Admin";
      setIsAdmin(isAdmin);
    }
  }, []);

  // Initialize the progress bars and button text based on the current proposal status
  useEffect(() => {
    switch (proposal.status) {
      case "Approved by Director":
        setDirApprove(true);
        setDirProgress(100);
        setButtonText("VPRE Approve");
        break;
      case "Approved by VPRE":
        setDirApprove(true);
        setDirProgress(100);
        setVpreApprove(true);
        setVpreProgress(100);
        setButtonText("President Approve");
        break;
      case "Approved by President":
        setDirApprove(true);
        setDirProgress(100);
        setVpreApprove(true);
        setVpreProgress(100);
        setPreApprove(true);
        setPreProgress(100);
        setButtonText("Approval Complete");
        break;
      default:
        setButtonText("Approve");
        break;
    }
  }, [proposal.status]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleApprove = async () => {
    try {
      if (!dirApproved) {
        approval("Approved by Director");
      } else if (dirApproved && !vpreApproved) {
        approval("Approved by VPRE");
      } else if (dirApproved && vpreApproved && !preApproved) {
        approval("Approved by President");
      }
    } catch (error) {
      console.error("Error approving the proposal:", error);
    }
  };

  const approval = async (status) => {
    const token = localStorage.getItem("access_token"); // Get access token
    const response = await fetch(
      `http://127.0.0.1:8000/api/proposals/${proposal.proposal_id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }), // Update status
      }
    );
    if (response.ok) {
      console.log("Proposal approved successfully");

      if (status === "Approved by Director") {
        setDirApprove(true);
        setDirProgress(100);
        setButtonText("VPRE Approve");
      } else if (status === "Approved by VPRE") {
        setVpreApprove(true);
        setVpreProgress(100);
        setButtonText("President Approve");
      } else if (status === "Approved by President") {
        setPreApprove(true);
        setPreProgress(100);
        setButtonText("Approval Complete");
      }

      if (onApprove) onApprove(); // Trigger parent update on approve
      handleClose(); // Close modal after approval
    } else {
      console.error("Failed to approve the proposal");
    }
  };

  return (
    <>
      <Button
        className="me-2"
        onClick={handleShow}
        style={{ backgroundColor: "#71A872", border: "0px", color: "white" }}
      >
        View
      </Button>

      {/* Hide approval and rejection buttons after President's approval */}
      {isAdmin && !preApproved && (
        <>
          <Button
            className="me-2"
            onClick={handleApprove}
            style={{ backgroundColor: "#71A872", border: "0px", color: "white" }}
          >
            {buttonText}
          </Button>
          <Button
            className="btn btn-danger"
            onClick={handleRejectShow}
            style={{ border: "0px", color: "white" }}
          >
            Reject
          </Button>
        </>
      )}

      {/* Modal for Reject and Remarks */}
      <Modal
        backdrop="static"
        centered
        size="lg"
        show={rejectShow}
        onHide={handleRejectClose}
      >
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
                Remarks
              </Form.Label>
              <Col sm={8}>
                <Form.Control as="textarea" />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" onClick={handleRejectClose}>
            Confirm
          </Button>
          <Button variant="success" onClick={handleRejectClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for viewing proposal details */}
      <Modal
        backdrop="static"
        centered
        size="lg"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Proposal Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProposalPB
            dirApprove={dirProgress}
            vpreApproved={vpreProgress}
            preApproved={preProgress}
            brgyApproved={0}
          />

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

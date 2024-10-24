import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Col, Row } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import ProposalPB from "../ProposalPB";
// import Proposal from "../ProposalPB";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import ButtonDownloadProposal from "./BtnDownloadProposal";

const BtnViewApproveProposal = ({ proposal, onApprove }) => {
  const [show, setShow] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [rejectShow, setRejectShow] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const handleRejectShow = () => setRejectShow(true);
  const handleRejectClose = () => setRejectShow(false);

  const [dirProgress, setDirProgress] = useState(0);
  const [vpreProgress, setVpreProgress] = useState(0);
  const [preProgress, setPreProgress] = useState(0);

  const [dirApproved, setDirApprove] = useState(false);
  const [vpreApproved, setVpreApprove] = useState(false);
  const [preApproved, setPreApprove] = useState(false);
  const [buttonText, setButtonText] = useState("Approve");

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();
  const handleResubmit = async () => {
    navigate(`/coor/proposal-form/${proposal.proposal_id}/resubmit`);
    // try {
    //   const token = localStorage.getItem("access_token");
    //   const response = await fetch(
    //     `http://127.0.0.1:8000/api/proposals/${proposal.proposal_id}/resubmit/`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //       },
    //       body: JSON.stringify({ status: "Resubmitted" }),
    //     }
    //   );
    //   if (response.ok) {
    //     console.log("Proposal resubmitted successfully");
    //     if (onApprove) onApprove();
    //     handleClose();
    //   } else {
    //     console.error("Failed to resubmit the proposal");
    //   }
    // } catch (error) {
    //   console.error("Error resubmitting the proposal:", error);
    // }
  };

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
    const token = localStorage.getItem("access_token");
    const response = await fetch(
      `http://127.0.0.1:8000/api/proposals/${proposal.proposal_id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );
    if (response.ok) {
      // console.log("Proposal approved successfully");

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

      if (onApprove) onApprove();
      handleClose();
    } else {
      console.error("Failed to approve the proposal");
    }
  };

  const handleReject = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        `http://127.0.0.1:8000/api/proposals/${proposal.proposal_id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "Rejected" }),
        }
      );
      if (response.ok) {
        // console.log("Proposal rejected successfully");
        handleRejectClose();
        if (onApprove) onApprove();
      } else {
        console.error("Failed to reject the proposal");
      }
    } catch (error) {
      console.error("Error rejecting the proposal:", error);
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

      {isAdmin &&
        !preApproved &&
        proposal.status !== "Partly Approved by Barangay" &&
        proposal.status !== "Rejected" && (
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
      {!isAdmin && proposal.status === "Rejected" && (
        <Button
          onClick={handleResubmit}
          style={{ backgroundColor: "#007bff", border: "0px", color: "white" }}
        >
          Resubmit
        </Button>
      )}

      {/* Modal for Reject and Remarks */}
      <Modal
        backdrop="static"
        centered
        size="xl"
        show={rejectShow}
        onHide={handleRejectClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reject Proposal</Modal.Title>
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
                Reason for Rejection
              </Form.Label>
              <Col sm={8}>
                <Form.Select
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                >
                  <option value="">Select Reason</option>
                  <option value="Rejected">Rejected by Director</option>
                  <option value="Rejected by VPRE">Rejected by VPRE</option>
                  <option value="Rejected by President">Rejected by President</option>
                </Form.Select>
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
          <Button variant="danger" onClick={handleReject}>
            Confirm Rejection
          </Button>
          
        

          <Button variant="secondary" onClick={handleRejectClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for viewing proposal details */}
      <Modal backdrop="static" centered size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Proposal Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProposalPB status={proposal.status} />

          <Form>
            {/* Proposal Title */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>
                Proposal Title
              </Form.Label>
              <Col sm={8}>
                <Form.Control readOnly type="text" value={proposal.title} />
              </Col>
            </Form.Group>

            {/* Location */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>
                Location
              </Form.Label>
              <Col sm={8}>
                <Form.Control readOnly type="text" value={proposal.location || "N/A"} />
              </Col>
            </Form.Group>

            {/* Target Date */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>
                Target Date
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  readOnly
                  type="text"
                  value={new Date(proposal.target_date).toLocaleDateString() || "N/A"}
                />
              </Col>
            </Form.Group>

            {/* Status */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Status</Form.Label>
              <Col sm={8}>
                <Form.Control readOnly type="text" value={proposal.status || "N/A"} />
              </Col>
            </Form.Group>

            {/* Lead Proponent */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Lead Proponent</Form.Label>
              <Col sm={8}>
                <Form.Control readOnly type="text" value={proposal.lead_proponent || "N/A"} />
              </Col>
            </Form.Group>

            {/* Contact Details */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Contact Details</Form.Label>
              <Col sm={8}>
                <Form.Control readOnly type="text" value={proposal.contact_details || "N/A"} />
              </Col>
            </Form.Group>

            {/* Department */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Department</Form.Label>
              <Col sm={8}>
                <Form.Control readOnly type="text" value={proposal.department || "N/A"} />
              </Col>
            </Form.Group>

            {/* Project Description */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Project Description</Form.Label>
              <Col sm={8}>
                <Form.Control as="textarea" rows={3} readOnly value={proposal.project_description || "N/A"} />
              </Col>
            </Form.Group>

            {/* Partner Community */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Partner Community</Form.Label>
              <Col sm={8}>
                <Form.Control readOnly type="text" value={proposal.partner_community || "N/A"} />
              </Col>
            </Form.Group>

            {/* Government Organization */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Government Organization</Form.Label>
              <Col sm={8}>
                <Form.Control readOnly type="text" value={proposal.government_org || "N/A"} />
              </Col>
            </Form.Group>

            {/* Non-Government Organization */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Non-Government Organization</Form.Label>
              <Col sm={8}>
                <Form.Control readOnly type="text" value={proposal.non_government_org || "N/A"} />
              </Col>
            </Form.Group>

            {/* Success Indicators */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Success Indicators</Form.Label>
              <Col sm={8}>
                <Form.Control as="textarea" rows={3} readOnly value={proposal.success_indicators || "N/A"} />
              </Col>
            </Form.Group>

            {/* Identified Needs */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Identified Needs</Form.Label>
              <Col sm={8}>
                {proposal.identified_needs_file ? (
                  <a href={proposal.identified_needs_file} target="_blank" rel="noopener noreferrer">
                    View File
                  </a>
                ) : (
                  <Form.Control readOnly type="text" value={proposal.identified_needs_text || "N/A"} />
                )}
              </Col>
          </Form.Group>

            {/* General Objectives */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>General Objectives</Form.Label>
              <Col sm={8}>
                <Form.Control as="textarea" rows={3} readOnly value={proposal.general_objectives || "N/A"} />
              </Col>
            </Form.Group>

            {/* Specific Objectives */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Specific Objectives</Form.Label>
              <Col sm={8}>
                <Form.Control as="textarea" rows={3} readOnly value={proposal.specific_objectives || "N/A"} />
              </Col>
            </Form.Group>

            {/* Cooperating Agencies */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Cooperating Agencies</Form.Label>
              <Col sm={8}>
                <Form.Control readOnly type="text" value={proposal.cooperating_agencies || "N/A"} />
              </Col>
            </Form.Group>

            {/* Monitoring Mechanics */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Monitoring Mechanics</Form.Label>
              <Col sm={8}>
                <Form.Control as="textarea" rows={3} readOnly value={proposal.monitoring_mechanics || "N/A"} />
              </Col>
            </Form.Group>

            {/* Evaluation Mechanics */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Evaluation Mechanics</Form.Label>
              <Col sm={8}>
                <Form.Control as="textarea" rows={3} readOnly value={proposal.evaluation_mechanics || "N/A"} />
              </Col>
            </Form.Group>

            {/* Timetable */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Timetable</Form.Label>
              <Col sm={8}>
                <Form.Control as="textarea" rows={3} readOnly value={proposal.timetable || "N/A"} />
              </Col>
            </Form.Group>

            {/* Risk Assessment */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Risk Assessment</Form.Label>
              <Col sm={8}>
                <Form.Control as="textarea" rows={3} readOnly value={proposal.risk_assessment || "N/A"} />
              </Col>
            </Form.Group>

            {/* Action Plans */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Action Plans to Address Risks</Form.Label>
              <Col sm={8}>
                <Form.Control as="textarea" rows={3} readOnly value={proposal.action_plans || "N/A"} />
              </Col>
            </Form.Group>

            {/* Sustainability Approaches */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Sustainability Approaches</Form.Label>
              <Col sm={8}>
                <Form.Control as="textarea" rows={3} readOnly value={proposal.sustainability_approaches || "N/A"} />
              </Col>
            </Form.Group>

            {/* Budget Requirement */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Budget Requirement</Form.Label>
              <Col sm={8}>
                {proposal.budget_requirement_file ? (
                  <a href={proposal.budget_requirement_file} target="_blank" rel="noopener noreferrer">
                    View File
                  </a>
                ) : (
                  <Form.Control readOnly type="text" value={proposal.budget_requirement_text || "N/A"} />
                )}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Status</Form.Label>
              <Col sm={8}>
                <Form.Control readOnly type="text" value={proposal.status} />
              </Col>
            </Form.Group>                          
          </Form>
        </Modal.Body>

        
        <Modal.Footer>
        <ButtonDownloadProposal proposal={proposal}></ButtonDownloadProposal>
          <Button variant="success" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BtnViewApproveProposal;

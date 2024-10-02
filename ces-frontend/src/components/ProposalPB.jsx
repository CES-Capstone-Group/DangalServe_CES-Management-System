import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, ProgressBar, Row } from "react-bootstrap";
import { faCheckCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

const ProposalPB = ({ status }) => {
    // Helper functions to determine progress based on the status
    const isDirectorApproved = status === 'Approved by Director' || status === 'Approved by VPRE' || status === 'Approved by President' || status === 'Approved by Barangay' || status === 'Partly Approved by Barangay';
    const isVPREApproved = status === 'Approved by VPRE' || status === 'Approved by President' || status === 'Approved by Barangay' || status === 'Partly Approved by Barangay';
    const isPresidentApproved = status === 'Approved by President' || status === 'Approved by Barangay' || status === 'Partly Approved by Barangay';
    const isPartlyBrgyApproved = status === 'Partly Approved by Barangay'; // Handles partly approved status
    const isBarangayApproved = status === 'Approved by Barangay'; // Handles fully approved status

    return (
        <Container fluid className=" justify-content-center align-items-center">
            <Row>
                <Col className="mb-3 ">
                    <h6 className="h6"> Signed By Director</h6>
                </Col>
                <Col className="mb-3">
                    <h6 className="h6"> Signed By VPRE</h6>
                </Col>
                <Col className="mb-3">
                    <h6 className="h6"> Signed By President</h6>
                </Col>
                <Col className="mb-3">
                    <h6 className="h6"> Signed By Barangay</h6>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    {/* Director's Approval */}
                    <ProgressBar variant={isDirectorApproved ? "success" : "danger"} now={isDirectorApproved ? 100 : 0} style={{ height: '1px' }} />
                </Col>

                <Col xs="auto" className="d-flex justify-content-center align-items-center">
                    <FontAwesomeIcon icon={isDirectorApproved ? faCheckCircle : faXmarkCircle} size="3x" />
                </Col>

                <Col>
                    {/* VPRE's Approval */}
                    <ProgressBar variant={isVPREApproved ? "success" : "danger"} now={isVPREApproved ? 100 : 0} style={{ height: '1px' }} />
                </Col>

                <Col xs="auto" className="d-flex justify-content-center align-items-center">
                    <FontAwesomeIcon icon={isVPREApproved ? faCheckCircle : faXmarkCircle} size="3x" />
                </Col>

                <Col>
                    {/* President's Approval */}
                    <ProgressBar variant={isPresidentApproved ? "success" : "danger"} now={isPresidentApproved ? 100 : 0} style={{ height: '1px' }} />
                </Col>

                <Col xs="auto" className="d-flex justify-content-center align-items-center">
                    <FontAwesomeIcon icon={isPresidentApproved ? faCheckCircle : faXmarkCircle} size="3x" />
                </Col>

                <Col>
                    {/* Barangay's Approval */}
                    <ProgressBar 
                        variant={isBarangayApproved ? "success" : isPartlyBrgyApproved ? "warning" : "danger"} 
                        now={isBarangayApproved || isPartlyBrgyApproved ? 50 : 0} 
                        style={{ height: '1px' }} 
                    />
                </Col>

                <Col xs="auto" className="d-flex justify-content-center align-items-center">
                    <FontAwesomeIcon icon={isBarangayApproved || isPartlyBrgyApproved ? faXmarkCircle : faCheckCircle} size="3x" />
                </Col>
            </Row>
        </Container>
    );
};

export default ProposalPB;

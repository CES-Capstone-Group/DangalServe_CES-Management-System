import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, ProgressBar, Row } from "react-bootstrap";
import { faCheckCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

const ProposalPB = ({dirApprove, vpreApproved, preApproved, brgyApproved}) => {
    return(
        <Container fluid className=" justify-content-center align-items-center">
            <Row>
                <Col className="mb-3 ">
                    <h6 className="h6"> Signed By Director</h6>
                </Col>
                <Col className="mb-3">
                    <h6 className="h6"> Signed By VPRE</h6>
                </Col>
                <Col className="mb-3">
                    <h6 className="h6"> Signed By PRE</h6>
                </Col>
                <Col className="mb-3">
                    <h6 className="h6"> Signed By Barangay</h6>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <ProgressBar variant="success" now={100} style={{height: '1px'}}/>
                </Col>

                {/* Adding the FontAwesome Icon between the Progress Bars */}
                <Col xs="auto" className="d-flex justify-content-centter align-items-center">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-success" size="1x" />
                </Col>

                <Col>
                    <ProgressBar variant="success" now={100} style={{height: '1px'}} />
                </Col>

                <Col xs="auto" className="d-flex justify-content-centter align-items-center">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-success" size="1x" />
                </Col>

                <Col>
                    <ProgressBar variant="danger" now={100} style={{height: '1px'}}/>
                </Col>

                <Col xs="auto" className="d-flex justify-content-centter align-items-center">
                    <FontAwesomeIcon icon={faXmarkCircle} className="text-danger" size="1x" />
                </Col>

                <Col >
                    <ProgressBar variant="danger" now={100} style={{height: '1px'}}/>
                </Col>

                <Col xs="auto" className="d-flex justify-content-centter align-items-center">
                    <FontAwesomeIcon icon={faXmarkCircle} className="text-danger" size="1x" />
                </Col>
            </Row>
            
        </Container>

    );
};

export default ProposalPB;
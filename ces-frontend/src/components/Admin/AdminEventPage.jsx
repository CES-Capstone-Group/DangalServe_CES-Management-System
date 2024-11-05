import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams, useNavigate, useLocation } from "react-router-dom";


const AdminEventPage = () =>{
    const { proposalId } = useParams();
    const [proposalEvents, setProposalEvents] = useState([]);
    const [proposalTitle, setProposalTitle] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Check if departmentProposals and departmentName are passed in location state
        if (location.state?.proposalEvents && location.state?.proposalTitle) {
            setProposalEvents(location.state.proposalEvents);
            setProposalTitle(location.state.proposalTitle);
        } else {
            const fetchProposalEvents = async () => {
                const token = localStorage.getItem("access_token");
                if (!token) {
                    console.error("No token found.");
                    return;
                }

                try {
                    const response = await fetch(`http://127.0.0.1:8000/api/activity-schedules/`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setProposalEvents(data);
                    } else {
                        console.error("Error fetching department proposals:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error fetching department proposals:", error);
                }
            };

            const fetchProposalTitle = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/api/proposals/${proposalTitle}/`);
                    if (response.ok) {
                        const data = await response.json();
                        setProposalTitle(data.title);
                    }
                } catch (error) {
                    console.error("Error fetching department name:", error);
                }
            };

            fetchProposalEvents();
            fetchProposalTitle();
        }
    }, [proposalId, location.state]);


    return(      
        <Container>
            <Row>
                <Button variant="link" onClick={() => navigate("/admin/approved-proposal")} className="backBtn d-flex align-items-center text-success">
                    <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                    <span className="ms-2">Back</span>
                </Button>
                <h2 className="mb-4">{proposalTitle} Proposals</h2>
            </Row>
            <Row className="mb-4">
                {proposalEvents.map((proposal) => (
                    <Col key={proposal.proposal_id} md={6} className="mb-3">
                        <Card className="department-card1" >
                            <Card.Body>
                                <Card.Title className="text-success">{proposal.title}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default AdminEventPage;
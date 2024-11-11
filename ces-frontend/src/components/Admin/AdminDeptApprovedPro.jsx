import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const AdminDeptApprovedPro = () => {
    const { departmentId } = useParams(); // Retrieve the department ID from the URL
    const [departmentProposals, setDepartmentProposals] = useState([]);
    const [departmentName, setDepartmentName] = useState("");
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Check if departmentProposals and departmentName are passed in location state
        if (location.state?.departmentProposals && location.state?.departmentName) {
            setDepartmentProposals(location.state.departmentProposals);
            setDepartmentName(location.state.departmentName);
        } else {
            // Fetch data if not available in location state
            // Fetch proposals for the departmentId here as a fallback
            const fetchDepartmentProposals = async () => {
                const token = localStorage.getItem("access_token");
                if (!token) {
                    console.error("No token found.");
                    return;
                }

                try {
                    const response = await fetch(`http://127.0.0.1:8000/api/proposals/?status=Approved by Barangay&department=${departmentId}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setDepartmentProposals(data);
                    } else {
                        console.error("Error fetching department proposals:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error fetching department proposals:", error);
                }
            };

            const fetchDepartmentName = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/api/departments/${departmentId}/`);
                    if (response.ok) {
                        const data = await response.json();
                        setDepartmentName(data.dept_name);
                    }
                } catch (error) {
                    console.error("Error fetching department name:", error);
                }
            };

            fetchDepartmentProposals();
            fetchDepartmentName();
        }
    }, [departmentId, location.state]);

    const handleProposalClick = (proposal) => {
        const filteredEvents = events.filter(
            (event) => event.proposal_id === proposal.proposal_id
        );
        setEvents(filteredEvents);

        navigate(`/admin/approved-proposal/${proposal.proposal_id}`, { state: { proposalEvents: filteredEvents, proposalName : proposal.title } });
    };



    
    return (
        <Container>
            <Row>
                <Button variant="link" onClick={() => navigate("/admin/approved-proposal")} className="backBtn d-flex align-items-center text-success">
                    <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                    <span className="ms-2">Back</span>
                </Button>
                <h2 className="mb-4">{departmentName} Proposals</h2>
            </Row>
            <Row className="mb-4">
                {departmentProposals.map((proposal) => (
                    <Col key={proposal.proposal_id} md={6} className="mb-3">
                        <Card className="department-card1" onClick={() => handleProposalClick(proposal)}>
                            <Card.Body>
                                <Card.Title className="text-success">{proposal.title}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default AdminDeptApprovedPro;
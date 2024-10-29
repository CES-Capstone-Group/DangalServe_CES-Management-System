import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const AdminDeptApprovedPro = () => {
    const { departmentId } = useParams(); // Retrieve the department ID from the URL
    const [departmentProposals, setDepartmentProposals] = useState([]);
    const [departmentName, setDepartmentName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch proposals for the specific department
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

        // Fetch department name by ID
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
    }, [departmentId]);

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
                        <Card className="department-card1">
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

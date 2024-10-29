import React, { useEffect, useState } from "react";
import { Container, Table, Card, Row, Col, Button } from "react-bootstrap";
import BtnCoorViewApprovedProposal from "../Buttons/Coordinator/BtnCoorViewApprovedProposal";
import "../table.css";
import '/src/App.css';

const AdminApprovedPro = () => {
    const [proposals, setProposals] = useState([]);
    const [departments, setDepartments] = useState([]);  // Fetch departments
    const [loading, setLoading] = useState(true);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [departmentProposals, setDepartmentProposals] = useState([]);

    // Fetch all approved proposals from the backend
    useEffect(() => {
        const fetchApprovedProposals = async () => {
            const token = localStorage.getItem("access_token");
            if (!token) {
                console.error("No token found.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("http://127.0.0.1:8000/api/proposals/?status=Approved by Barangay", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProposals(data);
                } else {
                    console.error("Error fetching approved proposals:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching approved proposals:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchApprovedProposals();
    }, []);

    // Fetch departments (new function to get all departments)
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/departments/");
                if (response.ok) {
                    const data = await response.json();
                    setDepartments(data);  // Store departments for the cards
                } else {
                    console.error("Failed to fetch departments:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };

        fetchDepartments();
    }, []);

    // Department card click handler
    const handleDepartmentClick = (departmentName) => {
        setSelectedDepartment(departmentName);
        const filteredProposals = proposals.filter(
            (proposal) => proposal.department === departmentName
        );
        setDepartmentProposals(filteredProposals);
    };

    const handleBackClick = () => {
        setSelectedDepartment(null);
    };

    return (
        <Container className="container-fluid">
            <div className="container">
                <h1>APPROVED PROPOSALS</h1>
            </div>

            {/* Department Cards */}
            <Row className="mb-4">
                {departments.map((department, index) => (
                    <Col key={index} md={3} className="mb-3">
                        <Card
                            className="department-card clickable-card"
                            onClick={() => handleDepartmentClick(department.dept_name)}
                        >
                            <Card.Body>
                                <Card.Title>{department.dept_name}</Card.Title>
                                <Card.Text>
                                    No. of Approved Proposals:{" "}
                                    {
                                        proposals.filter(
                                            (proposal) => proposal.department === department.dept_name
                                        ).length
                                    }
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Department-Specific Proposals View */}
            {selectedDepartment ? (
                <div>
                    <Button variant="secondary" onClick={handleBackClick} className="mb-4">
                        &lt; Back
                    </Button>
                    <h2>{selectedDepartment} Proposals</h2>
                    <Row className="mb-4">
                        {departmentProposals.map((proposal) => (
                            <Col key={proposal.proposal_id} md={6} className="mb-3">
                                <Card onClick={() => handleDepartmentClick(department.dept_name)}
                                >
                                    <Card.Body>
                                        <Card.Title>{proposal.title}</Card.Title>
                                        <Card.Text>Location: {proposal.location}</Card.Text>
                                        <Card.Text>Target Date: {new Date(proposal.target_date).toLocaleDateString()}</Card.Text>
                                        <BtnCoorViewApprovedProposal proposal={proposal} />
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            ) : (
                // Display full proposals table when no department is selected
                <>
                    {loading ? (
                        <p>Loading...</p>
                    ) : proposals.length === 0 ? (
                        <p>No approved proposals found.</p>
                    ) : (
                        <Table responsive bordered striped hover className="tableStyle">
                            <thead>
                                <tr>
                                    <th>Proposal Title</th>
                                    <th>Location</th>
                                    <th>Target Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {proposals.map((proposal) => (
                                    <tr key={proposal.proposal_id}>
                                        <td>{proposal.title}</td>
                                        <td>{proposal.location}</td>
                                        <td>{new Date(proposal.target_date).toLocaleDateString()}</td>
                                        <td>{proposal.status}</td>
                                        <td>
                                            <BtnCoorViewApprovedProposal proposal={proposal} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </>
            )}
        </Container>
    );
};

export default AdminApprovedPro;

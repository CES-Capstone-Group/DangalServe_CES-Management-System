import React, { useEffect, useState } from "react";
import { Container, Table, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import BtnCoorViewApprovedProposal from "../Buttons/Coordinator/BtnCoorViewApprovedProposal";
import "../table.css";
import '/src/App.css';

const AdminApprovedPro = () => {
    const [proposals, setProposals] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [departmentProposals, setDepartmentProposals] = useState([]);
    const navigate = useNavigate();

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

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/departments/");
                if (response.ok) {
                    const data = await response.json();
                    setDepartments(data);
                } else {
                    console.error("Failed to fetch departments:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };

        fetchDepartments();
    }, []);

    const handleDepartmentClick = (department) => {
        // Filter proposals based on user_department_id
        const filteredProposals = proposals.filter(
            (proposal) => proposal.user_department_id === department.dept_id
        );
        setDepartmentProposals(filteredProposals);
    
        // Pass departmentProposals to AdminDeptApprovedPro using state
        navigate(`/admin/approved-proposal/${department.dept_id}`, { state: { departmentProposals: filteredProposals, departmentName : department.dept_name } });
    };

    return (
        <Container className="container-fluid">
            <div className="container">
                <h1>APPROVED PROPOSALS</h1>
            </div>

            <Row className="mb-4">
                {departments.map((department, index) => (
                    <Col key={index} md={3} className="mb-3">
                        <Card
                            className="department-card clickable-card"
                            onClick={() => handleDepartmentClick(department)}
                        >
                            <Card.Body>
                                <Card.Title>{department.dept_name}</Card.Title>
                                <Card.Text>
                                    No. of Approved Proposals:{" "}
                                    {
                                        proposals.filter(
                                            (proposal) => proposal.user_department_id === department.dept_id
                                        ).length
                                    }
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

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
        </Container>
    );
};

export default AdminApprovedPro;

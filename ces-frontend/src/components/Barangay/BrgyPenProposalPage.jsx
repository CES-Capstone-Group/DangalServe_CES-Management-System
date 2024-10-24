import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import BtnViewApproveAdminAch from "../Buttons/Admin/BtnViewApproveAdminAch";
import {jwtDecode} from "jwt-decode"; // To decode JWT and get user info
import "../table.css";

const BrgyPenProposalPage = () => {
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true); // Start with loading = true
    const [department, setDepartment] = useState("");

    // Fetch the current user's department from JWT token (or from API)
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                
                const departmentFromToken = decodedToken.department; // Check if department is present in the token
                if (departmentFromToken) {
                    setDepartment(departmentFromToken);
                } else {
                    console.error("Department not found in token.");
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                setLoading(false);
            }
        } else {
            console.error("No token found.");
            setLoading(false); // If no token, stop loading
        }
    }, []);

    // Fetch all proposals where the status is 'Approved by President' and partner community matches department
    useEffect(() => {
        const fetchProposals = async () => {
            if (!department) {
                console.log("Department is not set. Cannot fetch proposals.");
                setLoading(false);
                return;
            }
        
            const token = localStorage.getItem("access_token");
            if (!token) {
                console.error("No token found.");
                setLoading(false);
                return;
            }
        
            try {
                const queryParams = new URLSearchParams({
                    status__in: ["Approved by President", "Partly Approved by Barangay"].join(','),
                    partner_community: department,
                });
        
                const response = await fetch(`http://127.0.0.1:8000/api/proposals/?${queryParams.toString()}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
        
                if (response.ok) {
                    const data = await response.json();
                    // Add an additional safeguard to filter exactly by "Approved by Barangay"
                    const filteredProposals = data.filter(proposal => proposal.status === "Approved by President" || proposal.status === "Partly Approved by Barangay");
                    setProposals(filteredProposals); // Set the proposals after filtering
                    // console.log("Filtered Proposals:", filteredProposals); // Add a log to inspect filtered proposals
                } else if (response.status === 401) {
                    console.error("Unauthorized: Check if the token is valid.");
                } else {
                    console.error("Error fetching proposals:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching proposals:", error);
            } finally {
                setLoading(false);
            }
        };
        

        if (department) {
            fetchProposals();
        }
    }, [department]); // Re-fetch when department is set

    return (
        <Container className="container-fluid">
            <div className="container">
                <h1> PENDING PROPOSALS </h1>
            </div>

            {loading ? (
                <p>Loading...</p>
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
                        {proposals.length > 0 ? (
                            proposals.map((proposal) => (
                                <tr key={proposal.proposal_id}>
                                    <td>{proposal.title}</td>
                                    <td>{proposal.location}</td>
                                    <td>{new Date(proposal.target_date).toLocaleDateString()}</td>
                                    <td>{proposal.status}</td>
                                    <td><BtnViewApproveAdminAch proposal={proposal} /></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No pending proposals found.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default BrgyPenProposalPage;

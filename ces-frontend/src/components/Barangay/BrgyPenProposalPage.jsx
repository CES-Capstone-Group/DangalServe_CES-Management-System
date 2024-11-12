import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import {jwtDecode} from "jwt-decode"; // Corrected the import for jwtDecode
import "../table.css";
import BtnViewApproveProposal from "../Buttons/BtnViewApproveProposal";

const BrgyPenProposalPage = () => {
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [department, setDepartment] = useState("");

    // Function to fetch all proposals
    const fetchProposals = async () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            console.error("No token found.");
            setLoading(false);
            return;
        }
    
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/proposals/?status=BarangayPending`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (response.ok) {
                const data = await response.json();
                setProposals(data); // Use the data as is, without filtering
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

    // Effect to fetch department from JWT and set it
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                console.log("Decoded token:", decodedToken); // Add logging
                const departmentFromToken = decodedToken.barangay;
                if (departmentFromToken) {
                    setDepartment(departmentFromToken);
                } else {
                    console.error("Department not found in token.");
                    setLoading(false); // Ensure loading is set to false
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                setLoading(false); // Ensure loading is set to false
            }
        } else {
            console.error("No token found.");
            setLoading(false); // Ensure loading is set to false
        }
    }, []);
    
    // Effect to fetch proposals when the department is set
    useEffect(() => {
        if (department) {
            setLoading(true); // Start loading when fetching proposals
            fetchProposals();
        }
    }, [department]);

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
                                    <td>
                                        <BtnViewApproveProposal
                                            proposal={proposal}
                                            onApprove={fetchProposals} // Use fetchProposals to refresh data
                                        />
                                    </td>
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

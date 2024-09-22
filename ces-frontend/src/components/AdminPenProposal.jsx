import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import BtnViewApproveCPP from "./Buttons/BtnViewApproveCPP";
import "./table.css";

const AdminPenProposal = () => {
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all pending proposals from the backend
    useEffect(() => {
        const fetchProposals = async () => {
            const token = localStorage.getItem('access_token'); // Get the token from localStorage
            if (!token) {
                console.error("No token found.");
                setLoading(false); // Stop loading if there's no token
                return;
            }

            try {
                // Fetch only the pending proposals by passing the `status=Pending` parameter
                const response = await fetch('http://127.0.0.1:8000/api/proposals/?status=Pending', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,  // Add the Authorization header
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    // Update the proposals state with the fetched data
                    setProposals(data);
                    setLoading(false); // Stop loading once data is fetched
                } else if (response.status === 401) {
                    console.error('Unauthorized: Check if the token is valid.');
                    setLoading(false);
                } else {
                    console.error('Error fetching proposals:', response.statusText);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching proposals:', error);
                setLoading(false);
            }
        };

        fetchProposals();
    }, []);

    // Re-fetch proposals after approval
    const handleProposalApproved = () => {
        setLoading(true);
        fetchProposals();  // Re-fetch proposals after an approval
    };

    return (
        <Container className="container-fluid">
            <div className="container">
                <h1>PENDING PROPOSALS</h1>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : proposals.length === 0 ? (
                <p>No pending proposals found.</p>
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
                                    <BtnViewApproveCPP 
                                        proposal={proposal} 
                                        onApprove={handleProposalApproved} // Pass the callback function
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default AdminPenProposal;

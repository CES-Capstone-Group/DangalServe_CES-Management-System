import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import BtnViewApproveCPP from "./Buttons/BtnViewApproveCPP";  
import BtnAddProposal from "./Buttons/BtnAddProposal";
import "./table.css";

const CoorPenProposal = () => {
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProposals = async () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            console.error("No token found.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/proposals/?status=Pending', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setProposals(data);
            } else if (response.status === 401) {
                console.error('Unauthorized: Check if the token is valid.');
            } else {
                console.error('Error fetching proposals:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching proposals:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProposals();
    }, []);

    const handleProposalApproved = () => {
        fetchProposals(); 
    };

    return (
        <Container className="container-fluid">
            <div className="container">
                <h1>PENDING PROPOSALS</h1>
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
                                    <td>{proposal.target_date}</td>
                                    <td>{proposal.status}</td>
                                    <td>
                                        <BtnViewApproveCPP
                                            proposal={proposal}
                                            onApprove={handleProposalApproved} // Callback after approval
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

            <div className="mb-3 d-flex justify-content-end">
                <BtnAddProposal style={{ backgroundColor: "#71A872", border: "0px" }} />
            </div>
        </Container>
    );
};

export default CoorPenProposal;

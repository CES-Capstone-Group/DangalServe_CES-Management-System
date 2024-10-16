import React, { useState } from "react";
import { Button } from "react-bootstrap";

const ButtonDownloadProposal = ({ proposal }) => {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true); // Start loading
        try {
            const token = localStorage.getItem('access_token'); // Get the token from localStorage
            if (!token) {
                console.error("No token found.");
                setLoading(false); // Stop loading if there's no token
                return;
            }
            const timestamp = new Date().getTime();
            const response = await fetch(`http://127.0.0.1:8000/api/proposals/${proposal.proposal_id}/download/?_=${timestamp}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Add this if you are using token-based authentication
                }
            });
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `proposal_${proposal.proposal_id}.docx`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                console.error('Failed to download document');
            }
        } catch (error) {
            console.error('Error while downloading the file:', error);
        } finally {
            setLoading(false); // Stop loading after download attempt
        }
    };

    return (
        <Button variant="primary" onClick={handleDownload} disabled={loading}>
            {loading ? "Downloading..." : "Download Proposal"}
        </Button>
    );
};

export default ButtonDownloadProposal;

import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import BtnView from "./BtnView";


const ApprovedProposalPage = () => {
    return (
        <Container className="container-fluid">
            <div className="container">
                <h1> PROPOSALS </h1>
            </div>

            <Table>
                <thead>
                    <tr>
                        <th>Proposal Title</th>
                        <th>Location</th>
                        <th>Target Date</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                    <tr>
                        <td>CCLIP: PC Awareness</td>
                        <td>San Isidro Elementary School</td>
                        <td>April 21, 2023</td>
                        <td>Pending</td>
                        <td><BtnView /></td>
                    </tr>
                </thead>
            </Table>

            <div>

            </div>
        </Container>
    );
};

export default ApprovedProposalPage;
import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import BtnViewApprove from "./BtnViewApprove";


const BrgyPenProposalPage = () => {
    return(
        <Container className="container-fluid">
            <div className="container">
            <h1> PENDING PROPOSALS </h1>
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
                        <td><BtnViewApprove/></td>
                    </tr>
                    <tr>
                        <td>Proposal Title</td>
                        <td>Location</td>
                        <td>Target Date</td>
                        <td>Status</td>
                        <td><BtnViewApprove/></td>
                    </tr>
                </thead>
            </Table>
        </Container>
    );
};

export default BrgyPenProposalPage;
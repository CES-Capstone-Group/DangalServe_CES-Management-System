import React from "react";

import { Button, Container, Table } from "react-bootstrap";
import "../table.css"

const BrgyApprovedPro = () => {
    return(
        <Container className="container-fluid">
            <div className="container">
            <h1> APPROVED PROPOSALS </h1>
            </div>
        
            <Table responsive bordered striped hover className="tableStyle">
                <thead>
                        <th>Proposal Title</th>
                        <th>Location</th>
                        <th>Target Date</th>
                        <th>Status</th>
                </thead>
                <tbody>
                    <tr>
                        <td>CCLIP: PC Awareness</td>
                        <td>San Isidro Elementary School</td>
                        <td>April 21, 2023</td>
                        <td>Pending</td>
                    </tr>
                    <tr>
                        <td>Proposal Title</td>
                        <td>Location</td>
                        <td>Target Date</td>
                        <td>Pending</td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
};

export default BrgyApprovedPro;
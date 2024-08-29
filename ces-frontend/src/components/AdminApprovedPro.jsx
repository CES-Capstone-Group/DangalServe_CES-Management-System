import React from "react";
import { Container, Table } from "react-bootstrap";
import BtnViewAP from "./Buttons/BtnView";


const AdminApprovedPro = () => {
    return(
        <Container className="container-fluid">
            <div className="container">
            <h1> APPROVED PROPOSALS </h1>
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
                        <td><BtnViewAP/></td>
                    </tr>
                    <tr>
                        <td>Proposal Title</td>
                        <td>Location</td>
                        <td>Target Date</td>
                        <td>Pending</td>
                        <td><BtnViewAP/></td>
                    </tr>
                </thead>
            </Table>
        </Container>
    );
};

export default AdminApprovedPro;
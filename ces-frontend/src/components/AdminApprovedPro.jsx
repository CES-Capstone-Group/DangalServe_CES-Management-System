import React from "react";
import { Container, Table } from "react-bootstrap";
import BtnView from "./Buttons/BtnView";
import "./table.css"


const AdminApprovedPro = () => {
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
                        <th></th>
                </thead>
                    <tr>
                        <td>CCLIP: PC Awareness</td>
                        <td>San Isidro Elementary School</td>
                        <td>April 21, 2023</td>
                        <td>Active</td>
                        <td><BtnView/></td>
                    </tr>
                    <tr>
                        <td>Proposal Title</td>
                        <td>Location</td>
                        <td>Target Date</td>
                        <td>Active</td>
                        <td><BtnView/></td>
                    </tr>
                
            </Table>
        </Container>
    );
};

export default AdminApprovedPro;
import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import BtnView from "./Buttons/BtnView";
import "./table.css"


const CoorApprovedPro = () => {
    return (
        <Container className="container-fluid">
            <div className="container">
                <h1> PROPOSALS </h1>
            </div>

            <Table responsive bordered striped hover className="tableStyle">
                <thead>
                    
                        <th>Proposal Title</th>
                        <th>Location</th>
                        <th>Target Date</th>
                        <th></th>
                </thead>
                <tr>
                    <td>CCLIP: PC Awareness</td>
                    <td>San Isidro Elementary School</td>
                    <td>April 21, 2023</td>
                    <td><BtnView /></td>
                </tr>
            </Table>
        </Container>
    );
};

export default CoorApprovedPro;
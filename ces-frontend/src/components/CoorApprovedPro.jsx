import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import BtnView from "./Buttons/BtnView";


const CoorApprovedPro = () => {
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
                        <th></th>
                    </tr>
                    <tr>
                        <td>CCLIP: PC Awareness</td>
                        <td>San Isidro Elementary School</td>
                        <td>April 21, 2023</td>
                        <td><BtnView /></td>
                    </tr>
                </thead>
            </Table>
        </Container>
    );
};

export default CoorApprovedPro;
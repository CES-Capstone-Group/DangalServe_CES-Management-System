import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import BtnViewApproveCPP from "./Buttons/BtnViewApproveCPP";
import BtnAddProposal from "./Buttons/BtnAddProposal";
import ProposalForm from "./ProposalForm";
import "./table.css"

const CoorPenProposal = () => {
    return (
        <Container className="container-fluid">
            <div className="container">
                <h1> PENDING PROPOSALS </h1>
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
                        <td>Pending</td>
                        <BtnViewApproveCPP/>
                    </tr>
                    <tr>
                        <td>Proposal Title</td>
                        <td>Location</td>
                        <td>Target Date</td>
                        <td>Status</td>
                        <BtnViewApproveCPP/>
                    </tr>
                
            </Table>

            <div className="mb-3 d-flex justify-content-end">
                <BtnAddProposal style={{ backgroundColor: '#71A872', border: '0px' }} />
            </div>
        </Container>
    );
};

export default CoorPenProposal;
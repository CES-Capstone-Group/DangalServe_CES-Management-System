import React from "react";
import {Col, Container, Row, Table } from "react-bootstrap";
import "../table.css"
import BtnAddEval from "../Buttons/Evaluator/BtnAddEval";
import BtnViewTally from "../Buttons/Evaluator/BtnViewTally";


const EvalPage = () => {
    return (
        <Container className="container-fluid">
            <div className="container">
                <h1> ACTIVITY EVALUATION </h1>
            </div>

            <Table responsive bordered striped hover className="tableStyle" >
                <thead>
                    <tr>
                        <th>Proposal Title</th>
                        <th>Location</th>
                        <th>Target Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>CCLIP: PC Awareness</td>
                        <td>San Isidro Elementary School</td>
                        <td>April 21, 2023</td>
                        <td><BtnViewTally/></td>
                    </tr>
                </tbody>
            </Table>
            
            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <BtnAddEval/>
                </Col>
            </Row>

        </Container>
    );
};

export default EvalPage;
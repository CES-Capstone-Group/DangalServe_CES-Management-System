import React from "react";
import { useState } from "react";
import { Container, Table } from "react-bootstrap";
import BtnEditDeac from "./BtnEditDeac";


const array = [{accID:1903213, type:'Proponent', actDate:'April 20, 2023', deacDate:'April 20, 2024', status:'Active'},
               {accID:1903213, type:'Proponent', actDate:'April 20, 2023', deacDate:'April 20, 2024', status:'Active'}];

const Row = (props) => {
    const {accID, type, actDate, deacDate, status} = props
    return (
        <tr>
            <td>{accID}</td>
            <td>{type}</td>
            <td>{actDate}</td>
            <td>{deacDate}</td>
            <td>{status}</td>
            <BtnEditDeac/>
        </tr>
    );
};

// const Theader = (props) => {
//     const{header} = props
// }

const NewTable = (props) => {
    const{data} = props
    return (
        <Table responsive striped hover>
            <thead>
                <tr>
                    <th>Account ID</th>
                    <th>Type of Account</th>
                    <th>Activation Date</th>
                    <th>Deactivation Date</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            {data.map((row, index) =>
                <Row key = {'key-${index}'} 
                accID = {row.accID}
                type = {row.type}
                actDate = {row.actDate}
                deacDate = {row.deacDate}
                status = {row.status}/>)}
        </Table>
    );
}

const BrgyProposalPage = () => {

    const [rows, setRows] = useState(array)

    return(
        <Container className="container-fluid">
            <div className="container">
            <h1> ACCOUNT MANAGEMENT </h1>
            </div>

            <Table>
                <NewTable data = {rows}/>
            </Table>
            
            
        </Container>
    );
};

export default BrgyProposalPage;


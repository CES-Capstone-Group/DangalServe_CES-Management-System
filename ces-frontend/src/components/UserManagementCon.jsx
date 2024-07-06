import React from "react";
import { useState } from "react";
import { Container, Table, Button, Row, Col, Form} from "react-bootstrap";
import BtnEditDeac from "./BtnEditDeac";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import BtnAddAcc from "./BtnAddAcc";


const array = [{accID:1903213, type:'Proponent', actDate:'April 20, 2023', deacDate:'April 20, 2024', status:'Active'},
               {accID:1903213, type:'Proponent', actDate:'April 20, 2023', deacDate:'April 20, 2024', status:'Active'}];

const Rows = (props) => {
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
            <thead style={{backgroundColor: '#F0F1F0'}}>                
                <th>Account ID</th>
                <th>Type of Account</th>
                <th>Activation Date</th>
                <th>Deactivation Date</th>
                <th>Status</th>
                <th></th>
            </thead>
            {data.map((row, index) =>
                <Rows key = {'key-${index}'} 
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
        <Container fluid>
            <Row>
                <Col className="d-flex justify-content-end">
                    <Button style={{backgroundColor:'#71A872', border: '0px'}}>
                        <FontAwesomeIcon className='me-2' icon={faFilter} ></FontAwesomeIcon>
                        Filter
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col><h1> ACCOUNT MANAGEMENT</h1></Col>
            </Row>
            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <input type="search" className="form-control" placeholder='Search' style={{width: '300px'}}/>
                </Col>
            </Row>

            <Table>
                <NewTable data = {rows}/>
            </Table>
            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <BtnAddAcc/>
                </Col>
            </Row>           
        </Container>
        
    );
};

export default BrgyProposalPage;


import React from "react";
import { useState } from "react";
import { Container, Table, Button, Row, Col, Form} from "react-bootstrap";
import BtnEditDeac from "../Buttons/BtnEditDeac";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import BtnAddAcc from "../Buttons/BtnAddAcc";


const array = [{accID:1903213, type:'Proponent', department:'Bachelor of Science in Information Technology' , actDate:'April 20, 2023', deacDate:'April 20, 2024', status:'Active'},
               {accID:1903213, type:'Proponent', department:'Bachelor of Science in Computer Science', actDate:'April 20, 2023', deacDate:'April 20, 2024', status:'Active'}];

const Rows = (props) => {
    const {accID, type ,department ,actDate, deacDate, status} = props
    return (
        <tr>
            <td>{accID}</td>
            <td>{type}</td>
            <td>{department}</td>
            <td>{actDate}</td>
            <td>{deacDate}</td>
            <td>{status}</td>
            <BtnEditDeac/>
        </tr>
    );
};

const NewTable = (props) => {
    const{data} = props
    return (
        <Table responsive striped hover>
            <thead style={{backgroundColor: '#F0F1F0'}}>                
                <th>Account ID</th>
                <th>Type of Account</th>
                <th>Department</th>
                <th>Activation Date</th>
                <th>Deactivation Date</th>
                <th>Status</th>
                <th></th>
            </thead>
            {data.map((row, index) =>
                <Rows key = {'key-${index}'} 
                accID = {row.accID}
                type = {row.type}
                department = {row.department}
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
                    <BtnAddAcc style={{backgroundColor:'#71A872', border: '0px'}}/>
                </Col>
            </Row>           
        </Container>
        
    );
};

export default BrgyProposalPage;


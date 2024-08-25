import React from "react";
import { useState } from "react";
import { Container, Table, Button, Row, Col, Form} from "react-bootstrap";
import BtnEditDeac from "./BtnEditDeac";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import BtnAddAcc from "./BtnAddAcc";
import BtnViewApproveRE from "./BtnViewApproveRE";


const array = [{
    actTitle:'Community Cleanup Drive', 
    Requester:'Brgy. Diezmo' , 
    RequestDate:'August 9, 2024', 
    status:'Pending'
    },
    {
    actTitle:'Tree Planting', 
    Requester:'Brgy. Bigaa' , 
    RequestDate:'September 20, 2024', 
    status:'Pending'
    }
];

const Rows = (props) => {
    const {actTitle , Requester, RequestDate, status} = props
    return (
        <tr>
            <td>{actTitle}</td>
            <td>{Requester}</td>
            <td>{RequestDate}</td>
            <td>{status}</td>
            <td><BtnViewApproveRE/></td>
        </tr>
    );
};

const NewTable = (props) => {
    const{data} = props
    return (
        <Table responsive striped hover>
            <thead style={{backgroundColor: '#F0F1F0'}}>                
                <th>Activity Title</th>
                <th>Requester</th>
                <th>Request Date</th>
                <th>Status</th>
                <th></th>
            </thead>
            {data.map((row, index) =>
                <Rows key = {'key-${index}'} 
                actTitle = {row.actTitle}
                Requester = {row.Requester}
                RequestDate = {row.RequestDate}
                status = {row.status}/>)}
        </Table>
    );
}

const BrgyEventRequest = () => {

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
                <Col><h1> Admin Pending Achivement</h1></Col>
            </Row>
            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <input type="search" className="form-control" placeholder='Search' style={{width: '300px'}}/>
                </Col>
            </Row>

            <Table>
                <NewTable data = {rows}/>
            </Table>         
        </Container>
        
    );
};

export default BrgyEventRequest;


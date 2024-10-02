import React from "react";
import { useState } from "react";
import { Container, Table, Button, Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./table.css";
import BtnEditDelete from "./Buttons/BtnEditDelete";
import BtnAddAchievement from "./Buttons/BtnAddAchievement";

const array = [{awardTitle:'Outstanding Extension Personnel', awardee:'Mr. John Doe' , awardedBy:'Community Outreach Foundation', awardDate:'April 20, 2024', achImage: '' },
    {awardTitle:'Outstanding Extension Personnel', awardee:'Mr. John Doe' , awardedBy:'Community Outreach Foundation', awardDate:'April 20, 2024', achImage: ''}];

const Rows = (props) => {
    const {awardTitle , awardee, awardedBy, awardDate, achImage} = props
    return (
        <tr>
            <td>{awardTitle}</td>
            <td>{awardee}</td>
            <td>{awardedBy}</td>
            <td>{awardDate}</td>
            <td>{achImage}</td>
            <td><BtnEditDelete/></td>
        </tr>
    );
};

const NewTable = (props) => {
    const{data} = props
    return (
        <Table responsive bordered striped hover className="tableStyle">
            <thead>                
                <th>Award Title</th>
                <th>Awardee</th>
                <th>Awarded By</th>
                <th>Date Awarded</th>
                <th>Image</th>
                <th></th>
            </thead>
            {data.map((row, index) =>
                <Rows key = {'key-${index}'} 
                awardTitle = {row.awardTitle}
                awardee = {row.awardee}
                awardedBy = {row.awardedBy}
                awardDate = {row.awardDate}
                achImage = {row.achImage}
            />)}
        </Table>
    );
}


const ManageAchievements = () => {

    const [rows, setRows] = useState(array)

    return (
        <Container fluid>
            <Row>
                <Col className="d-flex justify-content-end">
                    <Button style={{ backgroundColor: '#71A872', border: '0px' }}>
                        <FontAwesomeIcon className='me-2' icon={faFilter} ></FontAwesomeIcon>
                        Filter
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col><h1> Achievement Management </h1></Col>
            </Row>
            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <input type="search" className="form-control" placeholder='Search' style={{ width: '300px' }} />
                </Col>
            </Row>

            <Table>
                <NewTable data={rows} />
            </Table>

            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <BtnAddAchievement/>
                </Col>
            </Row>

        </Container>

    );
};

export default ManageAchievements;


import React from "react";
import { useState } from "react";
import { Container, Table, Button, Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./table.css";
import BtnEditDelete from "./Buttons/BtnEditDelete";
import BtnAddAnnouncement from "./Buttons/BtnAddAnnouncement";

const array = [{ announcementTitle: 'Outstanding Extension Personnel', announcementDeets: '', announcementImg: '' }];


const Rows = (props) => {
    const { announcementTitle, announcementDeets, announcementImg  } = props
    return (
        <tr>
            <td>{announcementTitle}</td>
            <td>{announcementDeets}</td>
            <td>{announcementImg}</td>
            <td>
                <BtnEditDelete />
            </td>
        </tr>
    );
};

const NewTable = (props) => {
    const { data } = props
    return (
        <Table responsive striped hover className="tableStyle">
            <thead>
                <th>Announcement Title</th>
                <th>Details</th>
                <th>Image</th>
                <th></th>
            </thead>
            {data.map((row, index) =>
                <Rows key={'key-${index}'}
                    announcementTitle={row.announcementTitle} />)}
        </Table>
    );
}

const ManageAnnouncement = () => {

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
                <Col><h1> Announcements</h1></Col>
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
                    <BtnAddAnnouncement />
                </Col>
            </Row>

        </Container>

    );
};

export default ManageAnnouncement;


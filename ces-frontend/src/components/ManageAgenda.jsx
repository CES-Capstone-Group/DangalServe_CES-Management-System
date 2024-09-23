import React from "react";
import { useState } from "react";
import { Container, Table, Button, Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./table.css";
import BtnAddResearchAgenda from "./Buttons/BtnAddResearchAgenda";
import BtnEditDelete from "./Buttons/BtnEditDelete";

const array = [{ agendaLabel: 'Outstanding Extension Personnel', agendaImg: ''}];


const Rows = (props) => {
    const { agendaLabel, agendaImg } = props
    return (
        <tr>
            <td>{agendaLabel}</td>
            <td>{agendaImg}</td>
            <td>
               <BtnEditDelete/>
            </td>
        </tr>
    );
};

const NewTable = (props) => {
    const { data } = props
    return (
        <Table responsive striped hover className="tableStyle">
            <thead>
                <th>Research Agenda Label</th>
                <th>Image</th>
                <th></th>
            </thead>
            {data.map((row, index) =>
                <Rows key={'key-${index}'}
                    agendaLabel={row.agendaLabel}
                    agendaImg={row.agendaImg} />)}
        </Table>
    );
}

const ManageAgenda = () => {

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
                <Col><h1> Research Agendas</h1></Col>
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
                    <BtnAddResearchAgenda/>
                </Col>
            </Row>

        </Container>

    );
};

export default ManageAgenda;


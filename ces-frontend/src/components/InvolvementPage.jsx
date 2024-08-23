import React from "react";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Container, Row } from "react-bootstrap";
import InvChart from "./InvChart.jsx";


const InvolvementPage = () => {
    return(
        <div>
            <Container className="d-flex">
                <Row>
                    <Col><h1> ACCOUNT MANAGEMENT</h1></Col>
                </Row>
                <Row style={{marginLeft: '45em'}}>
                    <Col className="justify-content-end">
                        <Button style={{backgroundColor:'#71A872', border: '0px'}}>
                            <FontAwesomeIcon className='me-2' icon={faFilter} ></FontAwesomeIcon>
                            Filter
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Container>
                <InvChart/> 
            </Container>
        </div> 
    );
}

export default InvolvementPage;
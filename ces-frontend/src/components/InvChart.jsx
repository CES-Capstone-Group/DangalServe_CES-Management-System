import React from "react";
import {Chart as ChartJS} from "chart.js/auto";
import {Bar} from "react-chartjs-2";
import {Card, Col, Container, Row } from "react-bootstrap";
import {data1,data2,data3,data4} from "./ChartData.jsx"

const InvChart = () => {
    return(
        <Container>
            <Row>
                <Col>
                    <Card style={{width: '30em',
                        border:'1px', 
                        borderStyle: "groove", 
                        borderTop: '0px',
                        boxShadow: '1px 7px 7px 4px #888888',
                        padding: '2em'}}>
                        <Card.Title>Non-Teaching Personnel Involved <span className="h5 ms-4 text-secondary">YEAR 2023</span></Card.Title>
                        <Card.Body>
                            <Bar data={data1}/>
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col>
                    <Card style={{width: '30em',
                        border:'1px', 
                        borderStyle: "groove", 
                        borderTop: '0px',
                        boxShadow: '1px 7px 7px 4px #888888',
                        padding: '2em'}}>
                        <Card.Title>Teaching Personnel Involved <span className="h5 ms-4 text-secondary">YEAR 2023</span></Card.Title>
                        <Card.Body>
                            <Bar data={data2}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>     
            <Row className="mt-5">
                <Col>
                    <Card style={{width: '30em',
                        border:'1px', 
                        borderStyle: "groove", 
                        borderTop: '0px',
                        boxShadow: '1px 7px 7px 4px #888888',
                        padding: '2em'}}>
                        <Card.Title>Participants Involved <span className="h5 ms-4 text-secondary">YEAR 2023</span></Card.Title>
                        <Card.Body>
                            <Bar data={data3}/>
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col>
                    <Card style={{width: '30em',
                        border:'1px', 
                        borderStyle: "groove", 
                        borderTop: '0px',
                        boxShadow: '1px 7px 7px 4px #888888',
                        padding: '2em'}}>
                        <Card.Title>Students Involved <span className="h5 ms-4 text-secondary">YEAR 2023</span></Card.Title>
                        <Card.Body>
                            <Bar data={data4}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>       
        </Container>
    );
}

export default  InvChart;
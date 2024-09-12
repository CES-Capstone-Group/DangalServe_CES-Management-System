import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import BtnEditKpi from "./Buttons/BtnEditKpi";

const KpiPage = () => {
    return(
        <Container style={{paddingTop: '10em'}}>
            <Container fluid style={{
                border:'1px', 
                borderStyle: "groove", 
                borderTop: '0px',
                boxShadow: '1px 7px 7px 4px #888888',
                padding: '2em'
                }}>
            <h3 style={{paddingBottom: '1em'}}>KEY PERFORMANCE INDICATOR</h3>
            <Row>
                <Col>
                    <Row >
                        <Col md={{span: 4, offset: 9 }}>
                            <h4 >2023</h4>
                        </Col>
                    </Row>
                    <h4>‎ </h4>
                    <Table>
                        <thead>
                            <th>Key Performance Indicator</th>
                            <th>1st Quarter</th>
                            <th>2nd Quarter</th>
                            <th>3rd Quarter</th>
                            <th>4th Quarter</th>
                            <th>Total Quarter</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Average score of individuals' knowledge assessment</td>
                                <td>0%</td>
                                <td>0%</td>
                                <td>0%</td>
                                <td>0%</td>
                                <td>0%</td>
                            </tr>
                            <tr>
                                <td>Number of computer seminars and trainings conducted</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>Number of beneficiaries trained on the use the use of software application, hardware, internet, social media, data privacy and graphics</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            </Container>
            
            <Row>
                <Col lg={12}>
                    <Container className="d-flex mt-5 justify-content-end">
                        <BtnEditKpi className='mt-5'/>
                    </Container>
                </Col>
            </Row>
        </Container>
        
    );
}
export default KpiPage;
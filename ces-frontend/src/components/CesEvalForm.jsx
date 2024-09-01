import React from 'react';
import { Form, Button, Row, Col, Container, Table } from 'react-bootstrap';

const CesEvalForm = () => {
    return (
        <Container>
            <h1 className="mt-4 mb-4">Community and Extension Periodic Evaluation Form</h1>
            <Form>
                <Form.Group as={Row} controlId="formCoveredPeriod" className="mb-3">
                    <Form.Label column sm={3}>Covered Period</Form.Label>
                    <Col sm={9}>
                        <Form.Control type="text" placeholder="Enter Covered Period" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPartnerCommunity" className="mb-3">
                    <Form.Label column sm={3}>Partner Community/Organization</Form.Label>
                    <Col sm={9}>
                        <Form.Control type="text" placeholder="Enter Partner Community/Organization" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formActivitiesImplemented" className="mb-3">
                    <Form.Label column sm={3}>Activities Implemented</Form.Label>
                    <Col sm={9}>
                        <Form.Control as="textarea" rows={2} placeholder="Enter Activities Implemented" />
                    </Col>
                </Form.Group>

                {/* Implementers Section */}
                <Form.Group as={Row} controlId="formImplementers" className="mb-3">
                    <Form.Label column sm={3}>Number of Implementers</Form.Label>
                    <Col sm={9}>
                        <Row>
                            <Col>
                                <Form.Label>Administrator</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="number" placeholder="Number of Admins" />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Form.Label>Teaching Personnel</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="number" placeholder="Number of Teaching Personnel" />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Form.Label>Non-Teaching Personnel</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="number" placeholder="Number of Non-Teaching Personnel" />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Form.Label>Student</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="number" placeholder="Number of Students" />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Form.Label>Alumni</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="number" placeholder="Number of Alumni" />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Form.Label>Others</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="text" placeholder="Specify Others" />
                            </Col>
                        </Row>
                    </Col>
                </Form.Group>


                <Form.Group as={Row} controlId="formVolunteers" className="mb-3">
                    <Form.Label column sm={3}>Number of Volunteers</Form.Label>
                    <Col sm={9}>
                        <Row>
                            <Col>
                                <Form.Label>Administrator</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="number" placeholder="Number of Admins" />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Form.Label>Teaching Personnel</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="number" placeholder="Number of Teaching Personnel" />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Form.Label>Non-Teaching Personnel</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="number" placeholder="Number of Non-Teaching Personnel" />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Form.Label>Student</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="number" placeholder="Number of Students" />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Form.Label>Alumni</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="number" placeholder="Number of Alumni" />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col>
                                <Form.Label>Others</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control type="text" placeholder="Specify Others" />
                            </Col>
                        </Row>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formExpectedOutcomes" className="mb-3">
                    <Form.Label column sm={3}>Expected Program/Activity Outcomes / Success Indicators</Form.Label>
                    <Col sm={9}>
                        <Form.Control as="textarea" rows={2} placeholder="Enter Expected Outcomes/Success Indicators" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formAchievedOutcomes" className="mb-3">
                    <Form.Label column sm={3}>Achieved Program/Activity Outcomes / Success Indicators</Form.Label>
                    <Col sm={9}>
                        <Form.Control as="textarea" rows={2} placeholder="Enter Achieved Outcomes/Success Indicators" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formQuantitativeEvaluation" className="mb-3">
                    <Form.Label column sm={3}>Quantitative Evaluation</Form.Label>
                    <Col sm={9}>
                        <Form.Control as="textarea" rows={2} placeholder="Enter Quantitative Evaluation" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formAreasForImprovement" className="mb-3">
                    <Form.Label column sm={3}>Areas for Improvement</Form.Label>
                    <Col sm={9}>
                        <Form.Control as="textarea" rows={2} placeholder="Enter Areas for Improvement" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formRecommendations" className="mb-3">
                    <Form.Label column sm={3}>Recommendations</Form.Label>
                    <Col sm={9}>
                        <Form.Control as="textarea" rows={2} placeholder="Enter Recommendations" />
                    </Col>
                </Form.Group>

                <h2>Evaluation Criteria</h2>

                <Table bordered>
                    <thead>
                        <tr>
                            <th>Key Area</th>
                            <th>1<br />Minimal Impact</th>
                            <th>2<br />Some Impact</th>
                            <th>3<br />Good Impact</th>
                            <th>4<br />Strong Impact</th>
                            <th>SCORE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Actual Community Needs</strong></td>
                            <td>
                                <Form.Check type="radio" name="communityNeeds" value="1" label="Community needs were just secondary to what the project or initiative intends to do; it has only considered the needs of the college/program/students/proponents involved." />
                            </td>
                            <td>
                                <Form.Check type="radio" name="communityNeeds" value="2" label="Community needs were not fully understood and therefore the project or initiative did not fully address the needs of the community." />
                            </td>
                            <td>
                                <Form.Check type="radio" name="communityNeeds" value="3" label="Community needs were determined through past research, needs assessment, and profiling. The project or initiative addressed the needs of the community." />
                            </td>
                            <td>
                                <Form.Check type="radio" name="communityNeeds" value="4" label="Community needs were determined accordingly through current research, needs assessment, and profiling. The project or initiative addressed the needs of the community." />
                            </td>
                            <td>
                                <Form.Control type="number" min="1" max="4" />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Collaboration with the Community & Active Community Participation</strong></td>
                            <td>
                                <Form.Check type="radio" name="communityCollaboration" value="1" label="Community members are coincidentally informed or not knowledgeable at all with the conduct of the project or initiative. Community members do not participate in the development & implementation of the project or initiative." />
                            </td>
                            <td>
                                <Form.Check type="radio" name="communityCollaboration" value="2" label="Community members are informed of the project or initiative directly. Community members relatively participate in the development & implementation of the project or initiative." />
                            </td>
                            <td>
                                <Form.Check type="radio" name="communityCollaboration" value="3" label="Community members act as consultants in the development and implementation of the project or initiative. Community members participate in the development & implementation of the project or initiative." />
                            </td>
                            <td>
                                <Form.Check type="radio" name="communityCollaboration" value="4" label="Active, direct collaboration with the community by the proponents. Community members actively participate in the development & implementation of the project or initiative." />
                            </td>
                            <td>
                                <Form.Control type="number" min="1" max="4" />
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Goals and Objectives Delivery</strong></td>
                            <td>
                                <Form.Check type="radio" name="goalsDelivery" value="1" label="Objectives and goals were not delivered according to plan. Changes, outputs, or results are mainly decorative, but there is limited benefit for the community." />
                            </td>
                            <td>
                                <Form.Check type="radio" name="goalsDelivery" value="2" label="Objectives and goals were somewhat delivered according to plan. Changes, outputs, or results are mainly decorative, but new and unique benefits were achieved." />
                            </td>
                            <td>
                                <Form.Check type="radio" name="goalsDelivery" value="3" label="Objectives and goals were delivered according to plan. Changes, outputs, or results enhanced an already good community situation." />
                            </td>
                            <td>
                                <Form.Check type="radio" name="goalsDelivery" value="4" label="Objectives and goals were delivered according to plan. Changes, outputs, or results facilitated change or insight. The project or initiative helped the community achieve its intended outcomes." />
                            </td>
                            <td>
                                <Form.Control type="number" min="1" max="4" />
                            </td>
                        </tr>

                        {/* Add more rows as necessary based on the criteria you have */}

                    </tbody>
                </Table>
                <div className="d-flex justify-content-end">
                    <Button variant="primary" type="submit" className="mt-4">
                        Submit
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default CesEvalForm;

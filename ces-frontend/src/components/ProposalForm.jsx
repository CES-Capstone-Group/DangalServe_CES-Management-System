import React, { useState } from 'react';
import '../App.css'
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

const ProposalForm = () => {
  const [govOrg, setGovOrg] = useState(false);
  const [nonGovOrg, setNonGovOrg] = useState(false);


    return (
        <Container>
        <h2 className="mt-4 mb-4">Community and Extension Service Project and Activity Proposal</h2>
        <Form>
          <h4 className="mb-3">A. Basic Details</h4>
          <Form.Group as={Row} controlId="formTitle" className="mb-3">
            <Form.Label column sm={2}>Title of the Project/Activity</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Enter title" />
            </Col>
          </Form.Group>
  
          <h6 className="mb-3">Covered Period</h6>
  
          <Form.Group as={Row} controlId="formEngagementDate" className="mb-3">
            <Form.Label column sm={2}>Date of Engagement</Form.Label>
            <Col sm={10}>
              <Form.Control type="date" />
            </Col>
          </Form.Group>
  
          <Form.Group as={Row} controlId="formDisengagementDate" className="mb-3">
            <Form.Label column sm={2}>Date of Disengagement</Form.Label>
            <Col sm={10}>
              <Form.Control type="date" />
            </Col>
          </Form.Group>
  
          <Form.Group as={Row} controlId="formDepartment" className="mb-3">
            <Form.Label column sm={2}>Department/Program/
                Organization</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Enter department" />
            </Col>
          </Form.Group>
  
          <h6 className="mb-3">CESU Coordinator/Proponent(s)</h6>
  
          <Form.Group as={Row} controlId="formLeadProponent" className="mb-3">
            <Form.Label column sm={2}>Lead Proponent</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Enter lead proponent" />
            </Col>
          </Form.Group>
  
          <Form.Group as={Row} controlId="formContactDetails" className="mb-3">
            <Form.Label column sm={2}>Contact Details</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Enter contact details" />
            </Col>
          </Form.Group>
  
          <Form.Group as={Row} controlId="formProjectDescription" className="mb-3">
            <Form.Label column sm={2}>Project Description</Form.Label>
            <Col sm={10}>
              <Form.Control as="textarea" rows={3} placeholder="Enter project description" />
            </Col>
          </Form.Group>
  
          <Form.Group as={Row} controlId="formTargetDate" className="mb-3">
            <Form.Label column sm={2}>Target Date</Form.Label>
            <Col sm={10}>
              <Form.Control type="date" />
            </Col>
          </Form.Group>
  
          <Form.Group as={Row} controlId="formLocation" className="mb-3">
            <Form.Label column sm={2}>Location</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Enter location" />
            </Col>
          </Form.Group>
  
          <h4>B. Project Details</h4>
  
          <Form.Group as={Row} controlId="formPartnerCommunity" className="mb-3">
            <Form.Label column sm={2}>Partner Community/Organization</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Enter partner community/organization" />
            </Col>
          </Form.Group>
  
          <Form.Group as={Row} controlId="formTypology" className="mb-3">
            <Form.Label column sm={2}>Typology</Form.Label>
            <Col sm={10}>
              <Form.Check
                type="checkbox"
                label="School"
              />
              <Form.Check
                type="checkbox"
                label="Barangay"
              />
              <Form.Check
                type="checkbox"
                label="Government Organization"
                onChange={(e) => setGovOrg(e.target.checked)}
              />
              {govOrg && (
                <Form.Control type="text" placeholder="Please specify" className="mt-2" />
              )}
              <Form.Check
                type="checkbox"
                label="Non-Government Organization"
                onChange={(e) => setNonGovOrg(e.target.checked)}
              />
              {nonGovOrg && (
                <Form.Control type="text" placeholder="Please specify" className="mt-2" />
              )}
            </Col>
          </Form.Group>
  
          <Form.Group as={Row} controlId="formNeeds" className="mb-3">
            <Form.Label column sm={2}>Identified Needs of the Partner Community</Form.Label>
            <Col sm={10}>
              <Form.Control as="textarea" rows={3} placeholder="Enter identified needs" />
            </Col>
          </Form.Group>
  
          <Form.Group as={Row} controlId="formObjectives" className="mb-3">
            <Form.Label column sm={2}>General Objectives</Form.Label>
            <Col sm={10}>
              <Form.Control as="textarea" rows={3} placeholder="Enter general objectives" />
            </Col>
          </Form.Group>
  
          <Form.Group as={Row} controlId="formSpecificObjectives" className="mb-3">
            <Form.Label column sm={2}>Specific Objectives</Form.Label>
            <Col sm={10}>
              <Form.Control as="textarea" rows={3} placeholder="Enter specific objectives" />
            </Col>
          </Form.Group>
  
          <Form.Group as={Row} controlId="formSuccessIndicators" className="mb-3">
            <Form.Label column sm={2}>Success Indicators</Form.Label>
            <Col sm={10}>
              <Form.Control as="textarea" rows={3} placeholder="Enter success indicators" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formCooperatingAgencies" className="mb-3">
          <Form.Label column sm={2}>Cooperating Agencies</Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" rows={3} placeholder="Enter cooperating agencies" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formMonitoringMechanics" className="mb-3">
          <Form.Label column sm={2}>Monitoring Mechanics</Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" rows={3} placeholder="Enter monitoring mechanics" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formEvaluationMechanics" className="mb-3">
          <Form.Label column sm={2}>Evaluation Mechanics</Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" rows={3} placeholder="Enter evaluation mechanics" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formTimetable" className="mb-3">
          <Form.Label column sm={2}>Timetable</Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" rows={3} placeholder="Enter timetable" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formRiskAssessment" className="mb-3">
          <Form.Label column sm={2}>Risk Assessment</Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" rows={3} placeholder="Enter risk assessment" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formActionPlans" className="mb-3">
          <Form.Label column sm={2}>Action Plans to Address Risks</Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" rows={3} placeholder="Enter action plans to address risks" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formSustainabilityApproaches" className="mb-3">
          <Form.Label column sm={2}>Sustainability Approaches</Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" rows={3} placeholder="Enter sustainability approaches" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formBudgetRequirement" className="mb-3">
          <Form.Label column sm={2}>Budget Requirement</Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" rows={3} placeholder="Enter budget requirement" />
          </Col>
        </Form.Group>
  
          <Button variant="success" type="submit" className="mt-4">
            Submit
          </Button> 
          
          <Button variant="danger" type="submit" className="mt-4">
            Cancel
          </Button>
        </Form>
      </Container>
    );
};

export default ProposalForm;
import React, { useState } from 'react';
import '../App.css'
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container, InputGroup } from 'react-bootstrap';

const ProposalForm = () => {
  const [govOrg, setGovOrg] = useState(false);
  const [nonGovOrg, setNonGovOrg] = useState(false);

  const navigate = useNavigate();


  return (
    <Container className='Formproposal'>
      <h2 className="mt-4 mb-4" style={{ textAlign: 'center' }} id='propHeader'>Community and Extension Service Project and Activity Proposal</h2>

      <Form className='form'>
        <h4 className="mb-4">A. Basic Details</h4>

        <Form.Group as={Row} controlId="formTitle" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Title of the Project/Activity</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Enter title" />
          </Col>
        </Form.Group>

        <h6 className="mb-4">Covered Period</h6>

        <Form.Group as={Row} controlId="formEngagementDate" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Date of Engagement</Form.Label>
          <Col sm={10}>
            <Form.Control type="date" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formDisengagementDate" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Date of Disengagement</Form.Label>
          <Col sm={10}>
            <Form.Control type="date" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formDepartment" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Department/Program/
            Organization</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Enter department" />
          </Col>
        </Form.Group>

        <h6 className="mb-4">CESU Coordinator/Proponent(s)</h6>

        <Form.Group as={Row} controlId="formLeadProponent" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Lead Proponent</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Enter lead proponent" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formContactDetails" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Contact Details</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Enter contact details" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formProjectDescription" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Project Description</Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" rows={3} placeholder="Enter project description" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formTargetDate" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Target Date</Form.Label>
          <Col sm={10}>
            <Form.Control type="date" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formLocation" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Location</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Enter location" />
          </Col>
        </Form.Group>

        <h4 className="mb-4">B. Project Details</h4>

        <Form.Group as={Row} controlId="formPartnerCommunity" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Partner Community/
            Organization</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Enter partner community/organization" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formTypology" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Typology</Form.Label>
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

        <Form.Group as={Row} controlId="formNeeds" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Identified Needs of the Partner Community</Form.Label>
          <Col sm={10}>
            <Form.Control className="inputFile" type="file" />
            <p className='text-sm'>Note: Please attach the Community Needs Assessment from the Community Profile</p>
            <p className="text-sm">Max Size: 25MB</p>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formObjectives" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>General Objectives</Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" rows={3} placeholder="Enter general objectives" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formSpecificObjectives" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Specific Objectives</Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" rows={3} placeholder="Enter specific objectives" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formSuccessIndicators" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Success Indicators</Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" rows={3} placeholder="Enter success indicators" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formCooperatingAgencies" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Cooperating Agencies</Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" rows={3} placeholder="Enter cooperating agencies" />
            <p className="text-sm">Note: Please discuss the functional relationships and resource requirements with the collaborating agencies.</p>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formMonitoringMechanics" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Monitoring Mechanics</Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" rows={3} placeholder="Enter monitoring mechanics" />
            <p className="text-sm">Note: Please indicate schedule and items to be monitored every activity. </p>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formEvaluationMechanics" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Evaluation Mechanics</Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" rows={3} placeholder="Enter evaluation mechanics" />
            <p className="text-sm">Note: Please indicate schedule and modality of evaluation together with the partner community and CESU Head.</p>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formTimetable" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Timetable</Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" rows={3} placeholder="Enter timetable" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formRiskAssessment" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Risk Assessment</Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" rows={3} placeholder="Enter risk assessment" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formActionPlans" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Action Plans to Address Risks</Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" rows={3} placeholder="Enter action plans to address risks" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formSustainabilityApproaches" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Sustainability Approaches</Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" rows={3} placeholder="Enter sustainability approaches" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formBudgetRequirement" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Budget Requirement</Form.Label>
          <Col sm={10}>
            <Form.Control className="inputFile" type="file" />
            <p className='text-sm'>Note: Please attach Fundraising Activity Proposal, if applicable</p>
            <p className="text-sm">Max Size: 25MB</p>
          </Col>
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button variant="success" type="submit" className="mt-4" id='formbtn' style={{ margin: '.5rem' }}>
            Submit
          </Button>

          <Button onClick={()=> navigate("/coor/pending-proposal")} variant="danger" type="submit" className="mt-4" id='formbtn' style={{ margin: '.5rem' }}>
            Cancel
          </Button>
        </div>

      </Form>
      <div style={{ padding: '10px' }}></div>
    </Container>
  );
};

export default ProposalForm;
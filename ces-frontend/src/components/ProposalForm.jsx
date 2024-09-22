import React, { useState } from 'react';
import '../App.css'
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container} from 'react-bootstrap';

// import axios from 'axios';

const ProposalForm = () => {
  const [govOrg, setGovOrg] = useState(false);
  const [nonGovOrg, setNonGovOrg] = useState(false);

  // State to hold the form data
  const [formData, setFormData] = useState({
    title: '',
    engagement_date: '',
    disengagement_date: '',
    department: '',
    lead_proponent: '',
    contact_details: '',
    project_description: '',
    target_date: '',
    location: '',
    partner_community: '',
    school: false,
    barangay: false,
    government_org: '',
    non_government_org: '',
    identified_needs: null, // for file upload
    general_objectives: '',
    specific_objectives: '',
    success_indicators: '',
    cooperating_agencies: '',
    monitoring_mechanics: '',
    evaluation_mechanics: '',
    timetable: '',
    risk_assessment: '',
    action_plans: '',
    sustainability_approaches: '',
    budget_requirement: null // for file upload
  });

  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0]
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();

    // Append each field to the FormData
    for (let key in formData) {
      submitData.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/proposals/', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}` // Include authorization token if required
        }
      });

      if (response.status === 201) {
        // Redirect to pending proposals page on success
        navigate('/coor/pending-proposal');
      }
    } catch (error) {
      console.error('Error submitting proposal:', error);
    }
  };


  return (
    <Container className='Formproposal'>
      <h2 className="mt-4 mb-4" style={{ textAlign: 'center' }} id='propHeader'>Community and Extension Service Project and Activity Proposal</h2>
  
      <Form className='form' onSubmit={handleSubmit}>
        <h4 className="mb-4">A. Basic Details</h4>
  
        <Form.Group as={Row} controlId="formTitle" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Title of the Project/Activity</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
  
        <h6 className="mb-4">Covered Period</h6>
  
        <Form.Group as={Row} controlId="formEngagementDate" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Date of Engagement</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="date"
              name="engagement_date"
              value={formData.engagement_date}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
  
        <Form.Group as={Row} controlId="formDisengagementDate" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Date of Disengagement</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="date"
              name="disengagement_date"
              value={formData.disengagement_date}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
  
        <Form.Group as={Row} controlId="formDepartment" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Department/Program/Organization</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter department"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
  
        <h6 className="mb-4">CESU Coordinator/Proponent(s)</h6>
  
        <Form.Group as={Row} controlId="formLeadProponent" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Lead Proponent</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter lead proponent"
              name="lead_proponent"
              value={formData.lead_proponent}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
  
        <Form.Group as={Row} controlId="formContactDetails" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Contact Details</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter contact details"
              name="contact_details"
              value={formData.contact_details}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
  
        <Form.Group as={Row} controlId="formProjectDescription" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Project Description</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter project description"
              name="project_description"
              value={formData.project_description}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
  
        <Form.Group as={Row} controlId="formTargetDate" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Target Date</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="date"
              name="target_date"
              value={formData.target_date}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
  
        <Form.Group as={Row} controlId="formLocation" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Location</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
  
        <h4 className="mb-4">B. Project Details</h4>
  
        <Form.Group as={Row} controlId="formPartnerCommunity" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Partner Community/Organization</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter partner community/organization"
              name="partner_community"
              value={formData.partner_community}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
  
        <Form.Group as={Row} controlId="formTypology" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Typology</Form.Label>
          <Col sm={10}>
            <Form.Check
              type="checkbox"
              label="School"
              name="school"
              checked={formData.school}
              onChange={handleChange}
            />
            <Form.Check
              type="checkbox"
              label="Barangay"
              name="barangay"
              checked={formData.barangay}
              onChange={handleChange}
            />
            <Form.Check
              type="checkbox"
              label="Government Organization"
              checked={govOrg}
              onChange={(e) => setGovOrg(e.target.checked)}
            />
            {govOrg && (
              <Form.Control
                type="text"
                placeholder="Please specify"
                name="government_org"
                value={formData.government_org}
                onChange={handleChange}
                className="mt-2"
              />
            )}
            <Form.Check
              type="checkbox"
              label="Non-Government Organization"
              checked={nonGovOrg}
              onChange={(e) => setNonGovOrg(e.target.checked)}
            />
            {nonGovOrg && (
              <Form.Control
                type="text"
                placeholder="Please specify"
                name="non_government_org"
                value={formData.non_government_org}
                onChange={handleChange}
                className="mt-2"
              />
            )}
          </Col>
        </Form.Group>
  
        <Form.Group as={Row} controlId="formNeeds" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Identified Needs of the Partner Community</Form.Label>
          <Col sm={10}>
            <Form.Control
              className="inputFile"
              type="file"
              name="identified_needs"
              onChange={handleFileChange}
            />
            <p className='text-sm'>Max Size: 25MB</p>
          </Col>
        </Form.Group>
  
        <Form.Group as={Row} controlId="formObjectives" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>General Objectives</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter general objectives"
              name="general_objectives"
              value={formData.general_objectives}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
  
        <Form.Group as={Row} controlId="formSpecificObjectives" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Specific Objectives</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter specific objectives"
              name="specific_objectives"
              value={formData.specific_objectives}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
  
        <Form.Group as={Row} controlId="formSuccessIndicators" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Success Indicators</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter success indicators"
              name="success_indicators"
              value={formData.success_indicators}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
  
        <Form.Group as={Row} controlId="formCooperatingAgencies" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Cooperating Agencies</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter cooperating agencies"
              name="cooperating_agencies"
              value={formData.cooperating_agencies}
              onChange={handleChange}
            />
            <p className="text-sm">Note: Please discuss the functional relationships and resource requirements with the collaborating agencies.</p>
          </Col>
        </Form.Group>
  
        <Form.Group as={Row} controlId="formMonitoringMechanics" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Monitoring Mechanics</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter monitoring mechanics"
              name="monitoring_mechanics"
              value={formData.monitoring_mechanics}
              onChange={handleChange}
            />
            <p className="text-sm">Note: Please indicate schedule and items to be monitored every activity.</p>
          </Col>
        </Form.Group>
  
        <Form.Group as={Row} controlId="formEvaluationMechanics" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Evaluation Mechanics</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter evaluation mechanics"
              name="evaluation_mechanics"
              value={formData.evaluation_mechanics}
              onChange={handleChange}
            />
            <p className="text-sm">Note: Please indicate schedule and modality of evaluation together with the partner community and CESU Head.</p>
          </Col>
        </Form.Group>
  
        <Form.Group as={Row} controlId="formTimetable" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Timetable</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter timetable"
              name="timetable"
              value={formData.timetable}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
  
        <Form.Group as={Row} controlId="formRiskAssessment" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Risk Assessment</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter risk assessment"
              name="risk_assessment"
              value={formData.risk_assessment}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
  
        <Form.Group as={Row} controlId="formActionPlans" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Action Plans to Address Risks</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter action plans to address risks"
              name="action_plans"
              value={formData.action_plans}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
  
        <Form.Group as={Row} controlId="formSustainabilityApproaches" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Sustainability Approaches</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter sustainability approaches"
              name="sustainability_approaches"
              value={formData.sustainability_approaches}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
  
        <Form.Group as={Row} controlId="formBudgetRequirement" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Budget Requirement</Form.Label>
          <Col sm={10}>
            <Form.Control
              className="inputFile"
              type="file"
              name="budget_requirement"
              onChange={handleFileChange}
            />
            <p className='text-sm'>Max Size: 25MB</p>
          </Col>
        </Form.Group>
  
        <div className="d-flex justify-content-end">
          <Button variant="success" type="submit" className="mt-4" id='formbtn' style={{ margin: '.5rem' }}>
            Submit
          </Button>
  
          <Button onClick={() => navigate("/coor/pending-proposal")} variant="danger" className="mt-4" id='formbtn' style={{ margin: '.5rem' }}>
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
  
};

export default ProposalForm;
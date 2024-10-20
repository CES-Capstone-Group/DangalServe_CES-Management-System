import React, { useState } from 'react';
import '/src/App.css';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const ProposalForm = () => {
  const { proposalId } = useParams(); // Retrieve proposal ID from URL
  const [isResubmission, setIsResubmission] = useState(false); // To track if it's a resubmission
  const [govOrg, setGovOrg] = useState(false);
  const [nonGovOrg, setNonGovOrg] = useState(false);
  const [otherCommunity, setOtherCommunity] = useState(false); // Track if "Others" is selected
  const [otherCommunityValue, setOtherCommunityValue] = useState(''); // Store the "Others" value
  const [otherTypology, setOtherTypology] = useState(false); // Track if "Others" is selected
  const [otherTypologyValue, setOtherTypologyValue] = useState(''); // Store the "Others" value

  // State to hold the form data
  const [formData, setFormData] = useState({
    title: '',
    engagement_date: '',
    disengagement_date: '',
    department: '',
    contact_details: '',
    project_description: '',
    target_date: '',
    location: '',
    partner_community: [], // Array for checkboxes
    school: false,
    barangay: false,
    government_org: '',
    non_government_org: '',
    identified_needs_text: '',
    identified_needs_file: null, // for file upload
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
    budget_requirement_text: '',
    budget_requirement_file: null, // for file upload
    is_three_year_plan: false,  // New field for Three-Year plan
    is_one_year_plan: false,  // New field for One-Year plan
    status: 'Pending',
  });

  // Proponents array to hold all proponents
  const [proponents, setProponents] = useState([]);
  const [proponent, setProponent] = useState({ name: '', position: '' });

  // Handle input change for proponent name and position
  const handleProponentChange = (e) => {
    const { name, value } = e.target;
    setProponent({
      ...proponent,
      [name]: value,
    });
  };

  // Add a new proponent to the list
  const handleAddProponent = () => {
    if (proponent.name && proponent.position) {
      setProponents([...proponents, proponent]); // Add the proponent
      setProponent({ name: '', position: '' });  // Clear the inputs
    }
  };

  const [isThreeYearPlan, setIsThreeYearPlan] = useState(false);
  const [isOneYearPlan, setIsOneYearPlan] = useState(false);

  // State for each signatory section
  const [preparedBy, setPreparedBy] = useState([]);
  const [endorsedBy, setEndorsedBy] = useState([]);
  const [concurredBy, setConcurredBy] = useState([]);

  // Separate states for each section's signatory
  const [preparedBySignatory, setPreparedBySignatory] = useState({ name: '', position: '' });
  const [endorsedBySignatory, setEndorsedBySignatory] = useState({ name: '', position: '' });
  const [concurredBySignatory, setConcurredBySignatory] = useState({ name: '', position: '' });

  // Handle input changes for each section
  const handlePreparedByChange = (e) => {
    const { name, value } = e.target;
    setPreparedBySignatory({
      ...preparedBySignatory,
      [name]: value,
    });
  };

  const handleEndorsedByChange = (e) => {
    const { name, value } = e.target;
    setEndorsedBySignatory({
      ...endorsedBySignatory,
      [name]: value,
    });
  };

  const handleConcurredByChange = (e) => {
    const { name, value } = e.target;
    setConcurredBySignatory({
      ...concurredBySignatory,
      [name]: value,
    });
  };

  const [signatories, setSignatories] = useState([]);

  // Add a new signatory to the respective section
  const handleAddSignatory = (section) => {
    if (section === 'prepared' && preparedBySignatory.name && preparedBySignatory.position) {
      setSignatories([...signatories, { ...preparedBySignatory, section: 'prepared' }]);
      setPreparedBy([...preparedBy, preparedBySignatory]);
      setPreparedBySignatory({ name: '', position: '' });
    } else if (section === 'endorsed' && endorsedBySignatory.name && endorsedBySignatory.position) {
      setSignatories([...signatories, { ...endorsedBySignatory, section: 'endorsed' }]);
      setEndorsedBy([...endorsedBy, endorsedBySignatory]);
      setEndorsedBySignatory({ name: '', position: '' });
    } else if (section === 'concurred' && concurredBySignatory.name && concurredBySignatory.position) {
      setSignatories([...signatories, { ...concurredBySignatory, section: 'concurred' }]);
      setConcurredBy([...concurredBy, concurredBySignatory]);
      setConcurredBySignatory({ name: '', position: '' });
    }
  };

  useEffect(() => {
    // Check if partner_community is a string before splitting
    if (typeof formData.partner_community === 'string') {
      const communities = formData.partner_community.split(','); // Split by commas
      setFormData((prevData) => ({
        ...prevData,
        partner_community: communities,
      }));
    }
  }, [formData.partner_community]);

  useEffect(() => {
    if (proposalId) {
      setIsResubmission(true);
      const fetchProposalData = async () => {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`http://127.0.0.1:8000/api/proposals/${proposalId}/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setFormData(data); // Pre-fill form with existing proposal data
          setProponents(data.proponents || []);  // Pre-fill proponents if any
        } else {
          console.error('Failed to fetch proposal data');
        }
      };

      fetchProposalData();
    }
  }, [proposalId]);

  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle partner community checkboxes
  const handleCommunityChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const updatedCommunities = checked
        ? [...prevData.partner_community, value] // Add checked community
        : prevData.partner_community.filter((comm) => comm !== value); // Remove unchecked community
      return { ...prevData, partner_community: updatedCommunities };
    });
  };

  // Handle Other Community input field visibility
  const handleOtherCommunityChange = (e) => {
    setOtherCommunity(e.target.checked);
    if (!e.target.checked) {
      setOtherCommunityValue('');
    }
  };

  // Handle Other Typology input field visibility
  const handleOtherTypologyChange = (e) => {
    setOtherTypology(e.target.checked);
    if (!e.target.checked) {
      setOtherTypologyValue('');
    }
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  // Handle form submission
  // Now in the handleSubmit, use the correct reference

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    const token = localStorage.getItem('access_token');

    // Append form fields except for proponents, signatories, and files
    Object.keys(formData).forEach(key => {
      if (formData[key] && key !== 'proponents' && key !== 'signatories' && key !== 'identified_needs_file' && key !== 'budget_requirement_file') {
        submitData.append(key, formData[key]);
      }
    });

    // Append file fields if they exist
    if (formData.identified_needs_file instanceof File) {
      submitData.append('identified_needs_file', formData.identified_needs_file);
    }
    if (formData.budget_requirement_file instanceof File) {
      submitData.append('budget_requirement_file', formData.budget_requirement_file);
    }

    submitData.append('is_three_year_plan', formData.is_three_year_plan ? 'true' : 'false');
    submitData.append('is_one_year_plan', formData.is_one_year_plan ? 'true' : 'false');

    const leadProponentString = proponents.map(p => p.name).join(', ');
    submitData.append('lead_proponent', leadProponentString);

    // Send proponents and signatories as JSON strings
    if (proponents.length > 0) {
      submitData.append('proponents', JSON.stringify(proponents)); // Sends proponents as a JSON array
    }

    if (signatories.length > 0) {
      submitData.append('signatories', JSON.stringify(signatories)); // Sends signatories as a JSON array
    }

    try {
      if (!token) {
        console.error('No token found. Please log in.');
        return;
      }
      let url = 'http://127.0.0.1:8000/api/proposals/';
      let method = 'POST';

      if (isResubmission) {
        url = `http://127.0.0.1:8000/api/proposals/${proposalId}/resubmit/`;
        method = 'PATCH'; // Use PATCH for resubmissions
      }

      const response = await fetch(url, {
        method: method,
        body: submitData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        navigate('/coor/pending-proposal');
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
      }
    } catch (error) {
      console.error('Error submitting proposal:', error);
    }
  };




  return (
    <Container className='Formproposal'>
      <h2 className="mt-4 mb-4" style={{ textAlign: 'center' }} id='propHeader'>
        Community and Extension Service Project and Activity Proposal
      </h2>

      <Form className='form' onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formPartnerCommunity" className="mb-4">
          <Col sm={5}>
            <h4 className="mb-4">Please Check</h4>
            <Form.Check
              type="checkbox"
              label="Three-Year-Medium-Term Plan for Community Extension¹"
              value="Three-Year"
              checked={formData.is_three_year_plan}
              onChange={(e) => {
                setIsThreeYearPlan(e.target.checked);
                setFormData((prevData) => ({
                  ...prevData,
                  is_three_year_plan: e.target.checked, // Update formData with this value
                }));
              }}
            />
            <Form.Check
              type="checkbox"
              label="Less than a Year-One-Year Plan for Community Service²"
              value="LessThanYear"
              checked={formData.is_one_year_plan}
              onChange={(e) => {
                setIsOneYearPlan(e.target.checked);
                setFormData((prevData) => ({
                  ...prevData,
                  is_one_year_plan: e.target.checked, // Update formData with this value
                }));
              }}
            />
          </Col>
        </Form.Group>
        <h4 className="mb-4">A. Basic Details</h4>

        {/* Title Field */}
        <Form.Group as={Row} controlId="formTitle" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Title of the Project/Activity</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter title"
              name="title"
              value={formData.title}
              required={true}
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

        <h6 className="mb-4">CESU Coordinator/Proponent(s)</h6>
        {proponents.length > 0 && (
          <div className="mb-3">
            <h5>Proponents List</h5>
            <ul>
              {proponents.map((p, index) => (
                <li key={index}>
                  {p.name} - {p.position}
                </li>
              ))}
            </ul>
          </div>
        )}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Name</Form.Label>
          <Col sm={3}>
            <Form.Control
              type="text"
              placeholder="Enter proponent name"
              name="name"
              value={proponent.name}
              onChange={handleProponentChange}
            />
          </Col>
          <Form.Label column sm={2}>Position/Title</Form.Label>
          <Col sm={3}>
            <Form.Control
              type="text"
              placeholder="Enter position/title"
              name="position"
              value={proponent.position}
              onChange={handleProponentChange}
            />
          </Col>
        </Form.Group>
        <Button variant="success" onClick={handleAddProponent} className="mb-2">
          Add Proponent
        </Button>

        {/* Contact Details */}
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
          <Col sm={5}>
            <h6 className="mb-4">Partner Community/Organization</h6>
            <Form.Check
              type="checkbox"
              label="Baclaran"
              value="Baclaran"
              checked={formData.partner_community.includes('Baclaran')}
              onChange={(e) => handleCommunityChange(e, 'Baclaran', 'Barangay')}

            />
            <Form.Check
              type="checkbox"
              label="Bigaa"
              value="Bigaa"
              checked={formData.partner_community.includes('Bigaa')}
              onChange={(e) => handleCommunityChange(e, 'Bigaa', 'Barangay')}
            />
            <Form.Check
              type="checkbox"
              label="Sala"
              value="Sala"
              checked={formData.partner_community.includes('Sala')}
              onChange={(e) => handleCommunityChange(e, 'Sala', 'Barangay')}
            />
            <Form.Check
              type="checkbox"
              label="San Isidro"
              value="San Isidro"
              checked={formData.partner_community.includes('San Isidro')}
              onChange={(e) => handleCommunityChange(e, 'San Isidro', 'Barangay')}
            />
            <Form.Check
              type="checkbox"
              label="Diezmo"
              value="Diezmo"
              checked={formData.partner_community.includes('Diezmo')}
              onChange={(e) => handleCommunityChange(e, 'Diezmo', 'Barangay')}
            />
            <Form.Check
              type="checkbox"
              label="Others"
              // checked={formData.partner_community.includes('Others')}
              onChange={handleOtherCommunityChange}
            />
            {otherCommunity && (
              <Form.Control
                type="text"
                placeholder="Please specify"
                className="mt-2"
                value={otherCommunityValue}
                onChange={(e) => setOtherCommunityValue(e.target.value)}
              />
            )}
          </Col>

          <Col sm={5}>
            <h6 className="mb-4">Typology</h6>
            <Form.Check
              type="checkbox"
              label="School"
              name="school"
              onChange={handleChange}
              checked={formData.school}
            />
            <Form.Check
              type="checkbox"
              label="Barangay"
              name="barangay"
              onChange={handleChange}
              checked={formData.barangay}
            />
            <Form.Check
              type="checkbox"
              label="Government Organization"
              name="government_org"
              onChange={(e) => handleChange({ target: { name: 'government_org', value: e.target.checked ? 'Yes' : '' } })}
              checked={formData.government_org === 'Yes'}
            />
            <Form.Check
              type="checkbox"
              label="Non-Government Organization"
              name="non_government_org"
              onChange={(e) => handleChange({ target: { name: 'non_government_org', value: e.target.checked ? 'Yes' : '' } })}
              checked={formData.non_government_org === 'Yes'}
            />
            <Form.Check
              type="checkbox"
              label="Others"
              // checked={formData.partner_community.includes('Others')}
              onChange={handleOtherTypologyChange}
            />
            {otherTypology && (
              <Form.Control
                type="text"
                placeholder="Please specify"
                className="mt-2"
                value={otherTypologyValue}
                onChange={(e) => setOtherTypologyValue(e.target.value)}
              />
            )}
          </Col>
        </Form.Group>

        {/* Identified Needs of the Partner Community */}
        <Form.Group as={Row} controlId="formNeeds" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Identified Needs of the Partner Community</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter identified needs"
              name="identified_needs_text"
              value={formData.identified_needs_text}
              onChange={handleChange}
            />
            <div className="mt-3">or upload a file:</div>
            <Form.Control
              className="inputFile"
              type="file"
              name="identified_needs_file"
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

        {/* Budget Requirement */}
        <Form.Group as={Row} controlId="formBudgetRequirement" className="mb-4">
          <Form.Label column sm={2} id='formlabel'>Budget Requirement</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter budget requirement"
              name="budget_requirement_text"
              value={formData.budget_requirement_text}
              onChange={handleChange}
            />
            <div className="mt-3">or upload a file:</div>
            <Form.Control
              className="inputFile"
              type="file"
              name="budget_requirement_file"
              onChange={handleFileChange}
            />
            <p className='text-sm'>Max Size: 25MB</p>
          </Col>
        </Form.Group>

        {/* Signatory List Section */}
        <h4>Signatory List</h4>
        <p className='text-sm mb-4'>Please provide names and titles/positions of individuals required to sign this document.</p>

        {/* Prepared By Section */}
        <h5 className="mb-3">Prepared By:</h5>
        {preparedBy.length > 0 && (
          <ul>
            {preparedBy.map((p, index) => (
              <li key={index}>
                {p.name} - {p.position}
              </li>
            ))}
          </ul>
        )}
        <Row className="mb-3">
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={preparedBySignatory.name}
                onChange={handlePreparedByChange}
                placeholder="Enter name"
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Position/Title</Form.Label>
              <Form.Control
                type="text"
                name="position"
                value={preparedBySignatory.position}
                onChange={handlePreparedByChange}
                placeholder="Enter position/title"
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="success" onClick={() => handleAddSignatory('prepared')} className="mb-4">
          + Add Prepared By
        </Button>

        {/* Endorsed By Section */}
        <h5 className="mb-3">Endorsed By:</h5>
        {endorsedBy.length > 0 && (
          <ul>
            {endorsedBy.map((p, index) => (
              <li key={index}>
                {p.name} - {p.position}
              </li>
            ))}
          </ul>
        )}
        <Row className="mb-3">
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={endorsedBySignatory.name}
                onChange={handleEndorsedByChange}
                placeholder="Enter name"
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Position/Title</Form.Label>
              <Form.Control
                type="text"
                name="position"
                value={endorsedBySignatory.position}
                onChange={handleEndorsedByChange}
                placeholder="Enter position/title"
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="success" onClick={() => handleAddSignatory('endorsed')} className="mb-4">
          + Add Endorsed By
        </Button>

        {/* Concurred By Section */}
        <h5 className="mb-3">Concurred By:</h5>
        {concurredBy.length > 0 && (
          <ul>
            {concurredBy.map((p, index) => (
              <li key={index}>
                {p.name} - {p.position}
              </li>
            ))}
          </ul>
        )}
        <Row className="mb-3">
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={concurredBySignatory.name}
                onChange={handleConcurredByChange}
                placeholder="Enter name"
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group>
              <Form.Label>Position/Title</Form.Label>
              <Form.Control
                type="text"
                name="position"
                value={concurredBySignatory.position}
                onChange={handleConcurredByChange}
                placeholder="Enter position/title"
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="success" onClick={() => handleAddSignatory('concurred')} className="mb-4">
          + Add Concurred By
        </Button>

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

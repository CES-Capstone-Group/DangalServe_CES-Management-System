import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Modal, Row, Col, Form, InputGroup, Container } from "react-bootstrap";

const BtnAddSchedule = ({ showModal, handleCloseModal, handleShowModal, selectedDate, addNewEvent }) => {
    const [fileInputs, setFileInputs] = useState([{ id: 1 }]);
    const [activityTitle, setActivityTitle] = useState(""); // For capturing activity title
    const [targetTime, setTargetTime] = useState(""); // For capturing target time  
    const [manualDate, setManualDate] = useState(selectedDate || new Date().toISOString().split('T')[0]); // Default to today's date if not selected
    const [proposalTitle, setProposalTitle] = useState("");  // For capturing proposal title
    const [proposals, setProposals] = useState([]);//for drop down menu
    const [error, setError] = useState(null);
    const [loadingProposals, setLoadingProposals] = useState(true);
    
    const handleAddSchedule = () => {
        if (!activityTitle || !manualDate || !targetTime || !proposalTitle) {
            alert("Please fill in all the details.");
            return;
        }
    
        const eventStart = `${manualDate}T${targetTime}`;
    
        console.log("Selected proposal title:", proposalTitle);
        const selectedProposal = proposals.find(proposal => 
            proposal.title.trim().toLowerCase() === proposalTitle.trim().toLowerCase()
        );
    
        if (!selectedProposal) {
            console.error(`Proposal ID not found for title: ${proposalTitle}`);
            return;
        }
    
        const proposalId = selectedProposal.proposal_id;
    
        const newEvent = {
            title: activityTitle,
            start: eventStart,
            extendedProps: {
                proposal: proposalId  // Correctly setting proposal ID here
            }
        };
    
        addNewEvent(newEvent);
        handleCloseModal();
    
        setActivityTitle("");
        setTargetTime("");
        setManualDate(new Date().toISOString().split('T')[0]);
        setProposalTitle("");
    };
    
     // Fetch proposals from API
     const fetchProposals = async () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            console.error("No token found.");
            setLoadingProposals(false);
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/proposals/?status=Approved%20by%20Barangay", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setProposals(data); // Use correct state setter here
            } else {
                console.error("Error fetching approved proposals:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching approved proposals:", error);
            setError("Failed to load proposals");
        } finally {
            setLoadingProposals(false);
        }
    };
    
    useEffect(() => {
        fetchProposals();
    }, []);

    // Handle adding a new file input field
    const handleAddMoreFile = () => {
        setFileInputs([...fileInputs, { id: fileInputs.length + 1 }]);
    };

    // Handle removing a file input field
    const handleRemoveFile = (id) => {
        setFileInputs(fileInputs.filter(input => input.id !== id));
    };

    // Handle file input change
    const handleFileChange = (e, id) => {
        const files = e.target.files;
        console.log(`Files for input ${id}:`, files);
    };

    // Format target time for HTML input
    const handleTimeChange = (e) => {
        const time = e.target.value;
        setTargetTime(time.slice(0, 5)); // Set time in HH:mm format
    };

    return (
        <div className="d-flex justify-content-start m-3">
            <div>
                <Button
                    style={{ backgroundColor: "#71A872", border: '0px', color: 'white' }}
                    onClick={handleShowModal} // Show the modal when clicked
                >
                    Add Schedule
                </Button>
            </div>

            {/* Modal for Activity Details */}
            <Modal backdrop="static" centered size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Button onClick={handleCloseModal} className="me-5 mb-5 p-0 ps-2 pe-2" variant="success">Back</Button>
                    <Modal.Title>Activity Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className="">
                    <Form>
                        <Form.Group className="mb-3" as={Row} controlId="proposalTitle">
                            <Form.Label column sm={2}>Proposal:</Form.Label>
                            <Col>
                            <Form.Select
                                value={proposalTitle}
                                onChange={(e) => setProposalTitle(e.target.value)}  // Bind to state
                            >
                                <option value="" disabled>Select Proposal</option>
                                {proposals.map((proposal) => (
                                    <option key={proposal.id} value={proposal.title}> {/* Use proposal.id here */}
                                        {proposal.title} {/* Display proposal title */}
                                    </option>
                                ))}
                            </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="txtActivityTitle">
                            <Form.Label column sm={2} className="h5">Activity Title:</Form.Label>
                            <Col>
                                <InputGroup>
                                    <Form.Control
                                        className="input"
                                        type="text"
                                        placeholder="Enter activity title"
                                        value={activityTitle}
                                        onChange={(e) => setActivityTitle(e.target.value)} // Bind to state
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="DateActivity">
                            <Form.Label column sm={2} className="h5">Target Date:</Form.Label>
                            <Col>
                                <InputGroup>
                                    <Form.Control
                                        className="input"
                                        type="date"
                                        value={manualDate}
                                        onChange={(e) => setManualDate(e.target.value)}
                                    />
                                </InputGroup>
                            </Col>
                            <Form.Label column sm={2} className="h5">Target Time:</Form.Label>
                            <Col>
                                <InputGroup>
                                    <Form.Control
                                        className="input"
                                        type="time"
                                        placeholder="Enter time"
                                        value={targetTime}
                                        onChange={handleTimeChange}
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        {fileInputs.map((input, index) => (
                            <Form.Group as={Row} className="mb-3 align-items-center" controlId={`file-${input.id}`} key={input.id}>
                                <Form.Label column sm={2} className="h5">
                                    File {index + 1}
                                </Form.Label>
                                <Col className="d-flex align-items-center">
                                    <InputGroup>
                                        <Form.Control
                                            className="inputFile"
                                            type="file"
                                            name={`file-${input.id}`}
                                            onChange={(e) => handleFileChange(e, input.id)}
                                            style={{ height: '38px' }}
                                        />
                                        {fileInputs.length > 1 && (
                                            <Button
                                                onClick={() => handleRemoveFile(input.id)}
                                                variant="danger"
                                                className="d-flex align-items-center"
                                                style={{ height: '38px' }}>
                                                <FontAwesomeIcon icon={faMinus} />
                                            </Button>
                                        )}
                                    </InputGroup>
                                </Col>
                                <p className="text-sm">Max Size: 25MB</p>
                            </Form.Group>
                        ))}

                        {/* Button to add a new file input */}
                        <Container fluid className="d-flex justify-content-center align-items-center">
                            <Button onClick={handleAddMoreFile} variant="success" className="mt-2">
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </Container>
                    </Form>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center">
                    <Button size="lg" variant="success" onClick={handleAddSchedule}>
                        Add Schedule
                    </Button>
                    <Button size="lg" variant="danger" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BtnAddSchedule;

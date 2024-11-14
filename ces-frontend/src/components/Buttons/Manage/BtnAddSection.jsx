import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";

const BtnAddSection = ({ onSectionAdded }) => {  
    const [showModal, setShowModal] = useState(false);
    const [sectionLabel, setSectionLabel] = useState("");
    const [sectionType, setSectionType] = useState("");  // Track section type
    const [questionType, setQuestionType] = useState("");  // Track question type
    const [ratingScale, setRatingScale] = useState(5);  // Default rating scale
    const [informationContent, setInformationContent] = useState("");  // Content for information section
    const [additionalInfo, setAdditionalInfo] = useState("");  // Additional info for question type "Information"
    const [isFixed, setIsFixed] = useState(false); // Track if the section is fixed (required)

    const handleShowModal = () => setShowModal(true);

    const handleCloseModal = () => {
        setShowModal(false);
        setSectionLabel("");
        setSectionType("");
        setQuestionType("");
        setRatingScale(5);
        setInformationContent("");
        setAdditionalInfo("");
        setIsFixed(false);
    };

    const handleSectionTypeChange = (e) => {
        const value = e.target.value;
        setSectionType(value);
        
        // Reset question type if section type is not "question"
        if (value !== "question") {
            setQuestionType("");
        }
    };

    const handleAddSection = () => {
        const newSection = {
            id: Date.now(),  // Temporary unique ID
            section: sectionLabel,
            type: sectionType,
            questionType: questionType,
            ratingScale: questionType === "rating" ? ratingScale : null,
            choices: questionType === "multiple choice" ? [] : null,
            informationContent: sectionType === "information" ? informationContent : null,
            additionalInfo: questionType === "information" ? additionalInfo : null,  // Include additional info for information question type
            isFixed: isFixed // Track if section is fixed (required)
        };
        onSectionAdded(newSection);
        handleCloseModal();
    };

    return (
        <div style={{ width: "100%" }}>
            <Button 
                className="shadow w-100" 
                style={{ backgroundColor: "#71A872", border: '0px', color: 'white' }} 
                onClick={handleShowModal}>
                <FontAwesomeIcon icon={faPlus}/>
                <span className="h5"> Add Section </span>
            </Button>

            <Modal backdrop="static" centered size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Button onClick={handleCloseModal} className="me-5 mb-5 p-0 ps-2 pe-2" variant="success">Back</Button>
                    <Modal.Title> Add New Section </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Section:</Form.Label>
                            <Col>
                                <Form.Control 
                                    type="text"
                                    placeholder="Enter section label"
                                    value={sectionLabel}
                                    onChange={(e) => setSectionLabel(e.target.value)} 
                                />
                            </Col>
                        </Form.Group>

                        {/* Section Type Dropdown */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Section Type:</Form.Label>
                            <Col>
                                <Form.Control 
                                    as="select" 
                                    value={sectionType}
                                    onChange={handleSectionTypeChange}
                                >
                                    <option value="">Select Type</option>
                                    <option value="question">Question</option>
                                    <option value="information">Information</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        {/* If "Information" is selected as Section Type, show text field for content */}
                        {sectionType === "information" && (
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Information Content:</Form.Label>
                                <Col>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter information content"
                                        value={informationContent}
                                        onChange={(e) => setInformationContent(e.target.value)}
                                    />
                                </Col>
                            </Form.Group>
                        )}

                        {/* If "Question" is selected as Section Type, show Question Type */}
                        {sectionType === "question" && (
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Question Type:</Form.Label>
                                <Col>
                                    <Form.Control 
                                        as="select" 
                                        value={questionType}
                                        onChange={(e) => setQuestionType(e.target.value)}
                                    >
                                        <option value="">Select Question Type</option>
                                        <option value="multiple choice">Multiple Choice</option>
                                        <option value="rating">Rating</option>
                                        <option value="information">Information</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                        )}

                        {/* If "Information" is selected as Question Type, show additional info text field */}
                        {questionType === "information" && (
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Additional Information:</Form.Label>
                                <Col>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter additional information for this question"
                                        value={additionalInfo}
                                        onChange={(e) => setAdditionalInfo(e.target.value)}
                                    />
                                </Col>
                            </Form.Group>
                        )}

                        {/* If "Rating" is selected as Question Type, show rating scale */}
                        {questionType === "rating" && (
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>Rating Scale:</Form.Label>
                                <Col>
                                    <Form.Control 
                                        type="number"
                                        min={1}
                                        max={10}
                                        value={ratingScale}
                                        onChange={(e) => setRatingScale(Number(e.target.value))}
                                    />
                                </Col>
                            </Form.Group>
                        )}

                        {/* Fixed Checkbox with User-Friendly Label */}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Required Section:</Form.Label>
                            <Col>
                                <Form.Check 
                                    type="checkbox"
                                    label="Automatically include this section in every new form"
                                    checked={isFixed}
                                    onChange={(e) => setIsFixed(e.target.checked)}
                                />
                                <Form.Text className="text-muted">
                                    Note: If selected, this section will be automatically included in every new form.
                                </Form.Text>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center">
                    <Button variant="success" onClick={handleAddSection}>  
                        Add Section
                    </Button>
                    <Button onClick={handleCloseModal} variant="danger">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BtnAddSection;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Table, Button, Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import BtnAddQuestion from "./Buttons/Manage/BtnAddQuestion.jsx";
import BtnAddSection from "./Buttons/Manage/BtnAddSection.jsx";  // Import BtnAddSection

import "./table.css";

const ManageEvaluationForm = () => {
    const location = useLocation();
    const { formId } = location.state || {};  // Retrieve formId from state
    const navigate = useNavigate();

    const [isAddQuestionModalOpen, setAddQuestionModalOpen] = useState(false);
    const [addQuestionType, setAddQuestionType] = useState(null);
    const [formDetails, setFormDetails] = useState({
        title: "",
        description: ""
    });
    const [sections, setSections] = useState([]);

    // Fetch the form details and sections when component mounts
    useEffect(() => {
        if (!formId) {
            console.error("Form ID is missing.");
            return;
        }

        // Fetch form details based on formId
        const fetchFormDetails = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/evaluation/evaluation-types/${formId}/`);
                if (!response.ok) {
                    throw new Error("Failed to fetch form details");
                }
                const data = await response.json();
                
                // Update form details and sections with data from response
                setFormDetails({
                    title: data.name,
                    description: data.description
                });
                setSections(data.sections || []); // Assuming `sections` are part of the response
            } catch (error) {
                console.error("Error fetching form details:", error);
            }
        };

        fetchFormDetails();
    }, [formId]);

    const handleBack = () => {
        navigate(-1);
    };

    const handleAddQuestionClick = (type) => {
        setAddQuestionType(type);
        setAddQuestionModalOpen(true);
    };

    const handleSaveTextSection = (id, label, content) => {
        setSections(sections.map(section =>
            section.id === id ? { ...section, section: label, content } : section
        ));
    };

    const handleAddNewSection = (newSection) => {
        setSections([...sections, newSection]);
    };

    const renderTextSection = (section) => {
        const [isEditing, setIsEditing] = useState(false);
        const [textContent, setTextContent] = useState(section.content);
        const [sectionLabel, setSectionLabel] = useState(section.section);

        const handleSave = () => {
            setIsEditing(false);
            handleSaveTextSection(section.id, sectionLabel, textContent);
        };

        return (
            <div className="mb-5" key={section.id}>
                {isEditing ? (
                    <>
                        <Form.Control
                            type="text"
                            value={sectionLabel}
                            onChange={(e) => setSectionLabel(e.target.value)}
                            className="mb-3"
                        />
                        <Form.Control
                            as="textarea"
                            value={textContent}
                            onChange={(e) => setTextContent(e.target.value)}
                            className="mb-3"
                        />
                    </>
                ) : (
                    <>
                        <h3>{sectionLabel}</h3>
                        <Form.Control as="textarea" value={textContent} disabled className="mb-3" />
                    </>
                )}
                <Button variant={isEditing ? "success" : "warning"} onClick={isEditing ? handleSave : () => setIsEditing(true)}>
                    {isEditing ? "Save" : "Edit"}
                </Button>
            </div>
        );
    };

    const renderQuestionTable = (section) => (
        <div className="mb-5" key={section.id}>
            <h3>{section.section}</h3>
            <Table responsive striped bordered hover className="tableStyle">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Question</th>
                        <th>{section.questions[0].questionType === "rating" ? "Rating Scale" : "Choices"}</th>
                        <th>{section.questions[0].fixed ? "Is Fixed" : "Can Change"}</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {section.questions.map((question, index) => (
                        <tr key={question.id}>
                            <td>{index + 1}</td>
                            <td>{question.question}</td>
                            <td>{question.questionType === "rating" ? `1-${question.choices}` : question.choices.join(", ")}</td>
                            <td>{question.fixed ? "Fixed" : "Not Fixed"}</td>
                            <td>
                                <Button variant="warning" className="me-2">Edit</Button>
                                <Button variant="danger">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button variant="primary" onClick={() => handleAddQuestionClick(section.questions[0].questionType)}>
                Add {section.questions[0].questionType === "rating" ? "Rating" : "Multiple Choice"} Question
            </Button>
        </div>
    );

    return (
        <Container fluid className="vh-80 d-flex flex-column justify-content-center m-5">
            <Row>
                <Button variant="link" onClick={handleBack} className="backBtn d-flex align-items-center text-success me-3">
                    <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                    <span className="ms-2">Back</span>
                </Button>
            </Row>
            <Row>
                <Col><h1>{formDetails.title}</h1></Col>
            </Row>
            <Row>
                <Col><p>{formDetails.description}</p></Col>
            </Row>

            {sections.map((section) =>
                section.type === "text" ? renderTextSection(section) : renderQuestionTable(section)
            )}

            <Row>
                <Col className="d-flex align-items-center">
                    <BtnAddSection onSectionAdded={handleAddNewSection} />  {/* Add new section button */}
                </Col>
            </Row>

            {/* Add Question Modal */}
            <BtnAddQuestion
                show={isAddQuestionModalOpen}
                onHide={() => setAddQuestionModalOpen(false)}
                questionType={addQuestionType}
                onSubmit={() => {
                    // Add question logic
                }}
            />
        </Container>
    );
};

export default ManageEvaluationForm;

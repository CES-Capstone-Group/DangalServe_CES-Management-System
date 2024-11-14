// AddQuestionModal.jsx
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const BtnAddQuestion = ({ show, onHide, questionType, onSubmit }) => {
    const handleFormSubmit = () => {
        // Logic to collect data and submit the question
        onSubmit();
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add {questionType === "rating" ? "Rating" : "Multiple Choice"} Question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formQuestion">
                        <Form.Label>Question</Form.Label>
                        <Form.Control type="text" placeholder="Enter the question" />
                    </Form.Group>
                    {questionType === "rating" && (
                        <Form.Group controlId="formRatingScale" className="mt-3">
                            <Form.Label>Rating Scale</Form.Label>
                            <Form.Control type="number" placeholder="Enter the maximum rating scale (e.g., 5)" />
                        </Form.Group>
                    )}
                    {questionType === "multiple choice" && (
                        <Form.Group controlId="formChoices" className="mt-3">
                            <Form.Label>Choices</Form.Label>
                            <Form.Control type="text" placeholder="Enter choices separated by commas (e.g., Yes, No)" />
                        </Form.Group>
                    )}
                    <Form.Group controlId="formFixed" className="mt-3">
                        <Form.Check type="checkbox" label="Is this question fixed?" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleFormSubmit}>
                    Add Question
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BtnAddQuestion;

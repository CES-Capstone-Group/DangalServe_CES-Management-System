import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import "../table.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const EvalCards = () => {
    const navigate = useNavigate();
    const [evaluations, setEvaluations] = useState([]);
    const [loadingEvaluations, setLoadingEvaluations] = useState(true);
    const [showEvalImageModal, setShowEvalImageModal] = useState(false);
    const [selectedEvalImage, setSelectedEvalImage] = useState(null);
    const [showEditModalEval, setShowEditModalEval] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  
    const handleShowModal = (evaluation) => {
      setSelectedEvaluation(evaluation);
      setShowModal(true);
    };
    const handleEvalImageClick = (imageUrl, evaluation = null) => {
        setSelectedEvalImage(imageUrl);
        setShowEvalImageModal(true);
        setSelectedEvaluation(evaluation);
    };

    const handleCloseModal = () => {
        setShowEvalImageModal(false);
        setSelectedEvalImage(null);
        setSelectedEvaluation(null);
    };
    
    // // Handle when a new evaluation is added
    const handleEvaluationAdded = () => {
        fetchEvaluations();
    };

    // // Handle when the Edit icon is clicked for evaluation
    const editEvaluation = (evaluation) => {
        setSelectedEvaluation(evaluation);  // Set the evaluation to be edited
        setShowEditModalEval(true);               // Show the edit modal
    };

    // // Handle evaluation update and close the modal
    const handleEvaluationUpdated = () => {
        fetchEvaluations();                  // Reload evaluations
        setShowEditModalEval(false);              // Close the modal
    };

    // Fetch evaluations data
    const fetchEvaluations = async () => {
        try {
        const response = await fetch("http://127.0.0.1:8000/api/evaluations/");
        if (!response.ok) {
            throw new Error('Failed to fetch evaluations');
        }
        const data = await response.json();
        setEvaluations(data);
        } catch (err) {
        setError(err.message);
        } finally {
        setLoadingEvaluations(false);
        }
    };

    useEffect(() => {
        fetchEvaluations();
    }, []);

    // // Go back to the previous page
    const handleBack = () => {
        navigate(-1); // This will navigate to the previous page in the history
    };


    const evalCard = [{title: 'CCLIP: PC Awareness', info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquam facilisis ex, ut aliquet leo pretium in. Fusce tortor magna, iaculis eget ante sit amet, molestie aliquet turpis.'}];

    return (
        <Container className="container-fluid">
            <Row>
                <Button variant="link" onClick={handleBack} className="backBtn d-flex align-items-center text-success">
                    <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                    <span className="ms-2">Back</span>
                </Button>

                <Col className="d-flex justify-content-end">
                    <Button style={{ backgroundColor: '#71A872', border: '0px' }}>
                        <FontAwesomeIcon className='me-2' icon={faFilter} ></FontAwesomeIcon>
                        Filter
                    </Button>
                </Col>
            </Row>
            <div className="container">
                <h1> ACTIVITY EVALUATION </h1>
            </div>

            <Row>
            {evalCard.length > 0 ? (
              evalCard.map((evaluation, index) => (
                <Col md={4} key={index}>
                  <Card className="position-relative mb-3" style={{ height: "15rem", msOverflowY: "auto"  }} id='conCard'>
                    <Card.Body>
                      <Card.Title style={{ fontStyle: 'bold' }}>{evaluation.title}</Card.Title>
                      <Card.Text fluid>
                        <strong>Evaluation Info:</strong> {evaluation.info}<br />
                      </Card.Text>
                      <h4 role="button" className="text-success" >See more</h4>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <p className='text-muted'>No evaluations found.</p>
              </Col>
            )}
            </Row>

            <Modal>
              <Modal.Header>

              </Modal.Header>
              <Modal.Body>

              </Modal.Body>
            </Modal>
        </Container>
    );
};

export default EvalCards;
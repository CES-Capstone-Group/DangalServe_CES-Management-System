import React, { useState, useEffect } from 'react';
import '../App.css';
import pncHeader from '../assets/pnc-header-2.png';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';

const MainContent = () => {
  const [achievements, setAchievements] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  const [showAgendaImageModal, setShowAgendaImageModal] = useState(false);
  const [selectedAgendaImage, setSelectedAgendaImage] = useState(null); //State for viewing research agenda images

  const [showAnnImageModal, setShowAnnImageModal] = useState(false);
  const [selectedAnnImage, setSelectedAnnImage] = useState(null); //State for viewing announcement images

  const [showAchImageModal, setShowAchImageModal] = useState(false);
  const [selectedAchImage, setSelectedAchImage] = useState(null); //State for viewing achievement images

  const [error, setError] = useState(null);
  const [loadingAchievements, setLoadingAchievements] = useState(true);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);
  const [loadingResearchAgendas, setLoadingResearchAgendas] = useState(true);
  const [researchAgendas, setResearchAgendas] = useState([]); // State for research agendas

  const [selectedResearchAgenda, setSelectedResearchAgenda] = useState(null); // State for selected research agenda
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const fetchResearchAgendas = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/research-agendas/");
      if (!response.ok) {
        throw new Error('Failed to fetch research agendas');
      }
      const data = await response.json();
      setResearchAgendas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingResearchAgendas(false);
    }
  };

  useEffect(() => {
    fetchResearchAgendas();
  }, []);

 // Function to handle opening the modal with the clicked image
 const handleAgendaImageClick = (imageUrl, agenda = null) => {
  setSelectedAgendaImage(imageUrl);
  setShowAgendaImageModal(true);
  setSelectedResearchAgenda(agenda);
};

const handleAnnImageClick = (imageUrl, announcement = null) => {
  setSelectedAnnImage(imageUrl);
  setShowAnnImageModal(true);
  setSelectedAnnouncement(announcement);
};

const handleAchImageClick = (imageUrl, achievement = null) => {
  setSelectedAchImage(imageUrl);
  setShowAchImageModal(true);
  setSelectedAchievement(achievement); 
};

const handleCloseModal = () => {
  setShowAgendaImageModal(false);
  setShowAchImageModal(false);
  setShowAnnImageModal(false);

  setSelectedAgendaImage(null);
  setSelectedAchImage(null);
  setSelectedAnnImage(null);

  setSelectedResearchAgenda(null);
  setSelectedAnnouncement(null);
  setSelectedAchievement(null); 
};

  // Fetch achievements data from the server
  const fetchAchievements = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/achievements/");
      const data = await response.json();
      setAchievements(data);
    } catch (err) {
      setError('Failed to fetch achievements');
    } finally {
      setLoadingAchievements(false);
    }
  };

  // Fetch announcements data from the server
  const fetchAnnouncements = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/announcements/");
      const data = await response.json();
      setAnnouncements(data);
    } catch (err) {
      setError('Failed to fetch announcements');
    } finally {
      setLoadingAnnouncements(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
    fetchAnnouncements();
  }, []);

  if (loadingAchievements || loadingAnnouncements || loadingResearchAgendas) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <Container fluid className='custom-container'>
      <Row className='justify-content-center'>
        <img src={pncHeader} alt="pnc header"  style={{maxWidth: '50rem'}}/>
      </Row>
      <Row>
        <Container className='welcomeDashboard'>
          <h1 className='h1'>Welcome to University of Cabuyao</h1>
          <h1>Community Extension Services</h1>
        </Container>
      </Row>
      <Row>
        <Col md={12} className="ms-sm-auto px-md-4">
          <h2>UC(PnC) Extension Agenda 2023-2030</h2>

          {/* Carousel Section */}
          <div className="carousel slide mb-4" id="carouselExampleControls" data-bs-ride="carousel">
            <div className="carousel-inner">
              {researchAgendas.length > 0 ? (
                researchAgendas.map((agenda, index) => (
                  <div key={agenda.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                    <img onClick={() => handleAgendaImageClick(agenda.image_url || "/placeholder.png", agenda)} 
                    id='research-agenda-img' 
                    src={agenda.image_url || '/placeholder.png'} className="d-block w-100" 
                    alt={agenda.label} />
                  </div>
                ))
              ) : (
                <p className='text-muted'>No research agendas found.</p>
              )}
              {/* Modal for viewing full image */}
              <Modal size='lg' show={showAgendaImageModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                  <Modal.Title>{selectedResearchAgenda?.label}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {selectedAgendaImage && (
                    <img src={selectedAgendaImage} alt="Full Size" style={{ width: '100%' }} />
                  )}
                </Modal.Body>
              </Modal>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          {/* Achievements Section */}
          <Row>
            <Col className="d-flex justify-content-between align-items-center">
              <h3>Achievements</h3>
            </Col>
          </Row>
          <br />

          <Row>
            {achievements.length > 0 ? (
              achievements.map((achievement) => (
                <Col md={4} key={achievement.id}>
                  <Card className="position-relative mb-3" id='conCard'>
                    <Card.Img variant="top" className='conImg' src={achievement.image || 'placeholder.png'} onClick={() => handleAchImageClick(achievement.image_url || "/placeholder.png", achievement )}
                      style={{ cursor: 'pointer' }} />
                    <Card.Body>
                      <Card.Title className='h1'>{achievement.award_title}</Card.Title>
                      <Card.Text fluid>
                        <strong>Awardee:</strong> {achievement.awardee}<br />
                        <strong>Date:</strong> {achievement.date_awarded}<br />
                        <strong>Awarded by:</strong> {achievement.awarded_by}
                      </Card.Text>
                      <h4 role="button" className="text-success" onClick={() => handleAchImageClick(achievement.image_url || "/placeholder.png", achievement )}>See more</h4>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className='text-muted'>No achievements found</p>
            )}
          </Row>

           {/* Modal for viewing full image */}
           <Modal size='lg' show={showAchImageModal} onHide={handleCloseModal} centered>
              <Modal.Header closeButton>

              </Modal.Header>
              <Modal.Body className="text-center">
                {selectedAchImage && (
                  <img src={selectedAchImage} alt="Full Size" style={{ width: '100%' }} />
                )}
                <h1>{selectedAchievement?. award_title}</h1>
                <strong>Awardee:</strong> {selectedAchievement?.awardee}<br />
                <strong>Date:</strong> {selectedAchievement?.date_awarded}<br />
                <strong>Awarded by:</strong> {selectedAchievement?.awarded_by}
              </Modal.Body>
            </Modal>

          {/* Announcements Section */}
          <Row>
            <Col className="d-flex justify-content-between align-items-center">
              <h3>Announcements</h3>
            </Col>
          </Row>
          <br />

          <Row>
            {announcements.length > 0 ? (
              announcements.map((announcement) => (
                <Col md={4} key={announcement.id}>
                  <Card scrollable className="position-relative mb-3" style={{height: "27rem", msOverflowY: "auto"}} id='conCard'>
                  <Card.Img 
                    className='conImg' 
                    variant="top" 
                    src={announcement.image || "/placeholder.png"} 
                    onClick={() => handleAnnImageClick(announcement.image_url || "/placeholder.png", announcement)}                      
                    style={{ cursor: 'pointer' }} />
                    <Card.Body>
                      <Card.Title>{announcement.title}</Card.Title>
                      <Card.Text className='truncate-text'>{announcement.details}</Card.Text>
                      <h4 role="button" className="text-success " onClick={() => handleAnnImageClick(announcement.image_url || "/placeholder.png", announcement )} >See more</h4>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className='text-muted'>No announcements found</p>
            )}
            

            {/* Modal for viewing full image */}
            <Modal size='lg' show={showAnnImageModal} onHide={handleCloseModal} centered>
              <Modal.Header closeButton>
              </Modal.Header>
              <Modal.Body>
                {selectedAnnImage && (
                  <img src={selectedAnnImage} alt="Full Size" style={{ width: '100%' }} />
                )}
                <h1>{selectedAnnouncement?.title}</h1>
                <p className="mt-3 text-justify">{selectedAnnouncement?.details}</p>
              </Modal.Body>
            </Modal>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MainContent;
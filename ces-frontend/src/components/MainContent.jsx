import React, { useState, useEffect } from 'react';
import '../App.css';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';

const MainContent = () => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState(null);
  const [loadingAchievements, setLoadingAchievements] = useState(true);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);

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

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };

  const handleCloseModal = () => {
    setShowImageModal(false);
    setSelectedImage(null);
  };


  if (loadingAchievements || loadingAnnouncements) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <Container fluid className='custom-container'>
      <Row>
        <Col md={12} className="ms-sm-auto px-md-4">
          <h2>UC(PnC) Extension Agenda 2023-2030</h2>

          {/* Carousel Section */}
          <div className="carousel slide mb-4" id="carouselExampleControls" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="placeholder.png" className="research-agenda-img d-block w-100" alt="..." />
              </div>
              {/* Add more carousel items if necessary */}
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
                    <Card.Img className='conImg' variant="top" src={achievement.image || 'placeholder.png'} onClick={() => handleImageClick(achievement.image_url || "/placeholder.png")}
                      style={{ cursor: 'pointer' }} />
                    <Card.Body>
                      <Card.Title>{achievement.award_title}</Card.Title>
                      <Card.Text>
                        Awardee: {achievement.awardee} <br />
                        Date Awarded: {achievement.date_awarded}
                      </Card.Text>
                      <Button variant="success">See more</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className='text-muted'>No achievements found</p>
            )}
          </Row>

          {/* Modal for viewing full image */}
          <Modal show={showImageModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body className="text-center">
              {selectedImage && (
                <img src={selectedImage} alt="Full Size" style={{ width: '100%' }} />
              )}
            </Modal.Body>
          </Modal>

          <br />

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
                  <Card className="position-relative mb-3" id='conCard'>
                    <Card.Img className='conImg' variant="top" src={announcement.image || 'placeholder.png'} onClick={() => handleImageClick(announcement.image_url || "/placeholder.png")}
                      style={{ cursor: 'pointer' }} />
                    <Card.Body>
                      <Card.Title>{announcement.title}</Card.Title>
                      <Card.Text>{announcement.details}</Card.Text>
                      <Button variant="success">See more</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className='text-muted'>No announcements found</p>
            )}

            {/* Modal for viewing full image */}
            <Modal show={showImageModal} onHide={handleCloseModal} centered>
              <Modal.Header closeButton>
              </Modal.Header>
              <Modal.Body className="text-center">
                {selectedImage && (
                  <img src={selectedImage} alt="Full Size" style={{ width: '100%' }} />
                )}
              </Modal.Body>
            </Modal>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MainContent;

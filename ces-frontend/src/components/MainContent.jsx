import React, { useState, useEffect } from 'react';
import '../App.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const MainContent = () => {
  const [achievements, setAchievements] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState(null);
  const [loadingAchievements, setLoadingAchievements] = useState(true);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);
  const [researchAgendas, setResearchAgendas] = useState([]); // State for research agendas

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

  if (loadingAchievements || loadingAnnouncements) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <Container fluid>
      <Row>
        <Col md={12} className="ms-sm-auto px-md-4">
          <h2>UC(PnC) Extension Agenda 2023-2030</h2>
          
          {/* Carousel Section */}
          <div className="carousel slide mb-4" id="carouselExampleControls" data-bs-ride="carousel">
            <div className="carousel-inner">
              {researchAgendas.length > 0 ? (
                researchAgendas.map((agenda, index) => (
                  <div key={agenda.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                    <img src={agenda.image_url || '/placeholder.png'} className="d-block w-100" alt={agenda.label} />
                  </div>
                ))
              ) : (
                <p>No research agendas found.</p>
              )}

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
                  <Card>
                    <Card.Img variant="top" src={achievement.image || 'placeholder.png'} />
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
              <p>No achievements found</p>
            )}
          </Row>

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
                  <Card className="border-0">
                    <Card.Img variant="top" src={announcement.image || 'placeholder.png'} />
                    <Card.Body>
                      <Card.Title>{announcement.title}</Card.Title>
                      <Card.Text>{announcement.details}</Card.Text>
                      <Button variant="success">See more</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No announcements found</p>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MainContent;
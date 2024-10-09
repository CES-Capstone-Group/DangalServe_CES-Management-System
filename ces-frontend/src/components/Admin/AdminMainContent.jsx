import React, { useState, useEffect } from 'react';
import '/src/App.css';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import BtnAddAnnouncement from '../Buttons/Admin/BtnAddAnnouncement'; // Add Announcement Button
import BtnAddAchievement from '../Buttons/Admin/BtnAddAchievement'; // Add Achievement Button
import BtnAddResearchAgenda from '../Buttons/Admin/BtnAddResearchAgenda'; // Add Research Agenda Button
import BtnEditAchievement from '../Buttons/Admin/BtnEditDeleteAchievement'; // Edit Achievement Modal
import BtnEditAnnouncement from '../Buttons/Admin/BtnEditDeleteAnnouncement'; // Edit Announcement Modal
import BtnEditResearchAgenda from '../Buttons/Admin/BtnEditDeleteResearchAgenda'; // Edit Research Agenda Modal
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const AdminMainContent = () => {
  const [achievements, setAchievements] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  const [showAgendaImageModal, setShowAgendaImageModal] = useState(false);
  const [selectedAgendaImage, setSelectedAgendaImage] = useState(null); //State for viewing research agenda images

  const [showAnnImageModal, setShowAnnImageModal] = useState(false);
  const [selectedAnnImage, setSelectedAnnImage] = useState(null); //State for viewing announcement images

  const [showAchImageModal, setShowAchImageModal] = useState(false);
  const [selectedAchImage, setSelectedAchImage] = useState(null); //State for viewing achievement images

  const [researchAgendas, setResearchAgendas] = useState([]); // State for research agendas
  const [error, setError] = useState(null);

  const [loadingAchievements, setLoadingAchievements] = useState(true);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);
  const [loadingResearchAgendas, setLoadingResearchAgendas] = useState(true); // Loading state for research agendas

  const [showEditModalAch, setShowEditModalAch] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const [showEditModalAnn, setShowEditModalAnn] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const [showEditModalAgenda, setShowEditModalAgenda] = useState(false); // Modal state for research agenda
  const [selectedResearchAgenda, setSelectedResearchAgenda] = useState(null); // State for selected research agenda

  // Navigation
  let navigate = useNavigate();
  const routeChange = (path) => {
    navigate(path);
  };

  // Fetch achievements data
  const fetchAchievements = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/achievements/");
      if (!response.ok) {
        throw new Error('Failed to fetch achievements');
      }
      const data = await response.json();
      setAchievements(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingAchievements(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
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


  // Fetch research agendas data
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

  // Handle when a new research agenda is added
  const handleResearchAgendaAdded = () => {
    fetchResearchAgendas();
  };

  // Handle when a new achievement is added
  const handleAchievementAdded = () => {
    fetchAchievements();
  };

  // Handle when the Edit icon is clicked for Achievement
  const editAchievement = (achievement) => {
    setSelectedAchievement(achievement);  // Set the achievement to be edited
    setShowEditModalAch(true);               // Show the edit modal
  };

  // Handle Achievement update and close the modal
  const handleAchievementUpdated = () => {
    fetchAchievements();                  // Reload achievements
    setShowEditModalAch(false);              // Close the modal
  };

  // Delete Achievement
  const deleteAchievement = async (achievementId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this achievement?");
    if (!confirmDelete) return; // Exit if the user does not confirm the deletion

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/achievements/${achievementId}/`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Achievement deleted successfully!");
        fetchAchievements();  // Reload the achievements list after successful deletion
      } else {
        alert("There was an error deleting the achievement.");
      }
    } catch (error) {
      alert("There was an error deleting the achievement.");
    }
  };

  // Fetch announcements data
  const fetchAnnouncements = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/announcements/");
      if (!response.ok) {
        throw new Error('Failed to fetch announcements');
      }
      const data = await response.json();
      setAnnouncements(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingAnnouncements(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Handle when a new announcement is added
  const handleAnnouncementAdded = () => {
    fetchAnnouncements();
  };

  // Handle when the Edit icon is clicked for Announcement
  const editAnnouncement = (announcement) => {
    setSelectedAnnouncement(announcement);  // Set the announcement to be edited
    setShowEditModalAnn(true);              // Show the edit modal for announcement
  };

  // Handle Announcement update and close the modal
  const handleAnnouncementUpdated = () => {
    fetchAnnouncements();                  // Reload announcements
    setShowEditModalAnn(false);             // Close the modal
  };

  // Delete Announcement
  const deleteAnnouncement = async (announcementId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this announcement?");
    if (!confirmDelete) return; // Exit if the user does not confirm the deletion

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/announcements/${announcementId}/`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Announcement deleted successfully!");
        fetchAnnouncements();  // Reload the announcements list after successful deletion
      } else {
        alert("There was an error deleting the announcement.");
      }
    } catch (error) {
      alert("There was an error deleting the announcement.");
    }
  };

  // Edit Research Agenda
  const editResearchAgenda = (agenda) => {
    setSelectedResearchAgenda(agenda);
    setShowEditModalAgenda(true);
  };

  // Handle Research Agenda update and close the modal
  const handleResearchAgendaUpdated = () => {
    fetchResearchAgendas();                  // Reload research agendas
    setShowEditModalAgenda(false);           // Close the modal
  };

  // Delete Research Agenda
  const deleteResearchAgenda = async (agendaId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this research agenda?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/research-agendas/${agendaId}/`, {
        method: "DELETE",
      });
      console.log(agendaId)
      if (response.ok) {
        alert("Research agenda deleted successfully!");
        fetchResearchAgendas(); // Reload the research agendas list after deletion
        window.location.reload();
      } else {
        alert("There was an error deleting the research agenda.");
      }
    } catch (error) {
      alert("There was an error deleting the research agenda.");
    }
  };

  // Loading and Error Handling
  if (loadingAchievements || loadingAnnouncements || loadingResearchAgendas) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <Container fluid className='custom-container'>
      <Row>
        <Col md={12} className="ms-sm-auto px-md-4">
          <h2>UC(PnC) Extension Agenda 2023-2030</h2>

          {/* Add Research Agenda*/}
          <Row>
            <Col className="d-flex justify-content-between align-items-center">
              <h3>Research Agendas</h3>
              <div className='d-flex'>
                <BtnAddResearchAgenda onResearchAgendaAdded={handleResearchAgendaAdded} />
              </div>
            </Col>
          </Row>

          <br />

          {/* Carousel Section */}
          <div className="carousel slide mb-4" id="carouselExampleControls" data-bs-ride="carousel">
            <div className="carousel-inner">
              {researchAgendas.length > 0 ? (
                researchAgendas.map((agenda, index) => (
                  <div key={agenda.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                    <img
                      onClick={() => handleAgendaImageClick(agenda.image_url || "/placeholder.png", agenda)}
                      id='research-agenda-img'
                      src={agenda.image_url || '/placeholder.png'}
                      className="d-block w-100"
                      alt={agenda.label} />

                    {/* Button Container */}
                    <div className="carousel-buttons">
                      <Button
                        variant="link"
                        className="p-0 me-3"
                        onClick={() => editResearchAgenda(agenda)}
                      >
                        <FontAwesomeIcon icon={faEdit} size="lg" color="#A7C7E7" />
                      </Button>
                      <Button
                        variant="link"
                        className="p-0"
                        onClick={() => deleteResearchAgenda(agenda.id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} size="lg" color="#ff6961" />
                      </Button>
                    </div>

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

              {/* Research Agenda Edit Modal */}
              {selectedResearchAgenda && (
                <BtnEditResearchAgenda
                  show={showEditModalAgenda}
                  onHide={() => setShowEditModalAgenda(false)}
                  researchAgenda={selectedResearchAgenda}
                  onResearchAgendaUpdated={handleResearchAgendaUpdated}
                />
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
              <div className='d-flex'>
                <BtnAddAchievement onAchievementAdded={handleAchievementAdded} />
              </div>
            </Col>
          </Row>

          <br />

          {/* List of Achievements */}
          <Row>
            {achievements.length > 0 ? (
              achievements.map((achievement) => (
                <Col md={4} key={achievement.id}>
                  <Card className="position-relative mb-3" style={{ height: "27rem", msOverflowY: "auto"  }} id='conCard'>
                    <Card.Img variant="top" className='conImg' src={achievement.image_url || "/placeholder.png"} onClick={() => handleAchImageClick(achievement.image_url || "/placeholder.png", achievement)}
                      style={{ cursor: 'pointer' }} />

                    {/* Edit and Delete Icons */}
                    <div className="d-flex position-absolute top-0 end-0 m-1">
                      <Button
                        variant="link"
                        className="p-0 me-3"
                        onClick={() => editAchievement(achievement)}  // Open modal when clicked
                      >
                        <FontAwesomeIcon icon={faEdit} size="lg" color="#A7C7E7" />
                      </Button>

                      <Button
                        variant="link"
                        className="p-0"
                        onClick={() => deleteAchievement(achievement.id)}  // Trigger delete action
                      >
                        <FontAwesomeIcon icon={faTrashAlt} size="lg" color="#ff6961" />
                      </Button>
                    </div>

                    <Card.Body>
                      <Card.Title style={{ fontStyle: 'bold' }}>{achievement.award_title}</Card.Title>
                      <Card.Text fluid>
                        <strong>Awardee:</strong> {achievement.awardee}<br />
                        <strong>Date:</strong> {achievement.date_awarded}<br />
                        <strong>Awarded by:</strong> {achievement.awarded_by}
                      </Card.Text>
                      <h4 role="button" className="text-success" onClick={() => handleAchImageClick(achievement.image_url || "/placeholder.png", achievement)}>See more</h4>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <p className='text-muted'>No achievements found.</p>
              </Col>
            )}

            {/* Modal for viewing full image */}
            <Modal size='lg' show={showAchImageModal} onHide={handleCloseModal} centered>
              <Modal.Header closeButton>

              </Modal.Header>
              <Modal.Body className="text-center">
                {selectedAchImage && (
                  <img src={selectedAchImage} alt="Full Size" style={{ width: '100%' }} />
                )}
                <h1>{selectedAchievement?.award_title}</h1>
                <strong>Awardee:</strong> {selectedAchievement?.awardee}<br />
                <strong>Date:</strong> {selectedAchievement?.date_awarded}<br />
                <strong>Awarded by:</strong> {selectedAchievement?.awarded_by}
              </Modal.Body>
            </Modal>

            {/* Achievement Edit Modal */}
            {selectedAchievement && (
              <BtnEditAchievement
                show={showEditModalAch}
                onHide={() => setShowEditModalAch(false)}
                achievement={selectedAchievement}
                onAchievementUpdated={handleAchievementUpdated}
              />
            )}
          </Row>

          <br />

          {/* Announcements Section */}
          <Row>
            <Col className="d-flex justify-content-between align-items-center">
              <h3>Announcements</h3>
              <div className='d-flex'>
                <BtnAddAnnouncement onAnnouncementAdded={handleAnnouncementAdded} />
              </div>
            </Col>
          </Row>

          <br />

          {/* List of Announcements */}
          <Row>
            {announcements.length > 0 ? (
              announcements.map((announcement) => (
                <Col md={4} key={announcement.id}>
                  <Card className="position-relative mb-3" style={{ height: "27rem", msOverflowY: "auto"  }} id='conCard'>
                    <Card.Img
                      className='conImg'
                      variant="top"
                      src={announcement.image || "/placeholder.png"}
                      onClick={() => handleAnnImageClick(announcement.image_url || "/placeholder.png", announcement)}
                      style={{ cursor: 'pointer' }} />

                    <div className="d-flex position-absolute top-0 end-0 m-1">
                      <Button
                        variant="link"
                        className="p-0 me-3"
                        onClick={() => editAnnouncement(announcement)}  // Open modal for editing
                      >
                        <FontAwesomeIcon icon={faEdit} size="lg" color="#A7C7E7" />
                      </Button>
                      <Button
                        variant="link"
                        className="p-0"
                        onClick={() => deleteAnnouncement(announcement.id)}  // Trigger delete action
                      >
                        <FontAwesomeIcon icon={faTrashAlt} size="lg" color="#ff6961" />
                      </Button>
                    </div>
                    <Card.Body>
                      <Card.Title>{announcement.title}</Card.Title>
                      <Card.Text className='truncate-text'>{announcement.details}</Card.Text>
                      <h4 role="button" className="text-success" onClick={() => handleAnnImageClick(announcement.image_url || "/placeholder.png", announcement )} >See more</h4>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <p className='text-muted'>No announcements found.</p>
              </Col>
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

            {/* Announcement Edit Modal
            {selectedAnnouncement && (
              <BtnEditAnnouncement
                show={showEditModalAnn}
                onHide={() => setShowEditModalAnn(false)}
                announcement={selectedAnnouncement}
                onAnnouncementUpdated={handleAnnouncementUpdated}
              />
            )} */}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminMainContent;
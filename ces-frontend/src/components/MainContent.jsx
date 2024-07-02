import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const MainContent = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={12} className="ms-sm-auto px-md-4">
          <h2>UC(PnC) Extension Agenda 2023-2030</h2>
          <div className="carousel slide mb-4" id="carouselExampleControls" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="placeholder.png" className="d-block w-100" alt="..."/>
              </div>
              {/* Add more carousel items here */}
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
          <h3>Achievements</h3>
          <Row>
            <Col md={4}>
              <Card>
                <Card.Img variant="top" src="placeholder.png" />
                <Card.Body>
                  <Card.Title>Title</Card.Title>
                  <Card.Text>Details Details Details Details Details</Card.Text>
                  <Button variant="success">See more</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Img variant="top" src="placeholder.png" />
                <Card.Body>
                  <Card.Title>Title</Card.Title>
                  <Card.Text>Details Details Details Details Details</Card.Text>
                  <Button variant="success">See more</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Img variant="top" src="placeholder.png" />
                <Card.Body>
                  <Card.Title>Title</Card.Title>
                  <Card.Text>Details Details Details Details Details</Card.Text>
                  <Button variant="success">See more</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MainContent;

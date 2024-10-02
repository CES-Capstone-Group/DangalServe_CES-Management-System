import React, { useState } from "react";
import TopNav from "../TopNav";
import { Row, Col, Container } from "react-bootstrap";
import AdminLandingPage from "../AdminLandingPage";

const AdminLanding = () => {
  

  return (
    <div>
      <header>
        <TopNav />
      </header>
      <Row>
        <Col >
          <Container>
            <AdminLandingPage/>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default AdminLanding;
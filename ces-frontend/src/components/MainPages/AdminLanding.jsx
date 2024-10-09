import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import AdminLandingPage from "../Admin/AdminLandingPage";
import AdminTopNav from "../AdminTopNav";

const AdminLanding = () => {
  

  return (
    <div>
      <header>
        <AdminTopNav />
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
import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import TopNav from "../TopNav";
import '../../App.css'

const AdminManagePage = () => {
  return (
    <div>
      <header>
        <TopNav/>
      </header>
      <Row>
        <Col>
          <Container className="vh-100 d-flex flex-column justify-content-center align-items-center" style={{marginTop: '60px'}}>
            <Outlet/>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default AdminManagePage;
import React, { useState } from "react";
import TopNav from "../TopNav";
import { Row, Col, Container } from "react-bootstrap";
import AdminManage from "../AdminManage";
import { Outlet } from "react-router-dom";

const AdminManagePage = () => {
  

  return (
    <div>
      <header>
        <TopNav />
      </header>
      <Row>
        <Col >
          <Container className="vh-100 d-flex flex-column justify-content-center align-items-center">
            <Outlet/>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default AdminManagePage;
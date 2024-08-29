import React from "react";
import BrgySidebar from "../BrgySidebar";
import TopNav from "../TopNav";
import { Outlet } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

const UserBarangayPage = () => {
    return (
        <div>
      <header><TopNav /></header>
      <br /> <br /><br /> <br />

      <Row>
        <Col md={1} lg={2}>
          <BrgySidebar />
        </Col>
        <Col md={3} lg={10}>
          <Outlet/>
        </Col>
      </Row>
    </div>
    );
}

export default UserBarangayPage;
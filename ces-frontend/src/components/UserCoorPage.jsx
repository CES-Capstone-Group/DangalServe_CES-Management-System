import React from "react";
import CoorSidebar from "./CoorSidebar";
import TopNav from "./TopNav";
import { Outlet } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

const UserCoorPage = () => {
    return (
        <div>
      <header><TopNav /></header>
      <br /> <br /><br /> <br />

      <Row>
        <Col md={1} lg={2}>
          <CoorSidebar />
        </Col>
        <Col md={3} lg={10}>
          <Outlet/>
        </Col>
      </Row>
    </div>
    );
}

export default UserCoorPage;
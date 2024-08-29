import React from "react";
import TopNav from "../TopNav";
import { Outlet } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import EvalSidebar from "../EvalSidebar";

const UserEvalPage = () => {
    return (
        <div>
      <header><TopNav /></header>
      <br /> <br /><br /> <br />

      <Row>
        <Col md={1} lg={2}>
          <EvalSidebar />
        </Col>
        <Col md={3} lg={10}>
          <Outlet/>
        </Col>
      </Row>
    </div>
    );
}

export default UserEvalPage;
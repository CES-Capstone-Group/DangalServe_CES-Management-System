import React, { useState } from "react";
import TopNav from "../TopNav";
import { Outlet } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import EvalSidebar from "../EvalSidebar";

const UserEvalPage = () => {
  const [sidebarOpen, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebarOpen);
    console.log(sidebarOpen);
  };
  return (
    <div>
      <header>
        <TopNav sidebarToggle={showSidebar}/>
      </header>
      <Row>
        <Col sm={12} md={3} lg={12}>
          <EvalSidebar sidebarOpen={sidebarOpen} toggleSidebar={showSidebar} />
        </Col>
        <Col sm={12} md={9} lg={12}>
          <Outlet/>
        </Col>
      </Row>
    </div>
  );
}

export default UserEvalPage;
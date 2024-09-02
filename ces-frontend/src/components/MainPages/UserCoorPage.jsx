import React, { useState } from "react";
import CoorSidebar from "../CoorSidebar";
import TopNav from "../TopNav";
import { Outlet } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

const UserCoorPage = () => {
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
          <CoorSidebar sidebarOpen={sidebarOpen} toggleSidebar={showSidebar} />
        </Col>
        <Col sm={12} md={9} lg={12}>
          <Outlet/>
        </Col>
      </Row>
    </div>
  );
}

export default UserCoorPage;
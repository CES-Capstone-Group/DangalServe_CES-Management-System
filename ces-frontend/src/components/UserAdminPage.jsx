import React from "react";
import AdminSidebar from "./AdminSidebar";
import CoorSidebar from "./CoorSidebar";
import TopNav from "./TopNav";
import AdminMainContent from "./AdminMainContent";
import { Outlet } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

const UserAdminPage = () => {
    return (
        <div>
      <header><TopNav /></header>
      <br /> <br /><br /> <br />

      <Row>
        <Col md={1} lg={2}>
          <AdminSidebar />
        </Col>
        <Col md={3} lg={10}>
          <Outlet/>
        </Col>
      </Row>
    </div>
    );
}

export default UserAdminPage;
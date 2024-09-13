import React, { useState } from "react";
import BrgySidebar from "../BrgySidebar";
import TopNav from "../TopNav";
import { Outlet } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

const UserBarangayPage = () => {
  const [sidebarOpen, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebarOpen);
    console.log(sidebarOpen);
  };

  return (
    <div>
      <header>
        <TopNav sidebarOpen={sidebarOpen} sidebarToggle={showSidebar}/>
      </header>
      <Row>
        <Col style={{padding: '0px'}} md={4} lg={3} >
          <BrgySidebar sidebarOpen={sidebarOpen} toggleSidebar={showSidebar} />
        </Col>
        <Col className="d-flex justify-content-center"
             style={{marginTop: '10rem', padding: '0px'}} 
             sm={12} md={sidebarOpen ? '8' : '12'} 
             lg={sidebarOpen ? '8' : '12'}>
          <Outlet/>
        </Col>
      </Row>
    </div>
  );
}

export default UserBarangayPage;
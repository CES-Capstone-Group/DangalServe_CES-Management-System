import React, { useState } from "react";
import CoorSidebar from "../CoorSidebar";
import TopNav from "../TopNav";
import { Outlet } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";

const UserCoorPage = () => {
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
        <Col style={{ padding: '0px' }} md={sidebarOpen ? 3 : 0} lg={sidebarOpen ? 3 : 0} >
          <CoorSidebar sidebarOpen={sidebarOpen} toggleSidebar={showSidebar} />
        </Col>
        <Col className={`d-flex justify-content-${sidebarOpen ? 'start' : 'center'} align-items-start`}
             style={{marginTop: '10rem', padding: '0px',maxWidth: sidebarOpen ? '75%' : '100%', }}
             sm={12} md={sidebarOpen ? '8' : '12'} 
             lg={sidebarOpen ? '8' : '12'}>
          <Container>
            <Outlet/>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default UserCoorPage;
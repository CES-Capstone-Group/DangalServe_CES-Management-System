import React, { useState } from "react";
import CoorSidebar from "../Coordinator/CoorSidebar";
import { Outlet } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import CoorTopNav from "../CoorTopNav";

const UserCoorPage = () => {
  const [sidebarOpen, setSidebar] = useState(true);
  const showSidebar = () => {
    setSidebar(!sidebarOpen);
    console.log(sidebarOpen);
  };
  return (
    <div>
      <header>
        <CoorTopNav sidebarOpen={sidebarOpen} sidebarToggle={showSidebar}/>
      </header>
      <Row>
        <Col style={{ padding: '0px' }} 
        xs={'2'}
        sm={sidebarOpen ? '4' : '2'}
        md={sidebarOpen ? '4' : '1'} 
        lg={sidebarOpen ? '2' : '1'} >
          <CoorSidebar sidebarOpen={sidebarOpen} toggleSidebar={showSidebar} />
        </Col>
        <Col className={`d-flex justify-content-${sidebarOpen ? 'start' : 'center'} align-items-start mobileMain`}
             style={{marginTop: '10rem', padding: '0px'}}
             xs={'10'}
             sm={sidebarOpen ? '8' : '10'} 
             md={sidebarOpen ? '8' : '11'} 
             lg={sidebarOpen ? '10' : '11'}
             xl={sidebarOpen ? '10' : '11'}
             xxl={sidebarOpen ? '10' : '11'} >
          <Container>
            <Outlet/>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default UserCoorPage;
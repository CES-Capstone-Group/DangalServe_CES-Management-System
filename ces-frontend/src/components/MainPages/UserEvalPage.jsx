import React, { useState } from "react";
import TopNav from "../TopNav";
import { Outlet } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import EvalSidebar from "../EvalSidebar";

const UserEvalPage = () => {
  const [sidebarOpen, setSidebar] = useState(true);
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
        <Col style={{ padding: '0px' }} 
            xs={'0'}
            sm={sidebarOpen ? '4' : '2'}
            md={sidebarOpen ? '4' : '1'} 
            lg={sidebarOpen ? '2' : '1'} >
          <EvalSidebar sidebarOpen={sidebarOpen} toggleSidebar={showSidebar} />
        </Col>
        <Col className={`d-flex justify-content-${sidebarOpen ? 'start' : 'center'} align-items-start mobileMain`}
             style={{marginTop: '10rem', padding: '0px'}}
             xs={'12'}
             sm={sidebarOpen ? '8' : '10'} 
             md={sidebarOpen ? '8' : '11'} 
             lg={sidebarOpen ? '10' : '11'}
             xl={sidebarOpen ? '10' : '11'}
             xxl={sidebarOpen ? '10' : '11'} >
          <Container className="mobileMain">
            <Outlet/>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default UserEvalPage;
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
        <TopNav sidebarOpen={sidebarOpen} sidebarToggle={showSidebar}/>
      </header>
      <Row>
        <Col style={{padding: '0px'}} md={4} lg={3} >
          <EvalSidebar sidebarOpen={sidebarOpen} toggleSidebar={showSidebar} />
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

export default UserEvalPage;
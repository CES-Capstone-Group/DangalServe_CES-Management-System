import React, {useState} from "react";
import AdminSidebar from "../AdminSidebar";
import TopNav from "../TopNav";
import { Outlet } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";

const UserAdminPage = () => {
  const [sidebarOpen, setSidebar] = useState(true);
  const showSidebar = () => {
    setSidebar(!sidebarOpen);
    console.log(sidebarOpen);
  };
  return (
    <div>
      <header >
        <TopNav sidebarOpen={sidebarOpen} sidebarToggle={showSidebar}/>
      </header>
      <Row >
        <Col style={{ padding: '0px' }} md={sidebarOpen ? '2' : '0'} lg={sidebarOpen ? '2' : '0'}>
          <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={showSidebar} />    
        </Col>
        <Col className={`d-flex justify-content-${sidebarOpen ? 'end' : 'center'} align-items-end`}
             style={{marginTop: '10rem', padding: '0px',maxWidth: sidebarOpen ? '100%' : '100%'}} 
             sm={12} md={sidebarOpen ? '10' : '12'} 
             lg={sidebarOpen ? '10' : '12'}>
            <Container>
              <Outlet/>
            </Container>
        </Col>
      </Row>
    </div>
  );
}

export default UserAdminPage;
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
      <Row>
        <Col
          xs={'2'}
          sm={sidebarOpen ? '4' : '2'}
          md={sidebarOpen ? '4' : '1'} 
          lg={sidebarOpen ? '3' : '1'} 
          xl={sidebarOpen ? '2' : '1'}
          xxl={sidebarOpen ? '2' : '1'} 
          >
          <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={showSidebar} />    
        </Col>
        <Col className={`d-flex justify-content-${sidebarOpen ? 'start' : 'center'} align-items-start`}
             style={{marginTop: '10rem', paddingLeft:'20px', paddingRight: '20px'}}
             xs={'10'}
             sm={sidebarOpen ? '8' : '10'} 
             md={sidebarOpen ? '8' : '11'} 
             lg={sidebarOpen ? '9' : '11'}
             xl={sidebarOpen ? '10' : '11'}
             xxl={sidebarOpen ? '10' : '11'} >
            <Container className="p-0">
              <Outlet/>
            </Container>
        </Col>
      </Row>
    </div>
  );
}

export default UserAdminPage;
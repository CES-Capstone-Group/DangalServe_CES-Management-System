import React, {useState} from "react";
import AdminSidebar from "../AdminSidebar";
import TopNav from "../TopNav";
import { Outlet } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

const UserAdminPage = () => {
  const [sidebarOpen, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebarOpen);
    console.log(sidebarOpen);
  };
  return (
    <div>
      <header >
        <TopNav  sidebarToggle={showSidebar}/>
      </header>
      <Row >
        <Col style={{padding: '0px'}} md={4} lg={3} >
          <div >
            <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={showSidebar} />
          </div>       
        </Col>
        <Col style={{marginTop: '10rem', padding: '0px'}} sm={12} md={sidebarOpen ? '8' : '12'} lg={sidebarOpen ? '8' : '12'}>
          <Outlet/>
        </Col>
      </Row>
    </div>
  );
}

export default UserAdminPage;
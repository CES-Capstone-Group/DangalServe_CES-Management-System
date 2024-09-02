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
      <header>
        <TopNav sidebarToggle={showSidebar}/>
      </header>
      <Row >
        <Col md={3} lg={12} >
          <div >
            <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={showSidebar} />
          </div>       
        </Col>
        <Col md={9} lg={12}>
          <Outlet/>
        </Col>
      </Row>
    </div>
  );
}

export default UserAdminPage;
import React from "react";
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
        <TopNav sidebarToggle={showSidebar}/>
      </header>
      <Row>
        <Col sm={12} md={3} lg={2}>
          <BrgySidebar sidebarOpen={sidebarOpen} toggleSidebar={showSidebar} />
        </Col>
        <Col sm={12} md={9} lg={10}>
          <Outlet/>
        </Col>
      </Row>
    </div>
  );
}

export default UserBarangayPage;
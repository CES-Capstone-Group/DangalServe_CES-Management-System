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
        <TopNav sidebarOpen={sidebarOpen} sidebarToggle={showSidebar}/>
      </header>
      <Row >
        <Col style={{padding: '0px'}} md={4} lg={3} >
          <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={showSidebar} />    
        </Col>
        <Col className="d-flex justify-content-center" 
             style={{marginTop: '10rem', padding: '0px', transition: '0.3s'}} 
             sm={12} md={sidebarOpen ? '8' : '12'} lg={sidebarOpen ? '8' : '8'}>
          <Outlet/>
        </Col>
      </Row>
    </div>
  );

//   return (
//     <div>
//   <header><TopNav /></header>
//   <br /> <br /><br /> <br />

//   <Row>
//     <Col md={1} lg={2}>
//       <AdminSidebar />
//     </Col>
//     <Col md={3} lg={10}>
//       <Outlet/>
//     </Col>
//   </Row>
// </div>
// );
}

export default UserAdminPage;
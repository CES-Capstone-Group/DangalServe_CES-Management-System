import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Row, Col, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faChevronLeft, faEye } from "@fortawesome/free-solid-svg-icons";
import "./table.css";

const ManageResponse = () => {
    const [contentType, setContentType] = useState("");
    const navigate = useNavigate();

    // Handle back navigation
    const handleBack = () => {
        navigate(-1);  // Navigate to the previous page
    };
    
    const studentData = [{id:1, stud_name:'Student Full Name', stud_email:'student@email.com', stud_num:'09986854452', stud_id:'19087657', course:'Bachelor of Science in Information Technology', stud_section:'4IT-A', stud_dept:'CSS'}];

    const nonteachingData = [{id:1, nt_name:'NonTeaching Full Name', nt_email:'student@email.com', nt_num:'09986854452', nt_dept:'Government', nt_brgy:'Bigaa'}];

    // Table student row 
    const StudentRows = (props) => {
        const { id, stud_name, stud_email, stud_num, stud_id, course, stud_section, stud_dept} = props;
        return (
            <tr>
                <td>{id}</td>
                <td>{stud_name}</td>
                <td>{stud_email}</td>
                <td>{stud_num}</td>
                <td>{stud_id}</td>
                <td>{course}</td>
                <td>{stud_section}</td>
                <td>{stud_dept}</td>
                <td>
                    <Button variant="success link">
                        Button
                    </Button>
                </td>
            </tr>
        );
    };

    // Table Student
    const StudentTable = ({ data }) => {
        return (
            <Table responsive bordered striped hover className="tableStyle">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Student Full Name</th>
                        <th>Student Email</th>
                        <th>Contact Number</th>
                        <th>Student ID</th>
                        <th>Course</th>
                        <th>Section</th>
                        <th>Department</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {studentData.map((student, index) => (
                        <StudentRows key={index}
                        id={student.id}
                        stud_name={student.stud_name}
                        stud_email={student.stud_email}  
                        stud_num={student.stud_num}
                        stud_id={student.stud_id} 
                        course={student.course}  
                        stud_section={student.stud_section}
                        stud_dept={student.stud_dept}
                        /> 
                    ))}
                </tbody>
            </Table>
        );
    };

    // Table Non Teaching row 
    const NonTeachingRows = (props) => {
        const { id, nt_name, nt_email, nt_num, nt_dept, nt_brgy} = props;
        return (
            <tr>
                <td>{id}</td>
                <td>{nt_name}</td>
                <td>{nt_email}</td>
                <td>{nt_num}</td>
                <td>{nt_dept}</td>
                <td>{nt_brgy}</td>
                <td>
                    <Button variant="success link">
                        Button
                    </Button>
                </td>
            </tr>
        );
    };
    // Table Non Teaching
    const NonTeachingTable = ({ data }) => {
        return (
            <Table responsive bordered striped hover className="tableStyle">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Department</th>
                        <th>Barangay</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {studentData.map((nt, index) => (
                        <NonTeachingRows key={index}
                        id={nt.id}
                        stud_name={nt.nt_name}
                        stud_email={nt.nt_email}  
                        stud_num={nt.nt_num}
                        stud_id={nt.nt_dept} 
                        course={nt.nt_brgy}  
                        /> 
                    ))}
                </tbody>
            </Table>
        );
    };

    return (
        <Container fluid style={{width: '100rem'}}
        className="vh-100 d-flex flex-column justify-content-center me-0 ms-0" >
            <Row>
                <Button variant="link" onClick={handleBack} className="backBtn d-flex align-items-center text-success">
                    <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                    <span className="ms-2">Back</span>
                </Button>

                <Col className="d-flex justify-content-end">
                    <Button style={{ backgroundColor: '#71A872', border: '0px' }}>
                        <FontAwesomeIcon className='me-2' icon={faFilter} ></FontAwesomeIcon>
                        Filter
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col><h1>Evaluation Response Management</h1></Col>
            </Row>
            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <input type="search" className="form-control" placeholder='Search' style={{ width: '300px' }} />
                </Col>
            </Row>

            {/* Render the achievements table */}
            <StudentTable data={studentData} />

        </Container>
    );
};

export default ManageResponse;

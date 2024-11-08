import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Table, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import BtnAddCourse from "./Buttons/Manage/BtnAddCourse"; // Import Add Course Button
import BtnEditDeleteCourse from "./Buttons/Manage/BtnEditDeleteCourse"; // Import Edit/Delete Course Button
import "./table.css";
import BtnAddQuestion from "./Buttons/Manage/BtnAddQuestion";
import BtnEditDeleteQuestions from "./Buttons/Manage/BtnEditDeleteQuestions";
import BtnAddSection from "./Buttons/Manage/BtnAddSection";

const ManageQuestions = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]); // State to store courses


    // **Handle Back Navigation**
    const handleBack = () => {
        navigate(-1); // Navigate to the previous page
    };



    const sections = [
        [
            {section: "A: Objectives", question_id:1, question:"Clarity of objectives"},
            {section: "A: Objectives", question_id:2, question:"Relevance of objectives"},
            {section: "A: Objectives", question_id:3, question:"Attainment of objectives"}
        ],
        [
            {section: "B. Activities", question_id:1, question:"Alignment with the objectives"},
            {section: "B. Activities", question_id:2, question:"Extent to which they enrich participants"}
        ],
        [
            {section: "C. Conduct of Activities", question_id:1, question:"Conduct of activities"}
        ]
    ];
    // **Row Component for Each Course**
    const Rows = (props) => {
        const {question_id, question } = props;

        return (
            <tr>
                <td>{question_id}</td>
                <td>{question}</td>
                {/* Pass Props to BtnEditDeleteCourse */}
                <td>
                    <BtnEditDeleteQuestions/>
                </td>
            </tr>
        );
    };

    // **NewTable Component to Display All Courses**
    const NewTable = ({ data , sectionName}) => {
        return (
            <div className="mb-5">
                <h3>{sectionName}</h3>
                <Table responsive striped bordered hover className="tableStyle">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Question</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((question) => (
                            <Rows
                                key={question.question_id}
                                question_id={question.question_id}
                                question={question.question}
                            />
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    };

    return (
        <Container 
            fluid 
            className="vh-80 d-flex flex-column justify-content-center m-5"
        >
            <Row>
                <Button 
                    variant="link" 
                    onClick={handleBack} 
                    className="backBtn d-flex align-items-center text-success me-3"
                >
                    <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                    <span className="ms-2">Back</span>
                </Button>
            </Row>
            <Row>
                <Col><h1>Questions Management</h1></Col>
            </Row>
            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <input 
                        type="search" 
                        className="form-control" 
                        placeholder="Search" 
                        style={{ width: "300px" }} 
                    />
                </Col>
            </Row>

            {sections.map((sectionData, index) => (
                <>
                    <NewTable
                    key={index}
                    data={sectionData}
                    sectionName={sectionData[0]?.section} // Pass the section name
                    />
                    <Row>
                        <Col className="mb-3 d-flex justify-content-end">
                    {/* Pass `fetchCourses` as Prop to BtnAddCourse */}
                            <BtnAddQuestion />
                        </Col>
                    </Row>
                </>
            ))}
            <Row>
                <Col className="d-flex align-items-center">
                    <BtnAddSection/>
                </Col>
            </Row>
        </Container>
    );
};

export default ManageQuestions;

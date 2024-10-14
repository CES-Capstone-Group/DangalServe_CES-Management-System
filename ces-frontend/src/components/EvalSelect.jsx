import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container, Button } from "react-bootstrap";
import pncbg from '../assets/pncbg.png'

const EvalSelect = () => {
    const roles = [{label:'Student'}, 
        {label:'Non Teaching'},
        {label:'Teaching'},
        {label:'Alumni'}
    ];

    return (
        <div className="vh-100 d-flex flex-column justify-content-center align-items-center fluid" style={{backgroundImage: pncbg}}>
            <Container className="d-flex flex-column justify-content-center align-items-center bg-white">
                {roles.map((roles, index) => (
                <Button key={index}  variant="outline-success"
                className="d-flex align-items-center mb-3 px-4 py-2"
                style={{ borderRadius: "10px", fontSize: "50px", width: "500px" }}>
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    {roles.label}
                </Button>
                ))}
            </Container>
        </div>
    );
};

export default EvalSelect;
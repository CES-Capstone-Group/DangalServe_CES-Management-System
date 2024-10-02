import React from "react";
import { Button, Row, Col, Form } from "react-bootstrap";


const BtnEditDelete = () => {
    
    return (
        < >
            <Button className="shadow" style={{ backgroundColor: "#71a872", border: '0px', color: 'white', margin: '15px', fontSize:'20px'}}>
                Edit
            </Button>
            <Button className="shadow" style={{ backgroundColor: "#ff3232", border: '0px', color: 'white', fontSize:'20px' }}>
                Delete
            </Button>
        </>
    );
};

export default BtnEditDelete;
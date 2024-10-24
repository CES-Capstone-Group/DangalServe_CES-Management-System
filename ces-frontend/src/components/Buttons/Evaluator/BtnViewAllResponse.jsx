import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BtnEvaluate = () => {

    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/responses';
        navigate(path);
    }

    return(
        <td>
            <Button onClick={routeChange} className='me-3' style={{backgroundColor:"#71A872", border: '0px', color: 'white'}}>View Response</Button>             
        </td>
    );
    
};

export default BtnEvaluate;
import React from "react";
import { Button } from "react-bootstrap";

const BtnEditDeac = () => {
    return(
        <td>
            <Button className='me-3' style={{backgroundColor:"#71A872", border: '0px'}}>Edit</Button>             
            <Button style={{backgroundColor:'#71A872', border: '0px'}}>Deactivate</Button>
        </td>
    );
    
};

export default BtnEditDeac;
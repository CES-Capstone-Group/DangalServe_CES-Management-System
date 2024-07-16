import React from "react";
import { Button } from "react-bootstrap";

const BtnViewApprove = () => {
    return(
        <td>
            <Button className='me-3' style={{backgroundColor:"#71A872", border: '0px'}}>View</Button>             
            <Button style={{backgroundColor:'#71A872', border: '0px'}}>Approve</Button>
        </td>
    );
    
};

export default BtnViewApprove;
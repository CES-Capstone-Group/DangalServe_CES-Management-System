import React, { useState } from "react";
import { Button, Container, Modal, Row, Col, Form, InputGroup } from "react-bootstrap";

const BtnAddProposal = () => {

    return (
        <div className="d-flex justify-content-end m-3">
            <div>
                <Button style={{ backgroundColor: "#71A872", border: '0px' }} onClick={handleShowModal}>
                    + Add Proposal
                </Button>
            </div>    
        </div>
    );
};

export default BtnAddProposal;
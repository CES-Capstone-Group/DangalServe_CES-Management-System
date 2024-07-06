import React from "react";
import { Button, Form, Modal} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const BtnAddAcc = () => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false); 


    return(
        <div>
            <Button onClick={handleShow} style={{backgroundColor: '#71A872', border: '0px'}}>
                <FontAwesomeIcon className="me-3" icon={faPlus}/>
                Add Account
            </Button>

            <Modal show={show} onHide={handleClose} className="p-6">
            <Modal.Header closeButton>
                <Button onClick={handleClose} className="me-5 mb-5 p-0 ps-2 pe-2" variant="success">Back</Button>
                <Modal.Title> Create An Account </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form >
                    <Form.Labe></Form.Labe>
                    <Form.Label>Type of Account</Form.Label>
                    <Form.Select>
                        <option value="1">Admin</option>
                        <option value="2">Coordinator</option>
                        <option value="3">Brgy. Official</option>
                    </Form.Select>
                    <Form.Label>Department</Form.Label>
                    <Form.Select>
                        <option value="1">BSCS</option>
                        <option value="2">BSIT</option>
                        <option value="3">BSA</option>
                        <option value="4">BSN</option>
                        <option value="5">BSIE</option>
                    </Form.Select>
                    <Form.Label>Status</Form.Label>
                    <Form.Select>
                        <option value="1">Active</option>
                        <option value="2">Inactive</option>
                    </Form.Select>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success"  onClick={handleClose}> Cancel </Button>
                <Button variant="success" onClick={handleClose}> Save Changes </Button>
            </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BtnAddAcc;
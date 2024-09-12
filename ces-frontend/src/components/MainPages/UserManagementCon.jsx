import React, { useState, useEffect } from "react";
import { Container, Table, Button, Row, Col } from "react-bootstrap";
import BtnEditDeac from "../Buttons/BtnEditDeac";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import BtnAddAcc from "../Buttons/BtnAddAcc";

const Rows = ({ accID, name, type, department, position, actDate, deacDate, status, fetchUsers }) => {
    const account = {
        accountID: accID,
        name: name,
        accountType: type,
        department: department,
        position: position,
        activationDate: actDate,
        deactivationDate: deacDate,
        status: status
    };

    const getCurrentDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const handleDeactivateAccount = async (accountID, newStatus) => {
        // Construct the updated account data with all required fields
        const updatedAccount = {
            ...account, // Include existing account fields
            status: newStatus,
            activationDate: newStatus === 'Active' ? getCurrentDate() : account.activationDate,
            deactivationDate: newStatus === 'Inactive' ? getCurrentDate() : null
        };
    
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/users/user_info_action/${accountID}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedAccount),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Response error data:', errorData);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Account status updated:", data);
            fetchUsers();  
        } catch (error) {
            console.error("Failed to update account status:", error);
        }
    };
    
    
    
    

    return (
        <tr>
            <td>{accID}</td>
            <td>{name}</td>
            <td>{type}</td>
            <td>{department}</td>
            <td>{position}</td>
            <td>{actDate}</td>
            <td>{deacDate}</td>
            <td>{status}</td>
            <td>
                <BtnEditDeac
                    account={account}
                    onDeactivate={handleDeactivateAccount}
                    onSave={fetchUsers}
                />
            </td>
        </tr>
    );
};

const NewTable = ({ data, fetchUsers }) => {
    return (
        <Table responsive striped hover>
            <thead style={{backgroundColor: '#F0F1F0'}}>                
                <tr>
                    <th>Account ID</th>
                    <th>Name</th>
                    <th>Type of Account</th>
                    <th>Department</th>
                    <th>Position</th>
                    <th>Activation Date</th>
                    <th>Deactivation Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <Rows 
                        key={row.accountID}  // Use a unique ID, like accountID
                        accID={row.accountID}
                        name={row.name}
                        type={row.accountType}
                        department={row.department}
                        position={row.position}
                        actDate={row.activationDate}
                        deacDate={row.deactivationDate}
                        status={row.status}
                        fetchUsers={fetchUsers}
                    />
                ))}
            </tbody>
        </Table>
    );
};

const BrgyProposalPage = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/users/');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setUsers(data);  // Update the state with the fetched users
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    useEffect(() => {
        fetchUsers(); 
    }, []);

    const handleAccountAdded = () => {
        fetchUsers();  
    };

    return (
        <Container fluid>
            <Row>
                <Col className="d-flex justify-content-end">
                    <Button style={{backgroundColor:'#71A872', border: '0px'}}>
                        <FontAwesomeIcon className='me-2' icon={faFilter}></FontAwesomeIcon>
                        Filter
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col><h1>ACCOUNT MANAGEMENT</h1></Col>
            </Row>
            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <input type="search" className="form-control" placeholder='Search' style={{width: '300px'}} />
                </Col>
            </Row>

            {/* Render the table with the latest data */}
            <NewTable data={users} fetchUsers={fetchUsers} />

            <Row>
                <Col className="mb-3 d-flex justify-content-end">
                    <BtnAddAcc onAccountAdded={handleAccountAdded} style={{backgroundColor:'#71A872', border: '0px'}}/>
                </Col>
            </Row>
        </Container>
    );
};

export default BrgyProposalPage;
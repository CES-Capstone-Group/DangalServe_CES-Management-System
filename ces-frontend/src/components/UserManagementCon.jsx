import React, { useState, useEffect } from "react";
import { Container, Table, Button, Row, Col } from "react-bootstrap";
import BtnEditDeac from "./Buttons/BtnEditDeac";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import BtnAddAcc from "./Buttons/BtnAddAcc";
import "./table.css"

const Rows = ({ user_id, username, type, department, position, actDate, deacDate, status, fetchUsers }) => {
    const account = {
        user_id: user_id,
        username: username,
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

    const handleDeactivateAccount = async (user_id, newStatus) => {
        // Construct the updated account data with all required fields
        const updatedAccount = {
            ...account, // Include existing account fields
            status: newStatus,
            activationDate: newStatus === 'Active' ? getCurrentDate() : account.activationDate,
            deactivationDate: newStatus === 'Inactive' ? getCurrentDate() : null
        };
    
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/users/user_info_action/${user_id}/`, {
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
            <td>{user_id}</td>
            <td>{username}</td>
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
        <Table responsive striped bordered hover className="tableStyle">
            <thead>                
                <th>Account ID</th>
                <th>Name</th>
                <th>Type of Account</th>
                <th>Department</th>
                <th>Position</th>
                <th>Activation Date</th>
                <th>Deactivation Date</th>
                <th>Status</th>
                <th>Actions</th>
            </thead>
            
                {data.map((row) => (
                    <Rows 
                        key={row.user_id}  // Use a unique ID, like accountID
                        user_id={row.user_id}
                        username={row.username}
                        type={row.accountType}
                        department={row.department}
                        position={row.position}
                        actDate={row.activationDate}
                        deacDate={row.deactivationDate}
                        status={row.status}
                        fetchUsers={fetchUsers}
                    />
                ))}
            
        </Table>
    );
};

const UserManagementCon = () => {
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
        <Container fluid className="fs-5">
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

export default UserManagementCon;
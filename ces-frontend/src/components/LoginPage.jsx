import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import CardImg from 'react-bootstrap/CardImg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import Logo from '../assets/pnclogo.png'
import './Login.css'
import UserAdminPage from './UserAdminPage'
import UserBarangayPage from './UserBarangayPage'
import UserCoorPage from './UserCoorPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function LoginPage(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if(username === 'admin' && password === 'admin'){
            setRole('admin');
            navigate('/admin');
        } else if (username === 'barangay' && password === 'barangay') {
            setRole('barangay');
            navigate('/barangay');
        } else if (username === 'coordinator' && password === 'coordinator') {
            setRole('coordinator');
            navigate('/coor');
        } else {
            alert('Invalid username or password');
        }
    }

    return(
        <div className="bg fluid">
            <Card style={{width: '900px', margin: '180px'}}>
                <Card.Img style={{width: '35rem', marginLeft: '6rem'}} variant='top' src={Logo}/>
                <Card.Title style={{textAlign: 'center'}}>Community Extension Service Management System</Card.Title><br/>
                <Form onSubmit={handleLogin}>
                    
                    {/* Username Input */}
                    <Form.Group className='mb-3' controlId='LogUsername'>
                        <Form.Label className='h5'>Username</Form.Label>
                        <InputGroup>
                            <Form.Control controlId="txtUsername" 
                            className='input'  
                            type='text' 
                            placeholder='Insert your username here' 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}/>
                        </InputGroup>
                    </Form.Group>

                    {/* Password Input */}
                    <Form.Group className='mb-3' controlId='LogPass'>
                        <Form.Label className='h5'>Password</Form.Label>
                        <InputGroup>
                            <Form.Control controlId="txtPassword" 
                            className='input ' 
                            type='password' 
                            placeholder='Insert your Password here' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                            <Button variant='success'><FontAwesomeIcon icon={faEye} /></Button>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="CheckBox">
                        <Form.Check type="checkbox" label="Remember Me" />
                    </Form.Group>

                    <Form.Group className='d-grid gap-2'>
                        <Button style={{marginTop: '2rem'}} controlId='button' variant='success' type='submit' size='lg'>Submit</Button>
                    </Form.Group>
                </Form>
            </Card>
        </div>
    );
}

export default LoginPage;
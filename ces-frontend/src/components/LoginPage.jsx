import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import Logo from '../assets/pnclogo.png'
import './Login.css'
import { Col, Container, Row } from 'react-bootstrap';

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
        } else if (username === 'evaluator' && password === 'evaluator') {
            setRole('evaluator');
            navigate('/eval');
        } else {
            alert('Invalid username or password');
        }
    }

    return(
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Card>
                <Card.Img className='fluid ps-5 pe-5' variant='top' src={Logo}/>
                <Card.Title style={{textAlign: 'center'}}>Community Extension Service Management System</Card.Title><br/>
                <Row>
                    <Col sm={12} md={12} lg={12}>
                        <Form onSubmit={handleLogin}>
                            {/* Username Input */}
                            <Row>
                                <Form.Group as={Col} className='mb-3 ps-5 pe-5' controlId='LogUsername'>
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
                            </Row>
                            
                            <Row>
                                {/* Password Input */}
                                <Form.Group as={Col} className='mb-3 ps-5 pe-5' controlId='LogPass'>
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
                            </Row>
                            
                            <Row>
                                <Form.Group as={Col} className="mb-3 ps-5" controlId="CheckBox">
                                    <Form.Check type="checkbox" label="Remember Me" />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} className='d-grid gap-2 ps-5 pe-5 pb-5'>
                                    <Button style={{marginTop: '2rem'}} controlId='button' variant='success' type='submit' size='lg'>Submit</Button>
                                </Form.Group>
                            </Row>        
                        </Form>
                    </Col>
                </Row>  
            </Card>
        </Container>
    );
}

export default LoginPage;
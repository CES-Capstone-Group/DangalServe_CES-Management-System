/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Updated: Importing both icons
import Logo from '../assets/pnclogo.png';
import './Login.css';
import { Col, Container, Row } from 'react-bootstrap';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const [rememberMe, setRememberMe] = useState(false); // State for "Remember Me" functionality
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    // Check if "Remember Me" was previously selected and populate username
    useEffect(() => {
        const rememberedUsername = localStorage.getItem('rememberedUsername');
        if (rememberedUsername) {
            setUsername(rememberedUsername);
            setRememberMe(true);
        }
    }, []);

    // Function to handle login
    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = { username, password };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const data = await response.json();
                
                // Save the JWT access and refresh tokens to localStorage
                localStorage.setItem('access_token', data.access_token); // Access token
                localStorage.setItem('refresh_token', data.refresh_token); // Refresh token
                localStorage.setItem('accountType', data.accountType); // Account type

                // Handle "Remember Me" functionality
                if (rememberMe) {
                    localStorage.setItem('rememberedUsername', username);
                } else {
                    localStorage.removeItem('rememberedUsername');
                }

                // Navigate to the appropriate page based on account type
                if (data.accountType === 'Admin') {
                    setRole('admin');
                    navigate('/admin');
                } else if (data.accountType === 'Brgy. Official') {
                    setRole('barangay');
                    navigate('/barangay');
                } else if (data.accountType === 'Proponent') {
                    setRole('coordinator');
                    navigate('/coor');
                } else if (data.accountType === 'Evaluator') {
                    setRole('evaluator');
                    navigate('/eval');
                }
            } else {
                const errorData = await response.json();
                alert('Login failed: ' + (errorData.error || 'Invalid credentials'));
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <body className='loginBg'>
            <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <Card>
                    <Card.Img className='fluid ps-5 pe-5' variant='top' src={Logo}/>
                    <Card.Title style={{textAlign: 'center'}}>Community Extension Service Management System</Card.Title><br/>
                    <Row>
                        <Col sm={12} md={12} lg={12}>
                            <Form onSubmit={handleLogin}>
                                <Row>
                                    <Form.Group as={Col} className='mb-3 ps-5 pe-5' controlId='LogUsername'>
                                        <Form.Label className='h5'>Username</Form.Label>
                                        <InputGroup>
                                            <Form.Control 
                                                controlId="txtUsername" 
                                                className='input'  
                                                type='text' 
                                                placeholder='Insert your username here' 
                                                value={username} 
                                                onChange={(e) => setUsername(e.target.value)} />
                                        </InputGroup>
                                    </Form.Group>
                                </Row>
                                
                                <Row>
                                    <Form.Group as={Col} className='mb-3 ps-5 pe-5' controlId='LogPass'>
                                        <Form.Label className='h5'>Password</Form.Label>
                                        <InputGroup>
                                            <Form.Control 
                                                controlId="txtPassword" 
                                                className='input ' 
                                                type={showPassword ? 'text' : 'password'} // Show or hide password
                                                placeholder='Insert your Password here' 
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)} />
                                            <Button variant='success' onClick={togglePasswordVisibility}>
                                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                            </Button>
                                        </InputGroup>
                                    </Form.Group>
                                </Row>
                                
                                <Row>
                                    <Form.Group as={Col} className="mb-3 ps-5" controlId="CheckBox">
                                        <Form.Check 
                                            type="checkbox" 
                                            label="Remember Me"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)} 
                                        />
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
        </body>
    );
}

export default LoginPage;

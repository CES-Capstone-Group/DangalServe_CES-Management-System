import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Logo from '../assets/pnclogo.png';
import './Login.css';
import { Col, Container, Row } from 'react-bootstrap';
import { jwtDecode } from "jwt-decode";

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const rememberedUsername = localStorage.getItem('rememberedUsername');
        if (rememberedUsername) {
            setUsername(rememberedUsername);
            setRememberMe(true);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        const loginData = { username, password };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/token/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);

                // Decode the access token to get the accountType and other user info
                const decodedToken = jwtDecode(data.access);  // Using jwt_decode
                const accountType = decodedToken.accountType;
                if (rememberMe) {
                    localStorage.setItem('rememberedUsername', username);
                } else {
                    localStorage.removeItem('rememberedUsername');
                }

                redirectToRolePage(accountType);
            } else {
                const errorData = await response.json();
                alert('Login failed: ' + ( 'Invalid credentials'));
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    const redirectToRolePage = (accountType) => {
        if (accountType === 'Admin') {
            navigate('/landing');
        } else if (accountType === 'Brgy. Official') {
            navigate('/barangay');
        } else if (accountType === 'Proponent') {
            navigate('/coor');
        } else if (accountType === 'Evaluator') {
            navigate('/eval');
        } else {
            alert('Unknown account type!');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <body className='loginBg'>
            <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <Card>
                    <Card.Img className='fluid ps-5 pe-5' variant='top' src={Logo} />
                    <Card.Title className='text-success' style={{ textAlign: 'center', fontSize: '3vh' }}>Community Extension Service Management System</Card.Title><br />
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
                                                type={showPassword ? 'text' : 'password'}
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
                                        <Button style={{ marginTop: '2rem' }} controlId='button' variant='success' type='submit' size='lg'>Submit</Button>
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

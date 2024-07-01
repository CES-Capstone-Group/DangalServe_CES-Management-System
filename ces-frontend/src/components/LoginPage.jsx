import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import CardImg from 'react-bootstrap/CardImg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Logo from '../assets/pnclogo.png'

function LoginPage(){
    return(
        <body className="bg">
            <Card>
                <Card.Img variant='top' src={Logo}/>
                <Card.Title style={{textAlign: 'center'}}>Community Extension Service Management System</Card.Title><br/><br/>
                <Form>
                    <Form.Group className='mb-3' controlId='LogUsername'>
                        <Form.Label>Username</Form.Label>
                        <InputGroup>
                            <Form.Control className='input'  type='text' placeholder='Insert your username here'/>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='LogPass'>
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                            <Form.Control className='input' type='password' placeholder='Insert your Password here'/>
                            <Button><FontAwesomeIcon icon="fa-solid fa-eye" /></Button>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="CheckBox">
                        <Form.Check type="checkbox" label="Remember Me" />
                    </Form.Group>

                    <Form.Group className='d-grid gap-2'>
                        <Button controlId='button' variant='success' type='submit' size='lg'>Submit</Button>
                    </Form.Group>
                    
                </Form>
            </Card>
        </body>
    );
}

export default LoginPage;
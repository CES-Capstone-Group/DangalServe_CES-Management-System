import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function LoginPage(){
    return(
        <body className="bg">
            <Card>
                <Form>
                    <Form.Group className='mb-3' controlId='LogUsername'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control className='input'  type='text' placeholder='Insert your username here'/>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='LogPass'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control className='input' type='password' placeholder='Insert your Password here'/>
                        <button></button>
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
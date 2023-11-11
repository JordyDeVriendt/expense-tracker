import {FunctionComponent, useContext, useEffect} from 'react';
import {Button, Form} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import {AccountContext} from '../../context/accountContext';

const Login: FunctionComponent = () => {
    const {isLoggedIn} = useContext(AccountContext)
    const navigate = useNavigate()

    useEffect(() => {
        console.log(isLoggedIn)
        if (isLoggedIn) {
            navigate('/')
        }
    }, [isLoggedIn]);
    const handleLogin = () => {
        console.log('logging in...')
    }
    return (
        <Form>
            <h1>Log in</h1>
            <Link to={'/signup'}>No account? No problem sign up now ></Link>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"/>
            </Form.Group>
            <Button onClick={() => handleLogin()}>Log in</Button>
        </Form>
    );
};

export default Login;

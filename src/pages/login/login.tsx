import {FunctionComponent, useContext, useEffect, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import {AccountContext} from '../../context/accountContext';
import {useCheckAccount} from '../../API/accountAPI';

const Login: FunctionComponent = () => {
    const [email,setEmail] = useState<string>('')
    const [password,setPassword] = useState<string>('')
    const {isLoggedIn} = useContext(AccountContext)
    const navigate = useNavigate()

    const {mutate, data, error} = useCheckAccount();

    useEffect(() => {
        console.log(isLoggedIn)
        if (isLoggedIn) {
            navigate('/')
        }
    }, [isLoggedIn]);

    const handleLogin = async () => {
        console.log('logging in...')
        try {
            const result = await mutate({email,password})
            console.log(result)
            console.log('succces')
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <Form>
            <h1>Log in</h1>
            <Link to={'/signup'}>No account? No problem sign up now ></Link>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" value={email}
                              onChange={(evt) => setEmail(evt.currentTarget.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password}
                              onChange={(evt) => setPassword(evt.currentTarget.value)}/>
            </Form.Group>
            <Button onClick={() => handleLogin()}>Log in</Button>
        </Form>
    );
};

export default Login;

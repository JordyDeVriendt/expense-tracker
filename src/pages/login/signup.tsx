import {FunctionComponent, useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button, Form} from 'react-bootstrap';
import {useCreateAccount} from '../../API/accountAPI';
import {AccountContext} from '../../context/accountContext';

const Signup: FunctionComponent = () => {
    const [username,setUsername] = useState<string>('')
    const [email,setEmail] = useState<string>('')
    const [password,setPassword] = useState<string>('')
    const { mutate: createAccount} = useCreateAccount()
    const {isLoggedIn} = useContext(AccountContext)
    const navigate = useNavigate()

    useEffect(() => {
        console.log(isLoggedIn)
        if (isLoggedIn) {
            navigate('/')
        }
    }, [isLoggedIn]);

    const handleSignup = async () => {
        console.log('signing up...')
        if (!username || !email || !password) {
            console.log('Not all inputs are filled in, cannot sign up!');
        } else {
            try {
                await createAccount({username, email, password});
            } catch (error) {
                console.error('Error creating account:', error.message);
            }
        }
    }

    return (
        <Form>
            <h1>Sign up here</h1>
            <Link to={'/login'}>Already have an account? log in here</Link>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="username" value={username}
                              onChange={evt => setUsername(evt.currentTarget.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" value={email}
                              onChange={evt => setEmail(evt.currentTarget.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password}
                              onChange={evt => setPassword(evt.currentTarget.value)}/>
            </Form.Group>
            <Button onClick={() => handleSignup()}>Sign up</Button>
        </Form>
    );
};

export default Signup;

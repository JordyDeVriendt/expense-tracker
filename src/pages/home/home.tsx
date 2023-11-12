import {FunctionComponent, useContext, useEffect, useState} from 'react';
import {useCreateTransaction, useTransactionsByAccountId} from '../../API/accountAPI';
import {AccountContext} from '../../context/accountContext';
import {useNavigate} from 'react-router-dom';
import {Button, Col, Form, Row} from 'react-bootstrap';
import Transactions from './transactions';

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
    const [name,setName] = useState<string>('')
    const [amount,setAmount] = useState<string>('')

    const {isLoggedIn,id} = useContext(AccountContext)

    const { data: transactions, isLoading, isError } = useTransactionsByAccountId(id ?? '1')
    const { mutate: createTransaction } = useCreateTransaction()

    const navigate = useNavigate()

    useEffect(() => {
        console.log(isLoggedIn)
        if (!isLoggedIn) {
            navigate('/login')
        }
    }, [isLoggedIn]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error fetching transactions</p>;
    }

    const handleSave = () => {
        console.log('saving transaction...')
        if (name && amount && id) {
            setName('')
            setAmount('')
            createTransaction({ name: name, amount: amount, accountId: id });
        }
    }

    return (
        <>
            <h1>My Budget Planner</h1>
            <Row>
                <Transactions Transactions={transactions}/>
                <div>
                    <h3>Add transaction</h3>
                    <Form>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="transaction name" value={name}
                                                  onChange={(evt) => setName(evt.currentTarget.value)}/>
                                </Form.Group>

                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Amount</Form.Label>
                                    <Form.Control type="text" placeholder="amount" value={amount}
                                                  onChange={(evt) => setAmount(evt.currentTarget.value)}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="primary" style={{ marginRight: '5px' }}
                                onClick={() => handleSave()}>Save</Button>{' '}
                    </Form>
                </div>
            </Row>
        </>
    );
};

export default Home;

import {FunctionComponent, useContext, useEffect} from 'react';
import {useTransactionsByAccountId} from '../../API/accountAPI';
import {AccountContext} from '../../context/accountContext';
import {useNavigate} from 'react-router-dom';
import {Col, Row} from 'react-bootstrap';
import Transactions from './transactions';

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
    const {isLoggedIn,id} = useContext(AccountContext)
    const {data: transactions, isLoading, isError} = useTransactionsByAccountId(id ?? '1')
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

    return (
        <>
            <h1>welkom op home page!</h1>
            <Row>
                <Transactions Transactions={transactions}/>
            </Row>
        </>
    );
};

export default Home;

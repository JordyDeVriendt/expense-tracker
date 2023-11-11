import {FunctionComponent} from 'react';
import { Col, ListGroup} from 'react-bootstrap';
import {Transaction} from '../../models/ITransaction';

interface TransactionsProps {
    Transactions?: Transaction[]
}

const Transactions: FunctionComponent<TransactionsProps> = ({Transactions}) => {
    return (
        <Col>
            <div>
                <h3>Transactions</h3>
                <ListGroup>
                    {Transactions?.map(t => (
                        <ListGroup.Item key={t.id}>{t.name} - $ {t.amount}</ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </Col>
    );
};

export default Transactions;

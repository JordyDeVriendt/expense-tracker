import {FunctionComponent, useState} from 'react';
import {Col, ListGroup, Button, Modal, Form} from 'react-bootstrap';
import {Transaction} from '../../models/ITransaction';
import Pagination from '../../pagination';
import {useDeleteTransaction, useUpdateTransaction} from '../../API/accountAPI';

interface TransactionsProps {
    Transactions?: Transaction[]
}

const Transactions: FunctionComponent<TransactionsProps> = ({Transactions = []}) => {
    const [page,setPage] = useState<number>(1)

    const [showDeleteModal, setShowDeleteModel] = useState(false)
    const [deleteName,setDeleteName] = useState<string>('')
    const [deleteId,setDeleteId] = useState<string>('')

    const [showEditModal, setShowEditModal] = useState(false)
    const [editName,setEditName] = useState<string>('')
    const [editAmount,setEditAmount] = useState<string>('')
    const [editId,setEditId] = useState<string>('')

    const { mutate: deleteTransaction } = useDeleteTransaction()
    const { mutate: updateTransaction } = useUpdateTransaction()

    const handleSetPage = (page:number) => {
        setPage(page)
    }

    const handleDeleteTransaction = (id:string) => {
        deleteTransaction({id:id})
        setShowDeleteModel(false)
    }

    const handleCloseDelete = () => {
        setDeleteName('')
        setDeleteId('')
        setShowDeleteModel(false)
    };

    const handleShowDelete = (id:string,name:string) => {
        setDeleteId(id)
        setDeleteName(name)
        setShowDeleteModel(true)
    };

    const handleUpdateTransaction = () => {
        updateTransaction({ id: editId, name: editName, amount: editAmount})
        setShowEditModal(false)
    }

    const handleCloseEdit = () => {
        setEditName('')
        setEditAmount('')
        setEditId('')
        setShowEditModal(false)
    }
    const handleShowEdit = (name:string,amount:string,id:string) => {
        setEditName(name)
        setEditAmount(amount)
        setEditId(id)
        setShowEditModal(true)
    }

    return (
        <Col>
            <div>
                <h3>Transactions</h3>
                <ListGroup>
                    {Transactions?.slice(((page - 1) * 10),(10 * page)).map(t => (
                        <ListGroup.Item key={t.id}>
                            <div className="row">
                                <div className="col-md-6">
                                    {t.name} - $ {t.amount}
                                </div>
                                <div className="col-md-6 d-flex justify-content-end">
                                    <Button variant="primary" style={{ marginRight: '5px' }}
                                            onClick={() => handleShowEdit(t.name,t.amount,t.id)}>Edit</Button>{' '}
                                    <Button variant="outline-danger" style={{ marginRight: '5px' }}
                                            onClick={() => handleShowDelete(t.id,t.name)}>Delete</Button>{' '}
                                </div>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <Pagination page={page} setPage={handleSetPage} limit={10} total={Transactions?.length}/>
            </div>
            <Modal show={showDeleteModal} onHide={handleCloseDelete} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete transaction {deleteName}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteTransaction(deleteId)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showEditModal} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Transaction name"
                                autoFocus
                                value={editName}
                                onChange={(evt) => setEditName(evt.currentTarget.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="amount"
                                autoFocus
                                value={editAmount}
                                onChange={(evt) => setEditAmount(evt.currentTarget.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleUpdateTransaction()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Col>
    );
};

export default Transactions;

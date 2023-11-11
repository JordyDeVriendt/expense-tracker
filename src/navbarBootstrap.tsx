import {FunctionComponent, useContext} from 'react';
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {AccountContext} from './context/accountContext';

const NavbarBootstrap: FunctionComponent = () => {
    const {username,isLoggedIn,logOut} = useContext(AccountContext)
    return (
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container>
                <LinkContainer to={'/'}>
                    <Navbar.Brand>Expense tracker</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to={'/'}>
                            <Nav.Link disabled={!isLoggedIn}>Home</Nav.Link>
                        </LinkContainer>
                        {!isLoggedIn ? (
                            <>
                                <LinkContainer to={'/login'}>
                                    <Nav.Link>sign in</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to={'/signup'}>
                                    <Nav.Link>sign up</Nav.Link>
                                </LinkContainer>
                            </>
                        ) : (
                            <Navbar.Collapse className="justify-content-end">
                                <Navbar.Text>
                                    Signed in as: <a onClick={() => logOut()}>{username}</a>
                                </Navbar.Text>
                            </Navbar.Collapse>
                        ) }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarBootstrap;

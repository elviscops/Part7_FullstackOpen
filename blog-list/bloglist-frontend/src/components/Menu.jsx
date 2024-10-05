import {
    BrowserRouter as Router,
    Routes, Route, Link, useParams,
    useNavigate
  } from 'react-router-dom'
  import { Navbar, Nav, Form, FormControl, Button, NavItem, Container } from 'react-bootstrap';
  import LoggedInUser from "../components/LoggedInUser";

const Menu = () => {

    return (
        <><Navbar fixed="top" bg="light" data-bs-theme="light" expand="lg" className="bg-body-tertiary">
            <Container>
                <Nav>
                    <Nav.Item>
                        <Link style={{ padding: '10px', color: 'Black', 'textDecoration': 'none' }} to="/">Home</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link style={{ padding: '10px', color: 'Black', 'textDecoration': 'none' }} to="/users">Users</Link>
                    </Nav.Item>
                </Nav>
                <LoggedInUser />
            </Container>
        </Navbar></> 
    )
  }

export default Menu;
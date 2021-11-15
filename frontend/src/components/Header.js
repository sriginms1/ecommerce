import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

function Header() {
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <NavLink to="/">
                    <Navbar.Brand>Family Mart</Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <NavLink className={({ isActive }) => isActive ? "red" : "blue"} to="/cart">
                        <i className="fas fa-shopping-cart"></i>Cart
                    </NavLink>
                    <NavLink className={({ isActive }) => isActive ? "red" : "blue"} to="/login">
                       <i className="fas fa-user"></i>Login
                    </NavLink>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </header>
    )
}

export default Header

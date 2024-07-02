// src/components/CustomNavbar.js
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Navbar_Button = () => {

    return (
        <Container className="text-center">
            <Button as={Link} to="/" variant="primary" className="me-2">Home</Button>
            <Button as={Link} to="/add" variant="warning" className="me-2">Add Employee</Button>
        </Container>
    );
};

export default Navbar_Button;

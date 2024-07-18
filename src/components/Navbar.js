// src/components/Navbar.js
import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import UserProfilePopup from './UserProfile';

const AppNavbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAdmin = JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).RoleId === 4;

  return (
    <Navbar bg={isAdmin ? "dark" : "primary"} variant={isAdmin ? "dark" : "light"} expand="lg">
      <Container>
        <Navbar.Brand as={Link} to={isAdmin ? "/admin-subjectlist" : "/"}>
          <img
            alt=""
            src="/logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          {isAdmin ? "Admin Home" : "Home"}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={isAdmin ? "/admin-subjectlist" : "/subjectsList"}>
              {isAdmin ? "Admin Subject List" : "Subjects List"}
            </Nav.Link>
            {isAdmin && (
              <Nav.Link as={Link} to="/admin/add-subject">
                Add Subject
              </Nav.Link>
            )}
            {!isAdmin && (
              <Nav.Link as={Link} to="/blogs">
                Blogs
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {JSON.parse(localStorage.getItem('user')) || user ? (
              <>
                <UserProfilePopup text={"Hello, " + JSON.parse(localStorage.getItem('user')).FullName} />
                <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <Button variant="outline-light" as={Link} to="/login">Login</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Lab05_AuthContext';
const Lab05_NavigationBar = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  
  const handleLogout = () => {
    auth.logout();
    navigate('/login'); // Chuyển hướng người dùng về trang đăng nhập
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#">VyAn Shop</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/orders">Đơn Hàng</Nav.Link>
        <Nav.Link href="/add-order">Thêm Đơn Hàng</Nav.Link>
      </Nav>
      {auth.user && (
        <Button variant="outline-info" onClick={handleLogout}>Đăng Xuất</Button>
      )}
    </Navbar>
  );
};

export default Lab05_NavigationBar;

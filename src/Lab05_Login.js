import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from './Lab05_AuthContext';
const Lab05_Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await auth.login(email, password);
    if (success) {
      navigate('/orders'); // Chuyển hướng người dùng đến trang danh sách đơn hàng
    } else {
      alert('Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Nhập email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Mật khẩu</Form.Label>
        <Form.Control type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Đăng nhập
      </Button>
    </Form>
  );
};
export default Lab05_Login;
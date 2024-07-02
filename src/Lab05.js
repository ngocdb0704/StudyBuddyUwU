import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lab05_Login from './Lab05_Login';
import Lab05_OrderList from './Lab05_OrderList';
import Lab05_AddOrderForm from './Lab05_AddOrderForm';
import Lab05_NavigationBar from './Lab05_NavigationBar';
import { AuthProvider } from './Lab05_AuthContext'
import { Navigate } from 'react-router-dom';

const Lab05 = () => {
    // Một component bảo vệ route
    const ProtectedRoute = ({ children }) => {
        const user = JSON.parse(localStorage.getItem('user')); 

        if (!user) {
            // Nếu không có thông tin người dùng, chuyển hướng về trang đăng nhập
            return <Navigate to="/login" />;
        }

        return children;
    };
    return (
        <AuthProvider>
            <Router>
                <Lab05_NavigationBar />
                <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={<Lab05_OrderList />} />
                        <Route path="/login" element={<Lab05_Login />} />
                        <Route path="/orders" element={<Lab05_OrderList />} />
                        <Route path="/add-order" element={<ProtectedRoute><Lab05_AddOrderForm /></ProtectedRoute>} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default Lab05;

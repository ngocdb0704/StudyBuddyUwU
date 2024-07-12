// src/context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:9999/User');
      setUsers(response.data);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const login = (email, password) => {
    const foundUser = users.find((user) => user.Email === email && user.Password === password);
    if (foundUser) {
      setUser(foundUser);
      return foundUser;
    } else {
      return null;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, users, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
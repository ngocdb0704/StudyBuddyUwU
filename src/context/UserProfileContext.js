// src/context/UserProfileContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserProfileContext = createContext();

const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({
      "UserId": 0,
      "Email": "",
      "Password": "",
      "RoleId": 0,
      "FullName": "Guest",
      "GenderId": 0,
      "Mobile": "",
      "IsActive": false
  });
  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export default UserProfileProvider;

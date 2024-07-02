// src/context/EmployeeContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState({ male: true, 'fe male': true });
  const [team, setTeam] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const deptResponse = await axios.get('http://localhost:9999/departments');
      setDepartments(deptResponse.data);
      const empResponse = await axios.get('http://localhost:9999/employees');
      setEmployees(empResponse.data);
    };
    fetchData();
  }, []);
  const addEmployee = async (employee) => {
    const response = await axios.post('http://localhost:9999/employees', {
      ...employee,
      id: employees.length + 1,
      department: Number(employee.department),
    });
    setEmployees([...employees, response.data]);
  };

  const getDepartmentName = (departmentId) => {
    const department = departments.find(dept => dept.id == departmentId);
    return department ? department.name : 'Unknown';
  };

  const addEmployeeToTeam = (employee, quantity) => {
    const existingMember = team.find(member => member.id == employee.id);
    if (existingMember) {
      setTeam(team.map(member => 
        member.id == employee.id ? { ...member, quantity: member.quantity + quantity } : member
      ));
    } else {
      setTeam([...team, { ...employee, quantity }]);
    }
  };

  const increaseQuantity = (id) => {
    setTeam(team.map(member => 
      member.id == id ? { ...member, quantity: member.quantity + 1 } : member
    ));
  };

  const decreaseQuantity = (id) => {
    setTeam(team.map(member => {
      if (member.id == id) {
        if (member.quantity > 1) {
          return { ...member, quantity: member.quantity - 1 };
        } else {
          return null; // Đánh dấu để xóa
        }
      }
      return member;
    }).filter(member => member !== null));
  };

  const removeEmployeeFromTeam = (id) => {
    setTeam(team.filter(member => member.id != id));
  };

  const updateQuantity = (id, quantity) => {
    setTeam(team.map(member => 
      member.id == id ? { ...member, quantity } : member
    ));
  };
  return (
    <EmployeeContext.Provider value={{ departments, employees, setEmployees, selectedDepartment, setSelectedDepartment, searchTerm, setSearchTerm, addEmployee, getDepartmentName, genderFilter, setGenderFilter, 
      team,
      addEmployeeToTeam,
      increaseQuantity,
      decreaseQuantity,
      removeEmployeeFromTeam,
      updateQuantity }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeProvider;

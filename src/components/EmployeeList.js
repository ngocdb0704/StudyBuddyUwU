// src/components/EmployeeList.js
import React, { useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { EmployeeContext } from '../context/EmployeeContext';
import axios from 'axios';

const EmployeeList = () => {
  const { employees, selectedDepartment, searchTerm, getDepartmentName,setEmployees,genderFilter  } = useContext(EmployeeContext);

  const filteredEmployees = employees.filter(employee => {
    const matchesDepartment = selectedDepartment ? employee.department == selectedDepartment : true;
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = genderFilter[employee.gender.toLowerCase()];
    return matchesDepartment && matchesSearch && matchesGender;
  });

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:9999/employees/${id}`);
        setEmployees(employees.filter(employee => employee.id !== id));
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Date of Birth</th>
          <th>Gender</th>
          <th>Position</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredEmployees.map(employee => (
          <tr key={employee.id}>
            <td>{employee.name}</td>
            <td>{employee.dob}</td>
            <td>{employee.gender}</td>
            <td>{employee.position}</td>
            <td>{getDepartmentName(employee.department)}</td>
            <td>
            <div className="d-flex justify-content-between">
                <Button as={Link} to={`/employee/${employee.id}`} variant="info" size="sm">Detail</Button>
                <Button as={Link} to={`/edit/${employee.id}`} variant="warning" size="sm">Edit</Button>
                <Button onClick={() => handleDelete(employee.id)} variant="danger" size="sm">Delete</Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default EmployeeList;

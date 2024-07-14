// src/components/EditEmployeeForm.js
import React, { useState, useContext, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { EmployeeContext } from '../context/SubjectContext';
import axios from 'axios';

const EditEmployeeForm = () => {
  const { employees, departments, setEmployees } = useContext(EmployeeContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    dob: '',
    gender: '',
    position: '',
    department: ''
  });

  useEffect(() => {
    const emp = employees.find(emp => emp.id == parseInt(id));
    if (emp) {
      setEmployee(emp);
    }
  }, [id, employees]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:9999/employees/${id}`, 
        {
          ...employee,
          department: Number(employee.department),
        }
      );
      setEmployees(employees.map(emp => (emp.id == parseInt(id) ? response.data : emp)));
      navigate('/');
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={employee.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          name="dob"
          value={employee.dob}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Gender</Form.Label>
        <Form.Control
          as="select"
          name="gender"
          value={employee.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Fe male">Fe male</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Position</Form.Label>
        <Form.Control
          type="text"
          name="position"
          value={employee.position}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Department</Form.Label>
        <Form.Control
          as="select"
          name="department"
          value={employee.department}
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>
          {departments.map(department => (
            <option key={department.id} value={department.id}>{department.name}</option>
          ))}
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">Save Changes</Button>
    </Form>
  );
};

export default EditEmployeeForm;

// src/components/AddEmployeeForm.js
import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { EmployeeContext } from '../context/EmployeeContext';

const AddEmployeeForm = () => {
  const { departments, addEmployee } = useContext(EmployeeContext);
  const [employee, setEmployee] = useState({
    name: '',
    dob: '',
    gender: '',
    position: '',
    department: ''
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEmployee(employee);
    setEmployee({ name: '', dob: '', gender: '', position: '', department: '' });
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
      <Button variant="primary" type="submit">Add Employee</Button>
    </Form>
  );
};

export default AddEmployeeForm;

// src/components/DepartmentList.js
import React, { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { EmployeeContext } from '../context/EmployeeContext';

const DepartmentList = () => {
  const { departments, setSelectedDepartment } = useContext(EmployeeContext);

  return (
    <ListGroup>
      <ListGroup.Item onClick={() => setSelectedDepartment(null)}>All Departments</ListGroup.Item>
      {departments.map(department => (
        <ListGroup.Item key={department.id} onClick={() => setSelectedDepartment(department.id)}>
          {department.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default DepartmentList;

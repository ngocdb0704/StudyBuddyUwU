import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { EmployeeContext } from '../context/EmployeeContext';

const EmployeeDetail = () => {
  const { employees } = useContext(EmployeeContext);
  const { id } = useParams();
  const employee = employees.find(emp => emp.id == parseInt(id));

  if (!employee) {
    return <h2>Employee not found</h2>;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{employee.name}</Card.Title>
        <Card.Text>
          <strong>DOB:</strong> {employee.dob}<br/>
          <strong>Gender:</strong> {employee.gender}<br/>
          <strong>Position:</strong> {employee.position}<br/>
          <strong>Department:</strong> {employee.department}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default EmployeeDetail;

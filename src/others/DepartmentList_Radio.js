// src/components/DepartmentList.js
import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { EmployeeContext } from '../context/EmployeeContext';

const DepartmentList_Radio = () => {
  const { departments, selectedDepartment, setSelectedDepartment } = useContext(EmployeeContext);

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value === "all" ? null : parseInt(e.target.value));
  };

  return (
    <Form>
      <Form.Group>
        <Form.Check
          type="radio"
          label="All Departments"
          name="department"
          value="all"
          checked={selectedDepartment === null}
          onChange={handleDepartmentChange}
        />
        {departments.map(department => (
          <Form.Check
            type="radio"
            key={department.id}
            label={department.name}
            name="department"
            value={department.id}
            checked={selectedDepartment === department.id}
            onChange={handleDepartmentChange}
          />
        ))}
      </Form.Group>
    </Form>
  );
};

export default DepartmentList_Radio;

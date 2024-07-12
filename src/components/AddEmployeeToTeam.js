import React, { useState, useContext, useEffect } from 'react';
import { Table, Button, Form, Container, Row, Col } from 'react-bootstrap';
import { EmployeeContext } from '../context/SubjectContext';

const AddEmployeeToTeam = () => {
  const { employees, team, addEmployeeToTeam } = useContext(EmployeeContext);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    // Khởi tạo giá trị số lượng từ trạng thái team
    const initialQuantities = {};
    team.forEach(member => {
      initialQuantities[member.id] = member.quantity;
    });
    setQuantities(initialQuantities);
  }, [team]);

  const handleQuantityChange = (id, value) => {
    setQuantities({ ...quantities, [id]: parseInt(value, 10) });
  };

  const handleAdd = (employee) => {
    const quantity = parseInt(quantities[employee.id], 10) || 1;
    addEmployeeToTeam(employee, quantity);
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={10}>
          <h2 className="mb-4">Add Employee to Team</h2>
          <Table striped bordered hover responsive className="text-center">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Department</th>
                <th>Quantity</th>
                <th>Add</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.position}</td>
                  <td>{employee.department}</td>
                  <td>
                    <Form.Control
                      type="number"
                      min="1"
                      value={quantities[employee.id] || 1}
                      onChange={(e) => handleQuantityChange(employee.id, e.target.value)}
                    />
                  </td>
                  <td>
                    <Button variant="primary" onClick={() => handleAdd(employee)}>
                      Add
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AddEmployeeToTeam;

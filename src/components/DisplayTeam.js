import React, { useContext } from 'react';
import { Table, Button, Form, Container, Row, Col } from 'react-bootstrap';
import { EmployeeContext } from '../context/SubjectContext';

const DisplayTeam = () => {
  const { team, increaseQuantity, decreaseQuantity, removeEmployeeFromTeam, updateQuantity } = useContext(EmployeeContext);

  const total = team.reduce((sum, member) => sum + (member.department * member.quantity), 0);

  const handleQuantityChange = (id, value) => {
    const quantity = parseInt(value, 10);
    if (!isNaN(quantity) && quantity >= 0) {
      updateQuantity(id, quantity);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={10}>
          <h2 className="mb-4">Team Members</h2>
          <Table striped bordered hover responsive className="text-center">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Department</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {team.map(member => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{member.position}</td>
                  <td>{member.department}</td>
                  <td>
                    <Form.Control
                      type="number"
                      min="0"
                      value={member.quantity}
                      onChange={(e) => handleQuantityChange(member.id, e.target.value)}
                    />
                  </td>
                  <td>
                    <Button variant="success" onClick={() => increaseQuantity(member.id)} className="me-2">
                      +
                    </Button>
                    <Button variant="warning" onClick={() => decreaseQuantity(member.id)} className="me-2">
                      -
                    </Button>
                    <Button variant="danger" onClick={() => removeEmployeeFromTeam(member.id)}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h3 className="mt-4">Total: {total}</h3>
        </Col>
      </Row>
    </Container>
  );
};

export default DisplayTeam;

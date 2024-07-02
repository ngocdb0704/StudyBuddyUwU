// src/components/Search.js
import React, { useContext } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { EmployeeContext } from '../context/EmployeeContext';

const Search = () => {
  const { searchTerm, setSearchTerm, genderFilter, setGenderFilter } = useContext(EmployeeContext);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleGenderChange = (e) => {
    const { name, checked } = e.target;
    setGenderFilter({ ...genderFilter, [name]: checked });
  };

  return (
    <Form>
    <Row>
      <Col md={8}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Search employees by name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group>
          <Form.Check
            type="checkbox"
            label="Male"
            name="male"
            checked={genderFilter.male}
            onChange={handleGenderChange}
          />
          <Form.Check
            type="checkbox"
            label="Fe male"
            name="fe male"
            checked={genderFilter['fe male']}
            onChange={handleGenderChange}
          />
        </Form.Group>
      </Col>
    </Row>
  </Form>
  );
};

export default Search;

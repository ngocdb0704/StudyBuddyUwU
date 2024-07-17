// src/components/Search.js
import React, { useContext } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { SubjectContext } from "../context/SubjectContext";

const Search = () => {
  const { searchTerm, setSearchTerm } = useContext(SubjectContext);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Form>
      <Row>
        <Col md={9}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search Subjects by Title"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default Search;

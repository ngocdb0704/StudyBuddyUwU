import React, { useState } from 'react';
import { Form, Button, FormControl, Row, Col } from 'react-bootstrap';

const Lab05_SearchBarCheckBox = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchByCustomer, setSearchByCustomer] = useState(false);
  const [searchByProduct, setSearchByProduct] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm, { searchByCustomer, searchByProduct });
  };

  return (
    <Form onSubmit={handleSearch}>
      <Row>
        <Col md={8}>
          <FormControl
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={4} className="mb-3">
          <Form.Check 
            inline
            label="Customer Name"
            type="checkbox"
            id="searchByCustomer"
            checked={searchByCustomer}
            onChange={(e) => setSearchByCustomer(e.target.checked)}
          />
          <Form.Check 
            inline
            label="Product Name"
            type="checkbox"
            id="searchByProduct"
            checked={searchByProduct}
            onChange={(e) => setSearchByProduct(e.target.checked)}
          />
          <Button variant="primary" type="submit">Search</Button>
        </Col>
      </Row>
    </Form>
  );
};
export default Lab05_SearchBarCheckBox;
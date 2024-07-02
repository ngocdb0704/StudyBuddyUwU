import React, { useState } from 'react';
import { Row, Col, Form, Button, InputGroup, FormControl } from 'react-bootstrap';

const Lab05_SearchBarRadioButton = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('Customer'); // Mặc định tìm kiếm theo tên khách hàng

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm, searchType);
    };

    return (
        <Form onSubmit={handleSearch}>
            <Row className="align-items-center">
                <Col md={6}>
                    <Form.Check
                        inline
                        type="radio"
                        label="Customer Name"
                        name="searchType"
                        id="customerName"
                        value="Customer"
                        checked={searchType === 'Customer'}
                        onChange={(e) => setSearchType(e.currentTarget.value)}
                        className="mr-3"
                    />
                    <Form.Check
                        inline
                        type="radio"
                        label="Product Name"
                        name="searchType"
                        id="productName"
                        value="Product"
                        checked={searchType === 'Product'}
                        onChange={(e) => setSearchType(e.currentTarget.value)}
                    />
                </Col>
                <Col md={4}>
                    <FormControl
                        placeholder={`Search by ${searchType === 'Customer' ? 'Customer Name' : 'Product Name'}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                    />
                </Col>
                <Col md={2}>
                    <Button variant="outline-secondary" type="submit">Search</Button>
                </Col>
            </Row>
        </Form>
    );
};
export default Lab05_SearchBarRadioButton;
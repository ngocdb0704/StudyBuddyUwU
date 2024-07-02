import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';
const Lab05_AddOrderForm = () => {

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
  }, []);

  const fetchCustomers = async () => {
    const response = await axios.get('http://localhost:3001/customers');
    setCustomers(response.data);
  };

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:3001/products');
    setProducts(response.data);
  };
  const fetchMaxOrderId = async () => {
    const response = await axios.get('http://localhost:3001/orders');
    const orders = response.data;

    const maxId = orders.reduce((max, order) => Math.max(max, order.id), 0);
    return maxId;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const maxId = await fetchMaxOrderId();
    const orderId = maxId + 1;

    const newOrder = {
      id: orderId,
      customerId: selectedCustomer,
      productId: selectedProduct,
      quantity: Number(quantity)
    };
    await axios.post('http://localhost:3001/orders', newOrder);
    // Reset form or show success message
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col sm={4}>
          <Form.Group controlId="formCustomerSelect">
            <Form.Label>Customer</Form.Label>
            <Form.Control as="select" value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)}>
              <option value="">Select a customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>{customer.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col sm={4}>
          <Form.Group controlId="formProductSelect">
            <Form.Label>Product</Form.Label>
            <Form.Control as="select" value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col sm={4}>
          <Form.Group controlId="formQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" type="submit">
        Add Order
      </Button>
    </Form>
  );
};

export default Lab05_AddOrderForm;

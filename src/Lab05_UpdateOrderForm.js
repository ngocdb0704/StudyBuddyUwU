import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const Lab05_UpdateOrderForm = ({ show, onHide, order, fetchOrders }) => {
  const [selectedProduct, setSelectedProduct] = useState(order.productId);
  const [quantity, setQuantity] = useState(order.quantity);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:3001/products');
    setProducts(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedOrder = {
      ...order,
      productId: selectedProduct,
      quantity: Number(quantity),
    };
    await axios.put(`http://localhost:3001/orders/${order.id}`, updatedOrder);
    fetchOrders();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Update Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="updateOrderProduct">
            <Form.Label>Product</Form.Label>
            <Form.Control as="select" value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)}>
              {products.map(product => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="updateOrderQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">Update</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default Lab05_UpdateOrderForm;
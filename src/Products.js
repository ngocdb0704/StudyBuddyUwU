import React, { useState } from 'react';
import { Card, Button, Form, Col, Row } from 'react-bootstrap';

const Products = () => {
    const [products, setProducts] = useState([
        { name: "Sản phẩm 3", category: "Đồ gia dụng", price: 150, year: 2020, imageUrl: "/images/event-2.jpg" },
        { name: "Sản phẩm 4", category: "Thực phẩm", price: 50, year: 2022, imageUrl: "/images/event-3.jpg" },
        { name: "Sản phẩm 5", category: "Điện tử", price: 800, year: 2018, imageUrl: "/images/event-4.jpg" },
        { name: "Sản phẩm 6", category: "Thể thao", price: 250, year: 2020, imageUrl: "/images/event-5.jpg" },
        { name: "Sản phẩm 7", category: "Giáo dục", price: 100, year: 2019, imageUrl: "/images/event-6.jpg" },
        { name: "Sản phẩm 8", category: "Văn phòng phẩm", price: 20, year: 2021, imageUrl: "/images/event-7.jpg" },
        { name: "Sản phẩm 9", category: "Thời trang", price: 500, year: 2019, imageUrl: "/images/event-8.jpg" },
        { name: "Sản phẩm 10", category: "Sức khỏe", price: 600, year: 2022, imageUrl: "/images/event-1.jpg" },
        { name: "Sản phẩm 11", category: "Du lịch", price: 700, year: 2018, imageUrl: "/images/event-2.jpg" },
        { name: "Sản phẩm 12", category: "Công nghệ", price: 1100, year: 2020, imageUrl: "/images/event-3.jpg" },
        { name: "Sản phẩm 13", category: "Thời trang", price: 400, year: 2022, imageUrl: "/images/event-4.jpg" },
        { name: "Sản phẩm 14", category: "Điện tử", price: 850, year: 2021, imageUrl: "/images/event-5.jpg" },
        { name: "Sản phẩm 15", category: "Nội thất", price: 250, year: 2019, imageUrl: "/images/event-6.jpg" },
        { name: "Sản phẩm 16", category: "Thể thao", price: 550, year: 2018, imageUrl: "/images/event-7.jpg" },
        { name: "Sản phẩm 17", category: "Đồ chơi", price: 60, year: 2020, imageUrl: "/images/event-8.jpg" },
        { name: "Sản phẩm 18", category: "Sức khỏe", price: 320, year: 2021, imageUrl: "/images/event-1.jpg" },
        { name: "Sản phẩm 19", category: "Giáo dục", price: 180, year: 2019, imageUrl: "/images/event-2.jpg" },
        { name: "Sản phẩm 20", category: "Văn phòng phẩm", price: 90, year: 2022, imageUrl: "/images/event-3.jpg" },
    ]);

    const [filter, setFilter] = useState('');
    const [newProduct, setNewProduct] = useState({
        name: '',
        category: '',
        price: '',
        year: '',
        imageUrl: '',
    });

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleAddProduct = () => {
        setProducts([...products, newProduct]);
        setNewProduct({
            name: '',
            category: '',
            price: '',
            year: '',
            imageUrl: '',
        });
    };

    const filteredProducts = products.filter((product) =>
        product.category.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <Row className="mb-3">
                <Col md={4}>
                    <Form.Control
                        type="text"
                        placeholder="Lọc theo danh mục"
                        value={filter}
                        onChange={handleFilterChange}
                    />
                </Col>
            </Row>

            <Row className="mb-3">
                {filteredProducts.map((product, index) => (
                    <Col md={4} key={index}>
                        <Card className="mb-3">
                            <Card.Img variant="top" src={product.imageUrl} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>Danh mục: {product.category}</Card.Text>
                                <Card.Text>Giá: ${product.price}</Card.Text>
                                <Card.Text>Năm: {product.year}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <h3>Thêm Sản Phẩm</h3>
            <Form>
                <Row>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Tên sản phẩm"
                            name="name"
                            value={newProduct.name}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Danh mục"
                            name="category"
                            value={newProduct.category}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="number"
                            placeholder="Giá"
                            name="price"
                            value={newProduct.price}
                            onChange={handleInputChange}
                        />
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Form.Control
                            type="number"
                            placeholder="Năm"
                            name="year"
                            value={newProduct.year}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="URL hình ảnh"
                            name="imageUrl"
                            value={newProduct.imageUrl}
                            onChange={handleInputChange}
                        />
                    </Col>
                </Row>
                <Button className="mt-3" onClick={handleAddProduct}>
                    Thêm Sản Phẩm
                </Button>
            </Form>
        </div>
    );
};

export default Products;

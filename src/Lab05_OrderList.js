import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Lab05_UpdateOrderForm from './Lab05_UpdateOrderForm';
import Lab05_SearchBarRadioButton from './Lab05_SearchBarRadioButton';
import Lab05_SearchBarDropDown from './Lab05_SearchBarDropDown';
import Lab05_SearchBarCheckBox from './Lab05_SearchBarCheckBox';

const Lab05_OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [displayedOrders, setDisplayedOrders] = useState(orders);
    
    const [customers, setCustomers] = useState({});
    const [products, setProducts] = useState({});


    useEffect(() => {
        fetchOrders();
        fetchCustomers();
        fetchProducts();
    }, []);

    const fetchOrders = async () => {
        const response = await axios.get('http://localhost:3001/orders');
        setOrders(response.data);
        setDisplayedOrders(response.data);
    };

    const fetchCustomers = async () => {
        const response = await axios.get('http://localhost:3001/customers');
        const customersMap = response.data.reduce((acc, customer) => {
            acc[customer.id] = { name: customer.name, email: customer.email };
            return acc;
        }, {});
        setCustomers(customersMap); //customers
    };

    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:3001/products');
        const productsMap = response.data.reduce((acc, product) => {
            acc[product.id] = product.name;
            return acc;
        }, {});
        setProducts(productsMap); 
    };
    const deleteOrder = async (orderId) => {
        await axios.delete(`http://localhost:3001/orders/${orderId}`);
        fetchOrders(); // Làm mới danh sách đơn hàng sau khi xóa
    };

    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);

    const handleShowUpdateModal = (order) => {
        setCurrentOrder(order);  //currentOrder = order;
        setShowUpdateModal(true);
    };

   
    const handleSearch = (searchTerm, searchType) => {
        let filteredOrders;
        if (searchTerm.trim() !== '') {
            filteredOrders = orders.filter((order) => {
                const productName = products[order.productId].toLowerCase();
                const customerName = customers[order.customerId]?.name.toLowerCase();
                const searchText = searchTerm.toLowerCase();
                return searchType === 'Product' ? productName.includes(searchText) : customerName.includes(searchText);
            });
        }
        else
            filteredOrders = orders;

        setDisplayedOrders(filteredOrders);
    };
    // tìm kiếm theo checkbox
    const handleSearchCheckBox = (searchTerm, { searchByCustomer, searchByProduct }) => {
        let filteredOrders = orders.filter((order) => {      
            const lowerCaseSearchTerm = searchTerm.toLowerCase();     
            // Lấy tên khách hàng và sản phẩm tương ứng với mỗi đơn hàng
            const customerName = customers[order.customerId]?.name.toLowerCase() || "";
            const productName = products[order.productId]?.toLowerCase() || "";  
            // Kiểm tra xem từ khóa tìm kiếm có khớp với tên khách hàng hoặc tên sản phẩm
            const customerMatch = searchByCustomer && customerName.includes(lowerCaseSearchTerm);
            const productMatch = searchByProduct && productName.includes(lowerCaseSearchTerm);
            return customerMatch || productMatch;       
          });
      
        setDisplayedOrders(filteredOrders);
      };

    return (
        <>
            <Lab05_SearchBarDropDown onSearch={handleSearch} />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer Name</th>
                        <th>Customer Email</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedOrders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{customers[order.customerId]?.name}</td> 
                            <td>{customers[order.customerId]?.email}</td>
                            <td>{products[order.productId]}</td>
                            <td>{order.quantity}</td>
                            <td>
                                <button variant="info" onClick={() => handleShowUpdateModal(order)}>Update</button>
                                <button variant="danger" onClick={() => deleteOrder(order.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {currentOrder && (
                <Lab05_UpdateOrderForm
                    show={showUpdateModal}
                    onHide={() => setShowUpdateModal(false)}
                    order={currentOrder}
                    fetchOrders={fetchOrders}
                />
            )}
        </>
    );
};

export default Lab05_OrderList;

import React, { useContext, useEffect, useState } from 'react';
import { Table, Button, Card, Pagination, Badge, Container, Row, Col, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SubjectContext } from '../context/SubjectContext';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import FilterPaid from './PaidFilter';
import Search from './Search';

const RegistrationList = () => {
    const { subjects, packages, filterPaid, searchTerm } = useContext(SubjectContext);
    const { user } = useContext(UserContext);
    const [currentPage, setCurrentPage] = useState(1);
    const subjectsPerPage = 3;
    const [registData, setRegistData] = useState([]);

    useEffect(() => {
        fetchRegist();
    }, []);
    const fetchRegist = async () => {
        if (user) {
            const regResponse = await axios.get(
                "http://localhost:9999/Registration?UserId=" + user.UserId
            );
            setRegistData(regResponse.data);
        }
    };
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options);
    };

    const filteredRegists = registData.filter(regist => {
        const subPack = packages.filter(pack => pack.PackageId === regist.PackageId).at(0);
        const subject = subjects.filter(sub => sub.SubjectId == subPack.SubjectId).at(0);
        const matchesSearch = subject.SubjectTitle.toLowerCase().includes(searchTerm.toLowerCase());
        const paidFilter = filterPaid === '' || regist.Status === (filterPaid === 'true');
        return paidFilter && matchesSearch;
    });

    const deleteSubject = async (id) => {
        if (window.confirm('Confirm subject cancellation?') == true) {
            await axios.delete(`http://localhost:9999/Registration/${id}`);
            fetchRegist();
        }
    };

    // Pagination logic
    const indexOfLastSubject = currentPage * subjectsPerPage;
    const indexOfFirstSubject = indexOfLastSubject - subjectsPerPage;
    const currentSubjects = filteredRegists.slice(indexOfFirstSubject, indexOfLastSubject);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredRegists.length / subjectsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <h2>Search</h2>
                    <Search />
                    <h2>Status</h2>
                    <FilterPaid />
                </Col>
                <Col md={9}>
                    <h2>Registrations</h2>
                    {currentSubjects.map(registration => {
                        const subPack = packages.filter(pack => pack.PackageId === registration.PackageId).at(0);
                        const subject = subjects.filter(sub => sub.SubjectId == subPack.SubjectId).at(0);

                        return (
                            <Card key={registration.id} style={{ width: '18rem', display: 'inline-block', marginLeft: '1%', marginBottom: '1%' }}>
                                <Card.Img variant="top" src={'/thumbnails/' + subject.SubjectThumbnail} style={{ height: '10rem' }} />
                                <Card.Body>
                                    <Card.Title> <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {subject ? subject.SubjectTitle : 'N/A'}
                                    </div>
                                    </Card.Title>
                                    <Card.Text>
                                        <p>
                                            {subject.SubjectTagLine}
                                        </p>
                                        <p>
                                            Package: <span style={{ fontWeight: 'bold' }}>{subPack ? subPack.PackageName : 'N/A'}</span>
                                            <br />
                                            Price: <span style={{ fontWeight: 'bold' }}>{subPack ? Number(subPack.SalePrice) * 1000 : 'N/A'} VND</span>
                                            <Badge style={{ marginLeft: '10%' }} bg={registration.Status == true ? 'success' : 'danger'}>
                                                {registration.Status == true ? 'Paid' : 'Unpaid'}
                                            </Badge>
                                        </p>
                                        <p>
                                            Registration Time: {registration.RegistrationTime ? formatDate(registration.RegistrationTime) : 'N/A'}
                                            <br />
                                            Valid From: {registration.ValidFrom ? formatDate(registration.ValidFrom) : 'N/A'}
                                            <br />
                                            Valid To: {registration.ValidTo ? formatDate(registration.ValidTo) : 'N/A'}
                                        </p>
                                    </Card.Text>
                                    <Card.Footer>
                                        <Container>
                                            <Row>
                                                <Col style={{ marginRight: '3%' }} >
                                                    <Row style={{ marginBottom: '10%' }}>
                                                        <Button as={Link} to={`/registration/pay/${registration.id}`}
                                                            disabled={registration.Status == true}
                                                            variant="success"
                                                            style={{opacity:(registration.Status == true ? '0.6' : '')}}>
                                                            Buy
                                                        </Button>
                                                    </Row>
                                                    <Row>
                                                        <Button variant='danger'
                                                            disabled={registration.Status == true}
                                                            style={{opacity:(registration.Status == true ? '0.6' : '')}}
                                                            onClick={() => deleteSubject(registration.id)}>
                                                            Cancel
                                                        </Button>
                                                    </Row>
                                                </Col>
                                                <Col style={{ marginRight: '3%' }} >
                                                    <Row style={{ marginBottom: '10%' }} >
                                                        <Button
                                                            as={Link} to={`/registration/edit/${registration.id}`}
                                                            disabled={registration.Status == true}
                                                            style={{opacity:(registration.Status == true ? '0.6' : '')}}
                                                            variant="warning">
                                                            Edit
                                                        </Button>
                                                    </Row>
                                                    <Row>
                                                        <Button variant="primary">
                                                            Report
                                                        </Button>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                        )
                    })}
                    <Pagination className="justify-content-center">
                        {pageNumbers.map(number => (
                            <Pagination.Item key={number} onClick={() => paginate(number)} active={number === currentPage}>
                                {number}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Col>
            </Row>
        </Container>
    );
};

export default RegistrationList;
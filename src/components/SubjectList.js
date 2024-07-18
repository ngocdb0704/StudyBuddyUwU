import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Pagination, Row } from 'react-bootstrap';
import { SubjectContext } from '../context/SubjectContext';
import { UserContext } from '../context/UserContext';

import CategoryList from './CaregoryList';
import StatusFilter from './SubjectLevelFilter';
import Search from './Search';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RegisterFilter from './SubjectRegisterFilter';

const SubjectList = () => {
  const { subjects, selectedCategory, searchTerm, levelFilter, packages, addRegistration, register } = useContext(SubjectContext);
  const { user } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const subjectsPerPage = 6;
  const [registData, setRegistData] = useState([]);
  
  useEffect(() => {
    fetchRegist();
    console.log(registData);
  }, []);
  const fetchRegist = async () => {
    if (user) {
      const regResponse = await axios.get(
        "http://localhost:9999/Registration?UserId=" + user.UserId
      );
      setRegistData(regResponse.data);
    }
  };

  const filteredSubjects = subjects.filter(subject => {
    let registered = !registData.some(pack=> pack.SubjectId === subject.SubjectId);
    if(register) registered = !registered;
    const matchStatus = subject.SubjectStatus === true;
    const matchesCategory = selectedCategory ? subject.SubjectCategoryId === Number(selectedCategory) : true;
    const matchesSearch = subject.SubjectTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = (subject.SubjectLevelId === 1 && levelFilter.level1) || (subject.SubjectLevelId === 2 && levelFilter.level2) || (subject.SubjectLevelId === 3 && levelFilter.level3);
    return matchesCategory && matchesSearch && matchesLevel && matchStatus && registered;
  });


  const handleRegister = (pack, sub) => {
    if (pack && sub) {
      if (user && window.confirm('Confirm Registration?') == true) {
        addRegistration(pack, user.UserId, sub);
        alert('success');
        fetchRegist();
      }
      else if (!user) alert('Please login!');
    }
    else alert('Failed!');
  }

  // Pagination logic
  const indexOfLastSubject = currentPage * subjectsPerPage;
  const indexOfFirstSubject = indexOfLastSubject - subjectsPerPage;
  const currentSubjects = filteredSubjects.slice(indexOfFirstSubject, indexOfLastSubject);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredSubjects.length / subjectsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Container>
      <Row>
        <Col md={3}>
          <h2>Search</h2>
          <Search />
          <br></br>
          {user? <>
            <h2>Registered</h2>
          <RegisterFilter />
          <br></br>
          </>  :<></>}
          <h2>Levels</h2>
          <StatusFilter />
          <br></br>
          <h2>Categories</h2>
          <CategoryList />
        </Col>
        <Col md={9}>
          <h2>Subjects List</h2>
          <div>
            {currentSubjects.map(subject => {
              const foundRegistered = registData.find((sub) => sub.SubjectId === subject.SubjectId);
              const subPack = packages.filter(pack => pack.SubjectId === subject.SubjectId).sort((a, b) => a.SalePrice - b.SalePrice).at(0);
              return (
                <Card key={subject.SubjectId} style={{ width: '18rem', display: 'inline-block', marginLeft: '1%', marginBottom: '1%' }}>
                  <Card.Img variant="top" src={`/thumbnails/${subject.SubjectThumbnail}`} style={{ height: '10rem' }} />
                  <Card.Body>
                    <Card.Title> <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      <Link to={`/Subject/${subject.SubjectId}`}>
                        {subject.SubjectTitle}
                      </Link>
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
                      </p>
                    </Card.Text>
                    <Button variant="primary"
                      onClick={() => handleRegister(subPack.PackageId, subject.SubjectId)}
                      disabled={foundRegistered}>
                      Register
                    </Button>
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
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SubjectList;

// src/components/admin/AdminSubjectList.js
import React, { useContext, useState } from 'react';
import { Table, Button, Card, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SubjectContext } from '../../context/SubjectContext';

const AdminSubjectList = () => {
  const { subjects, selectedCategory, searchTerm, setSubjects, levelFilter, packages } = useContext(SubjectContext);
  const [currentPage, setCurrentPage] = useState(1);
  const subjectsPerPage = 6;

  const filteredSubjects = subjects.filter(subject => {
    const matchesCategory = selectedCategory ? subject.SubjectCategoryId === Number(selectedCategory) : true;
    const matchesSearch = subject.SubjectTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = (subject.SubjectLevelId === 1 && levelFilter.level1) || (subject.SubjectLevelId === 2 && levelFilter.level2) || (subject.SubjectLevelId === 3 && levelFilter.level3);
    return matchesCategory && matchesSearch && matchesLevel;
  });

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
    <div>
      {currentSubjects.map(subject => {
        const subPack = packages.filter(pack => pack.SubjectId === subject.SubjectId).sort((a, b) => a.SalePrice - b.SalePrice).at(0);
        return (
          <Card key={subject.SubjectId} style={{ width: '18rem', display: 'inline-block', marginLeft: '1%', marginBottom: '1%' }}>
            <Card.Img variant="top" src={subject.SubjectThumbnail.startsWith("data:") ? subject.SubjectThumbnail : (subject.SubjectThumbnail.length > 1 ? `/thumbnails/${subject.SubjectThumbnail}` : `/thumbnails/default-thumbnail.jpg`)} style={{ height: '10rem' }} />
            <Card.Body>
              <Card.Title>
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {subject.SubjectTitle}
                </div>
              </Card.Title>
              <Card.Text>
                <p>{subject.SubjectTagLine}</p>
                <p>
                  Package: <span style={{ fontWeight: 'bold' }}>{subPack ? subPack.PackageName : 'N/A'}</span>
                  <br />
                  Price: <span style={{ fontWeight: 'bold' }}>{subPack ? Number(subPack.SalePrice) * 1000 : 'N/A'} VND</span>
                </p>
              </Card.Text>
              
              <Link to={`/admin/subjects/${subject.SubjectId}`} className="btn btn-primary">Overview</Link>
            </Card.Body>
          </Card>
        );
      })}
      <Pagination className="justify-content-center">
        {pageNumbers.map(number => (
          <Pagination.Item key={number} onClick={() => paginate(number)} active={number === currentPage}>
            {number}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default AdminSubjectList;
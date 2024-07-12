import React, { useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SubjectContext } from '../context/SubjectContext';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const SubjectList = () => {
  const { subjects, categories, selectedCategory, searchTerm, getCategoryName, setSubjects, levelFilter } = useContext(SubjectContext);
  const { users } = useContext(UserContext); 

  // const filteredSubjects = subjects.filter(subject => {
  //   const matchesCategory = selectedCategory ? subject.SubjectCategoryId === Number(selectedCategory) : true;
  //   const matchesSearch = subject.SubjectTitle.toLowerCase().includes(searchTerm.toLowerCase());
  //   return matchesCategory && matchesSearch;
  // });

  const filteredSubjects = subjects.filter(subject => {
    const matchesCategory = selectedCategory ? subject.SubjectCategoryId === Number(selectedCategory) : true;
    const matchesSearch = subject.SubjectTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = (subject.SubjectLevelId === 1 && levelFilter.level1) || (subject.SubjectLevelId === 2 && levelFilter.level2) || (subject.SubjectLevelId === 3 && levelFilter.level3);
    console.log(`Subject ID: ${subject.SubjectId}, Title: ${subject.SubjectTitle}`);
    console.log(`Subject Category ID: ${subject.SubjectCategoryId}, Selected Category: ${selectedCategory}`);
    console.log(`Matches Category: ${matchesCategory}, Matches Search: ${matchesSearch}`);
    return matchesCategory && matchesSearch && matchesLevel;
  });

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this subject?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:9999/subjects/${id}`);
        setSubjects(subjects.filter(subject => subject.subjectId !== id));
      } catch (error) {
        console.error('Error deleting subject:', error);
      }
    }
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Title</th>
          <th>Provider</th>
          <th>Category</th>
          <th>Status</th>
          <th>Level</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredSubjects.map(subject => (
          <tr key={subject.SubjectId}>
            <td>{subject.SubjectTitle}</td>
            <td>{users.find(user => user.UserId === Number(subject.SubjectProviderId))?.FullName || 'Unknown' }</td>
            <td>{categories.find(category => category.SubjectCategoryId === Number(subject.SubjectCategoryId))?.SubjectCategoryName || 'Unknown'}</td>
            <td>{subject.SubjectStatus ? 'Active' : 'Inactive'}</td>
            <td>{subject.SubjectLevelId}</td>
            <td>
              <div className="d-flex justify-content-between">
                <Button as={Link} to={`/Subject/${subject.SubjectId}`} variant="info" size="sm">Detail</Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SubjectList;
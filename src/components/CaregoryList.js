// src/components/CategoryList.js
import React, { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { SubjectContext } from '../context/SubjectContext';

const CategoryList = () => {
  const { categories, setSelectedCategory } = useContext(SubjectContext);

  return (
    <ListGroup>
      <ListGroup.Item onClick={() => setSelectedCategory(null)}>All</ListGroup.Item>
      {categories.map(category => (
        <ListGroup.Item key={category.SubjectCategoryId} onClick={() => setSelectedCategory(category.SubjectCategoryId)}>
          {category.SubjectCategoryName}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CategoryList;

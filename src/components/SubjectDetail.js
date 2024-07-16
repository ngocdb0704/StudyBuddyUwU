import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { SubjectContext } from '../context/SubjectContext';
import { UserContext } from '../context/UserContext';

const SubjectDetail = () => {
  const { id } = useParams();
  const { subjects, categories } = useContext(SubjectContext);
  const { users } = useContext(UserContext);
  const subject = subjects.find(subject => subject.SubjectId === Number(id));

  if (!subject) {
    return <div>Loading...</div>;
  }

  const categoryName = categories.find(category => category.SubjectCategoryId === subject.SubjectCategoryId)?.title || 'Unknown';
  const creatorName = users.find(user => user.UserId === subject.SubjectOwnerId)?.FullName || 'Unknown';

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="8">
          <Card>
            <Card.Body>
              <Card.Title>{subject.SubjectTitle}</Card.Title>
              <Card.Text>
                <strong>Creator:</strong> {creatorName} <br/>
                <strong>Category:</strong> {categoryName}<br/>
                <strong>Status:</strong> {subject.SubjectStatus ? 'Active' : 'Inactive'}<br />
                <strong>Is Featured:</strong> {subject.IsFeaturedSubject ? 'Yes' : 'No'}<br />
                <strong>Created Date:</strong> {new Date(subject.SubjectCreatedDate).toLocaleDateString()}<br />
                <strong>Tag Line:</strong> {subject.SubjectTagLine}<br />
                <strong>Brief Info:</strong> {subject.SubjectBriefInfo}<br />
              </Card.Text>
              <Card.Text dangerouslySetInnerHTML={{ __html: subject.SubjectDescription }} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SubjectDetail;
import React, { useContext, useState } from 'react';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';
import { SubjectContext } from '../../context/SubjectContext';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import '../css/AdminSubjectOverview.css';

const AddSubject = () => {
  const { categories, addSubject } = useContext(SubjectContext);
  const { users } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    brief: '',
    description: '',
    category: '',
    level: '',
    featured: false,
    status: false, 
    thumbnail: '',
    owner: '',
    ownerId: '',
    ownerEmail: '',
  });

  const [showOwnerModal, setShowOwnerModal] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, thumbnail: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    addSubject({
      SubjectTitle: formData.title,
      SubjectTagLine: formData.tagline,
      SubjectBriefInfo: formData.brief,
      SubjectDescription: formData.description,
      SubjectCategoryId: parseInt(formData.category),
      SubjectLevelId: parseInt(formData.level),
      IsFeaturedSubject: formData.featured,
      SubjectStatus: formData.status === 'true' ? true : false, 
      SubjectThumbnail: formData.thumbnail,
      SubjectOwnerId: formData.ownerId,
    });
    navigate('/admin-subjectlist');
  };

  const handleSelectOwner = (owner) => {
    setSelectedOwner(owner);
  };

  const handleConfirmOwner = () => {
    if (selectedOwner) {
      setFormData({
        ...formData,
        owner: `${selectedOwner.FullName}`,
        ownerEmail: `${selectedOwner.Email}`,
        ownerId: selectedOwner.UserId,
      });
    }
    setShowOwnerModal(false);
  };

  return (
    <div className="container">
      <h1>Add New Subject</h1>
      <Form>
        <Row>
          <Col md={8}>
            <Form.Group controlId="subjectTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="subjectCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.SubjectCategoryId} value={category.SubjectCategoryId}>
                    {category.SubjectCategoryName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="subjectLevel">
              <Form.Label>Level</Form.Label>
              <Form.Control
                as="select"
                name="level"
                value={formData.level}
                onChange={handleChange}
              >
                <option value="">Select Level</option>
                <option value="1">Level 1</option>
                <option value="2">Level 2</option>
                <option value="3">Level 3</option>
              </Form.Control>
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group style={{ paddingTop: '30px' }} controlId="subjectFeatured" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="subjectStatus">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value={true}>Published</option>
                    <option value={false}>Unpublished</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="subjectOwner">
              <Form.Label>Owner</Form.Label>
              <div className="d-flex align-items-center">
                <i className="bi bi-person-circle" style={{ width: '30px', height: '70px' }}></i>
                <div>
                  <p>{formData.owner}</p>
                  <p>{formData.ownerEmail}</p>
                  <Button variant="primary" onClick={() => setShowOwnerModal(true)}>
                    Change owner
                  </Button>
                </div>
              </div>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="subjectThumbnail">
              <Form.Label>Thumbnail</Form.Label>
              <div className="d-flex flex-column align-items-center">
                <img
                  src={formData.thumbnail ? formData.thumbnail : '/thumbnails/default-thumbnail.jpg'}
                  alt="Thumbnail"
                  className="mb-2"
                  style={{ width: '100%', height: '280px' }}
                />
                <Form.Control
                  id="thumbnailUpload"
                  label="Choose File"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="subjectTagline">
          <Form.Label>Tagline</Form.Label>
          <Form.Control
            type="text"
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="subjectBrief">
          <Form.Label>Brief Info</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="brief"
            value={formData.brief}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="subjectDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAdd}>
          Add
        </Button>
      </Form>

      <Modal show={showOwnerModal} onHide={() => setShowOwnerModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Owner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="owner-list">
            {users.map((user) => (
              <li
                key={user.UserId}
                className={selectedOwner?.UserId === user.UserId ? "selected" : ""}
                onClick={() => handleSelectOwner(user)}
              >
                {user.FullName} - {user.Email}
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOwnerModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirmOwner}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddSubject;
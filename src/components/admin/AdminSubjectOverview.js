import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { SubjectContext } from "../../context/SubjectContext";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";

const AdminSubjectOverview = () => {
  const { id } = useParams();
  const { subjects, updateSubject, categories } = useContext(SubjectContext);
  const { users } = useContext(UserContext);

  const subject = subjects.find(
    (subject) => subject.SubjectId === parseInt(id)
  );
  const subjectOwner = users.find(
    (user) => user.UserId === subject?.SubjectOwnerId
  );
  const creatorName = subjectOwner?.FullName || "Unknown";
  const creatorEmail = subjectOwner?.Email || "Unknown";

  const [formData, setFormData] = useState({
    title: subject?.SubjectTitle || "",
    tagline: subject?.SubjectTagLine || "",
    brief: subject?.SubjectBrief || "",
    description: subject?.SubjectDescription || "",
    category: subject?.SubjectCategoryId || "",
    featured: subject?.SubjectFeatured || false,
    status: subject?.SubjectStatus || false,
    thumbnail: subject?.SubjectThumbnail || "",
    owner: creatorName,
    ownerId: subject?.SubjectOwnerId || "",
    ownerEmail: creatorEmail,
  });

  const [showOwnerModal, setShowOwnerModal] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState(null);

  useEffect(() => {
    if (subject) {
      setFormData({
        title: subject.SubjectTitle,
        tagline: subject.SubjectTagLine,
        brief: subject.SubjectBriefInfo,
        description: subject.SubjectDescription,
        category: subject.SubjectCategoryId,
        featured: subject.SubjectFeatured,
        status: subject.SubjectStatus,
        thumbnail: subject.SubjectThumbnail,
        owner: creatorName,
        ownerId: subject.SubjectOwnerId,
        ownerEmail: creatorEmail,
      });
    }
  }, [subject, creatorName, creatorEmail]);

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

  const handleSave = () => {
    updateSubject({
      ...subject,
      SubjectTitle: formData.title,
      SubjectTagLine: formData.tagline,
      SubjectBriefInfo: formData.brief,
      SubjectDescription: formData.description,
      SubjectCategoryId: formData.category,
      SubjectFeatured: formData.featured,
      SubjectStatus: formData.status,
      SubjectThumbnail: formData.thumbnail,
      SubjectOwnerId: formData.ownerId,
    });
  };

  const handleReset = () => {
    setFormData({
      title: subject.SubjectTitle,
      tagline: subject.SubjectTagLine,
      brief: subject.SubjectBriefInfo,
      description: subject.SubjectDescription,
      category: subject.SubjectCategoryId,
      featured: subject.SubjectFeatured,
      status: subject.SubjectStatus,
      thumbnail: subject.SubjectThumbnail,
      owner: creatorName,
      ownerId: subject.SubjectOwnerId,
    });
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

  if (!subject) {
    return <div>Loading...</div>;
  }


  return (
    <div className="container">
      <h1>Subject Overview</h1>

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
                {categories.map((category) => (
                  <option
                    key={category.SubjectCategoryId}
                    value={category.SubjectCategoryId}
                  >
                    {category.SubjectCategoryName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group
                  style={{ paddingTop: "30px" }}
                  controlId="subjectFeatured"
                  className="mb-3"
                >
                  <Form.Check
                    type="checkbox"
                    label="Featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
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
                <i
                  className="bi bi-person-circle "
                  style={{ width: "30px", height: "70px" }}
                ></i>
                <div>
                  <p>{formData.owner}</p>
                  <p>{formData.ownerEmail}</p>
                  <Button
                    variant="primary"
                    onClick={() => setShowOwnerModal(true)}
                  >
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
                  src={
                    formData.thumbnail.startsWith("data:")
                      ? formData.thumbnail
                      : `/thumbnails/${formData.thumbnail}`
                  }
                  alt="Thumbnail"
                  className="mb-2"
                  style={{ width: "100%", height: "280px" }}
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

        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="secondary" className="ml-2" onClick={handleReset}>
          Reset
        </Button>
      </Form>

      <Modal show={showOwnerModal} onHide={() => setShowOwnerModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Owner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {users.map((user) => (
              <li key={user.UserId} onClick={() => handleSelectOwner(user)}>
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

export default AdminSubjectOverview;

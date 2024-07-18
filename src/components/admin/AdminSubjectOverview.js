import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { SubjectContext } from '../../context/SubjectContext';
import { Form, Button, Row, Col } from 'react-bootstrap';

const AdminSubjectOverview = () => {
    const { id } = useParams();
    const { subjects, updateSubject } = useContext(SubjectContext);
    const { users, user } = useContext(UserContext);
    
    const subject = subjects.find(subject => subject.SubjectId === parseInt(id));

    const creatorName = users.find(user => user.UserId === subject?.SubjectOwnerId)?.FullName || 'Unknown';


    const [formData, setFormData] = useState({
        title: subject?.SubjectTitle || '',
        tagline: subject?.SubjectTagLine || '',
        brief: subject?.SubjectBrief || '',
        description: subject?.SubjectDescription || '',
        category: subject?.SubjectCategoryId || '',
        featured: subject?.SubjectFeatured || false,
        status: subject?.SubjectStatus || false,
        thumbnail: subject?.SubjectThumbnail || '',
        owner: creatorName
    });

    useEffect(() => {
        if (subject) {
            setFormData({
                title: subject.SubjectTitle,
                tagline: subject.SubjectTagLine,
                brief: subject.SubjectBrief,
                description: subject.SubjectDescription,
                category: subject.SubjectCategoryId,
                featured: subject.SubjectFeatured,
                status: subject.SubjectStatus,
                thumbnail: subject.SubjectThumbnail,
                owner: creatorName
            });
        }
    }, [subject, creatorName]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        updateSubject({ 
            ...subject, 
            SubjectTitle: formData.title,
            SubjectTagLine: formData.tagline,
            SubjectBrief: formData.brief,
            SubjectDescription: formData.description,
            SubjectCategoryId: formData.category,
            SubjectFeatured: formData.featured,
            SubjectStatus: formData.status,
            SubjectThumbnail: formData.thumbnail,
            SubjectOwner: formData.owner
        });
    };

    if (!subject) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>Subject Overview</h1>
            <Form>
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
                        type="text" 
                        name="category" 
                        value={formData.category} 
                        onChange={handleChange} 
                    />
                </Form.Group>
                <Form.Group controlId="subjectFeatured" className="mb-3">
                    <Form.Check 
                        type="checkbox" 
                        label="Featured" 
                        name="featured" 
                        checked={formData.featured} 
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} 
                    />
                </Form.Group>
                <Form.Group controlId="subjectStatus">
                    <Form.Label>Status</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="status" 
                        value={formData.status} 
                        onChange={handleChange} 
                    />
                </Form.Group>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="subjectOwner">
                            <Form.Label>Owner</Form.Label>
                            <div className="d-flex align-items-center">
                                <i className="bi bi-person-circle " style={{ width: '30px', height: '70px' }}></i>
                                <div>
                                    <p>{formData.owner}</p>
                                    <Button variant="primary">Change owner</Button>
                                </div>
                            </div>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="subjectThumbnail">
                            <Form.Label>Thumbnail</Form.Label>
                            <div className="d-flex align-items-center">
                                <img src={`/thumbnails/${formData.thumbnail}`} alt="Thumbnail" className="mr-2" style={{ width: '250px', height: '200px' }} />
                                <Form.Control 
                                    id="thumbnailUpload" 
                                    label="Choose File" 
                                    type="file"
                                    onChange={handleChange}
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
                <Button variant="secondary" className="ml-2">
                    Reset
                </Button>
            </Form>
        </div>
    );
};

export default AdminSubjectOverview;
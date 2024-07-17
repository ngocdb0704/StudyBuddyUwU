import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Container, Card, CardBody, CardImg } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { SubjectContext } from '../context/SubjectContext';
const EditRegistForm = () => {
    let { id } = useParams();
    const { registrations, subjects, packages, editRegistration } = useContext(SubjectContext);
    const [val, setVal] = useState(registrations.filter(reg => reg.id === parseInt(id)).at(0));
    const [pac, setPac] = useState(packages.filter(pack => pack.PackageId === val.PackageId).at(0));
    const [sub, setSub] = useState(subjects.filter(sub => sub.SubjectId == pac.SubjectId).at(0));
    const handleChange = (input) => {
        setVal({ ...val, PackageId: Number(input) });
        setPac(packages.filter(pack => pack.PackageId === val.PackageId).at(0));
    };
    const handleSubmit = (e) => {
        editRegistration(val);
        alert('success');
        e.preventDefault();
    };

    return (
        <Container>
            <h1 className='text text-center'>Edit Registration</h1>
            <Link to={`/registration`}>
                My Registration
            </Link>
            <Card style={{ width: '30%', margin: 'auto' }}>
                <Card.Img variant="top" src={'/thumbnails/' + sub.SubjectThumbnail} style={{ height: '13rem' }} />
                <CardBody>
                    <p>
                        Subject's Title: {sub.SubjectTitle}
                        <br />
                        "{sub.SubjectTagLine}"
                    </p>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Packages</Form.Label>
                            <Form.Control
                                as="select"
                                name="PackageId"
                                onChange={e => handleChange(e.target.value)}
                            >
                                {packages.filter(atPack => {
                                    const packFilter = atPack.SubjectId == sub.SubjectId;
                                    return packFilter;
                                }).map((atPack) => {
                                    return (
                                        <option key={atPack.PackageId} value={atPack.PackageId}>{atPack.PackageName}</option>
                                    )
                                })}
                            </Form.Control>
                        </Form.Group>
                        <br/>
                        <p>
                            Duration: {pac.PackageDuration} months
                            <br />
                            Price: <strong>{pac.SalePrice * 1000}</strong> VND
                        </p>
                        <Form.Group>
                            <Button variant="primary" type="submit">Save Changes</Button>
                        </Form.Group>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    );
};

export default EditRegistForm;

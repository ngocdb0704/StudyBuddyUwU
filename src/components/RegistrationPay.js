import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Container, Card, CardBody, CardImg, Col, Row, Image, Alert } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { SubjectContext } from '../context/SubjectContext';
import { UserContext } from '../context/UserContext';
const PayRegistForm = () => {
    let { id } = useParams();
    const { registrations, subjects, packages, editRegistration } = useContext(SubjectContext);
    const { user } = useContext(UserContext);
    const [val, setVal] = useState(registrations.filter(reg => reg.id === parseInt(id)).at(0));
    const [pac, setPac] = useState(packages.filter(pack => pack.PackageId === val.PackageId).at(0));
    const [sub, setSub] = useState(subjects.filter(sub => sub.SubjectId == pac.SubjectId).at(0));



    const handleChange = (duration) => {
        var currentdate = new Date();
        var registTime = ""
            + currentdate.getFullYear() + "-"
            + (currentdate.getMonth() + 1) + "-"
            + currentdate.getDate();
        var epoch = Math.floor(new Date().getTime() / 1000.0); //in second
        var epochToDate = new Date((epoch + duration * 30 * 24 * 60 * 60) * 1000);
        var validEnd = ""
            + epochToDate.getFullYear() + "-"
            + (epochToDate.getMonth() + 1) + "-"
            + epochToDate.getDate();
        setVal({
            ...val,
            RegistrationTime: registTime,
            Status: true,
            ValidFrom: registTime,
            ValidTo: validEnd
        });
    };

    async function checkPaid(price, content, duration) {
        document.getElementById('alertAtHead').className = 'alert alert-warning';
        document.getElementById('alertAtHead').innerHTML = 'Checking transactions...';
        try {
            //this response always fetch the first 2 rows
            const response = await fetch(
                "https://script.google.com/macros/s/AKfycbza8YMZDLO6pST-pdbjKTaXr_-mbhoX6eLGXwRa4YLqORqBZqBHXzmvNz4KH7kloN059g/exec"
            );
            const sheet = await response.json();
            let isPaid = 0; //flag
            for (let payment of sheet.data) {
                //if price and content match, leave the loop
                if (payment["Giá trị"] === price && payment["Mô tả"].includes(content)) {
                    isPaid = 1;
                    break;
                }
            }
            //check flag
            if (isPaid === 1) {
                handleChange(duration);
                console.log(val.ValidTo);
                if (val.ValidTo) {
                    editRegistration(val);
                    document.getElementById('alertAtHead').className = 'alert alert-success';
                    document.getElementById('alertAtHead').innerHTML = 'Transaction success!';
                    document.getElementById('payButton').disabled = 'true';
                }
                else {
                    document.getElementById('alertAtHead').className = 'alert alert-danger';
                    document.getElementById('alertAtHead').innerHTML = 'Transaction not yet found! Please try again';
                }
            } else {
                console.log('not yet');
            }
        } catch {
            console.error("Error");
        }
    }
    return (
        <Container>
            <h1 className='text text-center'>Pay Registration</h1>
            <Link to={`/registration`}>
                My Registration
            </Link>
            <Alert id='alertAtHead' className='alert alert-primary'>Please Scan The QR Code Below</Alert>
            <Row>
                <Col>
                    <Image className='img-img-thumbnail' style={{ width: '60%', marginLeft: '20%' }}
                        src={'https://vietqr.co/api/generate/MB/0886799110/VIETQR.CO/' + Number(pac.SalePrice) * 1000 + '/USER' + user.UserId + 'COURSE' + pac.PackageId + '?style=1&logo=1&isMask=1&bg=22'}
                        alt="qrcode"
                    >
                    </Image>
                </Col>
                <Col>
                    <Card style={{ width: '60%' }}>
                        <Card.Img variant="top" src={'/thumbnails/' + sub.SubjectThumbnail} style={{ height: '13rem' }} />
                        <CardBody>
                            <p>
                                Subject's Title: {sub.SubjectTitle}
                                <br />
                                "{sub.SubjectTagLine}"
                                <br />
                                Pacakge: <strong>{pac.PackageName}</strong>
                                <br />
                                Duration: <strong>{pac.PackageDuration} months</strong>
                                <br />
                                Price: <strong>{pac.SalePrice * 1000}</strong> VND
                                <br />
                                <br />
                                <Button id='payButton' onClick={() => checkPaid(Number(pac.SalePrice) * 1000, 'USER' + user.UserId + 'COURSE' + pac.PackageId, pac.PackageDuration)} variant='primary'>
                                    Check Payment
                                </Button>
                            </p>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </Container>
    );
};

export default PayRegistForm;

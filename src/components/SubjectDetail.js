import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { SubjectContext } from '../context/SubjectContext';
import { UserContext } from '../context/UserContext';
import './css/SubjectDetails.css';

function parse(text) {
        if (text.trim().replace(/(\r\n|\n|\r)/gm, "").match(/^##Coursera style description.*##About.*##Outcome.*##Lessons.*##Duration.*##End$/gm))
            return courseraDesc(text);
	else return (<p>{text}</p>)
}

function courseraDesc(text) {
	let about = text.slice(text.indexOf("##About") + 7, text.indexOf("##Outcome"));
	let outcome = text.slice(text.indexOf("##Outcome") + 9, text.indexOf("##Lessons"));
	let lesson = text.slice(text.indexOf("##Lessons") + 9, text.indexOf("##Duration"));
	let duration = text.slice(text.indexOf("##Duration") + 10, text.indexOf("##End"));

	//console.log([about, outcome, lesson, duration]);
	return (
		<>
		<h1 id='about'>About:</h1><p>{about}</p>
		<h1 id='outcome'>Outcome:</h1><p>{outcome}</p>
		<h1 id='lessons'>Lessons:</h1><p>{lesson}</p>
		<h1 id='duration'>Duration:</h1><p>{duration}</p>;
		</>
	)
}

const SubjectDetail = () => {
  const { id } = useParams();
  const { subjects, categories } = useContext(SubjectContext);
  const { users, user } = useContext(UserContext);
  const subject = subjects.find(subject => subject.SubjectId === Number(id));

  if (!subject) {
    return <div>Loading...</div>;
  }
	

  const categoryName = categories.find(category => category.SubjectCategoryId === subject.SubjectCategoryId)?.title || 'Unknown';
  const creatorName = users.find(user => user.UserId === subject.SubjectOwnerId)?.FullName || 'Unknown';

	/*return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="8">
          <Link to={isAdmin?`/admin-subjectlist`:`/subjectsList`}>Return to subject list</Link>
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
	*/

	return (
        <main className="row mw-100 h-100">
            <Col lg={2} md={3} sm={12} className="mx-lg-3 mx-md-0 bg-light border rounded-3">
                <h4 className="pt-3">Search for subject:</h4>

                <form action="public/SubjectsList#searchKey" id="subject-search" className="input-group">
                    <input type="text" name="key" className="form-control"/>
                    <span className="input-group-text" onclick="document.getElementById('subject-search').submit();">
                        <i class="bi bi-search"></i>
                    </span>
                </form>

                <div className="card pt-3 mt-5 w-100">
                    <div className="card-header py-0 bg-white">
                        <h4 className="">Category</h4>
                    </div>
		{/*<ul id="subject-category" class="pt-1 pb-3 list-group list-group-flush">
                        <%int tier = 1;%>
                        <c:forEach var="category" items="${subjectDetailsCategoryLine}">
                            <ul>
                                <li><a href="./public/SubjectsList?idTier<%=tier++%>=${category.getCateId()}#searchKey">${category.getCateName()}</a></li>
                                </c:forEach>
                                <c:forEach var="category" items="${subjectDetailsCategoryLine}">
                            </ul>
                        </c:forEach>
                    </ul>*/}
                </div>

                <Card id="subject-tags" className="pt-3 mt-5 w-100">
                    <div className="card-header py-0 bg-white">
                        <h4 className="">Tags</h4>
                    </div>
                    <ul className="pt-1 pb-3 list-group list-group-flush">
		{/*<ul class="ps-2">
                            <c:if test="${SubjectTagNew}">
                                <span><a class="badge text-bg-success" href="./public/SubjectsList#carouselNewSubject">New</a></span>
                            </c:if>
                            <c:if test="${SubjectTagBigSale}">
                                <span><a class="badge text-bg-warning" href="./public/SubjectsList#carouselSaleSubject">Big Sale</a></span>
                            </c:if>
                            <c:if test="${SubjectTagFeatured}">
                                <span><a class="badge text-bg-primary" href="./public/SubjectsList#carouselFeaturedSubject">Featured</a></span>
                            </c:if>
                        </ul>  
                        <c:if test="${!SubjectTagNew && !SubjectTagFeatured && !SubjectTagBigSale}"><p class="ps-2">This subject has no tags</p></c:if>
			*/}
                        </ul>
                    </Card>

                    <h4 className="mt-5">Featured subjects</h4>
		{/*
                <c:forEach var="subject" items="${dataFeaturedSubject}" begin="0" end="5">
                    <a class="featured-subject" href="SubjectDetails?subjectId=${subject.getSubjectId()}">
                        <div class="my-2 ps-1 border border-1 rounded-1">
                            <p class="mb-1">${subject.getSubjectName()}</p>
                            <small>${subject.getTagLine()}</small>
                        </div>
                    </a>
                </c:forEach>
		*/}
                <a className="d-inline-block link-primary mt-5" href="ContactUs.jsp" target="_blank" rel="noopener noreferrer">Contact Us</a>

            </Col>

            <Col class="col py-3">
                <div id="subject-brief" class="container rounded-3 p-5">
                    <div style={{height: "250px"}}></div>

                    <img id='subject-thumbnail' src={'../thumbnails/' + subject.SubjectThumbnail} alt="alt"/>

                    <div id="info-div bg-white">
                        <h1>{subject.SubjectTitle}</h1>
                        <h3>{subject.SubjectTagLine}</h3>
                        <p>{subject.SubjectBriefInfo}</p>

                        <div className="container-fluid">
                                <button style={{cursor: "default"}} className="btn btn-secondary btn-disabled">Register 
                                    <div className="w3tooltip"><i className="bi bi-question-circle ms-1"></i>
                                        <span className="w3tooltiptext">This subject does not currently have any packages available, please come back later.</span>
                                    </div>
                                </button>
{/*                            <c:if test="${not empty lowestPackage}">
                                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target=".modalRegister">Register</button>
                                <c:if test="${lowestPackage.getListPrice() != lowestPackage.getSalePrice()}">
		<span class="price-tag ms-3"><del>${lowestPackage.getListPrice() * 1000} vnd</del></span>
                                </c:if>

                                <span class="price-tag ms-3">${lowestPackage.getSalePrice() * 1000} vnd</span>

                                <c:if test="${lowestPackage.getListPrice() > lowestPackage.getSalePrice()}">
                                    <span class="badge rounded-pill text-bg-danger">-<fmt:formatNumber value="${(1 - (lowestPackage.getSalePrice() / lowestPackage.getListPrice())) * 100 }" minFractionDigits="0" maxFractionDigits="0"/>%</span>
                                </c:if>
                            </c:if>
                            <c:if test="${empty lowestPackage}">
                                <button style="cursor: default" class="btn btn-secondary btn-disabled">Register 
                                    <div class="w3tooltip"><i class="bi bi-question-circle"></i>
                                        <span class="w3tooltiptext">This subject does not currently have any packages available, please come back later.</span>
                                    </div>
                                </button>
                            </c:if>*/}
                        </div>
                    </div>
                </div>

                <div id="subject-description" class="container mt-5">
                    {parse(subject.SubjectDescription)}
                </div>

            </Col>
        </main>
	)
};

export default SubjectDetail;

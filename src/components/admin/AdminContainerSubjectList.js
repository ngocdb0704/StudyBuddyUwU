// src/components/admin/AdminContainerSubjectsList.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CategoryList from "../CaregoryList"; 
import Search from "../Search"; 
import AdminSubjectList from "./AdminSubjectList";
import UserProvider from "../../context/UserContext"; 
import SubjectProvider from "../../context/SubjectContext"; 
import StatusFilter from "../SubjectLevelFilter"; 

const AdminContainerSubjectsList = () => (
    <UserProvider>
        <SubjectProvider>
            <Container>
                <Row>
                    <Col md={3}>
                        <h2>Categories</h2>
                        <CategoryList />
                        <br />
                        <h2>Levels</h2>
                        <StatusFilter />
                    </Col>
                    <Col md={9}>
                        <h2>Subjects</h2>
                        <Row>
                            <Col md={8}>
                                <Search />
                                <br />
                            </Col>
                        </Row>
                        <AdminSubjectList />
                    </Col>
                </Row>
            </Container>
        </SubjectProvider>
    </UserProvider>
);

export default AdminContainerSubjectsList;
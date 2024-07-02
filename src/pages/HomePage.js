import React from 'react'
import {Row, Col} from 'react-bootstrap'
import DepartmentList from '../components/DepartmentList'
import EmployeeList from '../components/EmployeeList'
import Search from '../components/Search'
function HomePage() {
    return (
        <Row>
            <Col md={4}>
                <h2>Departments</h2>
                <DepartmentList />
            </Col>
            <Col md={8}>
                <h2>Employees</h2>
                <Search />
                <EmployeeList />
            </Col>
        </Row>
    )
}

export default HomePage
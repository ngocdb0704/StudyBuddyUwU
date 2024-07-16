import React, { useContext, useEffect } from 'react';
import {Row, Col, Button} from 'react-bootstrap'
import DepartmentList from '../components/DepartmentList'
import EmployeeList from '../components/SubjectList'
import Search from '../components/Search'
import { UserProfileContext } from '../context/UserProfileContext';

function HomePage() {
	const { userProfile, setUserProfile } = useContext(UserProfileContext);

	function temp() {
		setUserProfile({
			"UserId": 0,
			"Email": "",
			"Password": "",
			"RoleId": 0,
			"FullName": "Guest",
			"GenderId": 1,
			"Mobile": "",
			"IsActive": false
		})
	}

    return (
		<>
			<Button onClick={temp}>Do the thing</Button>
		</>
    )
}

export default HomePage

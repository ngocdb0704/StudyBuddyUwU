import React, { useContext, useEffect } from 'react';
import { Form, Row, Col, Card, FormControl, FormGroup, InputGroup, Button, FormLabel } from 'react-bootstrap';
import { ProfilePictureContext } from '../context/ProfilePictureContext';
import { UserProfileContext } from '../context/UserProfileContext';
import './css/UserProfile.css'

let validateName, validateMobile, changeSaveButtonStatus, formReset;

const UserProfilePopup = () => {
	const { userProfile, setUserProfile } = useContext(UserProfileContext);
	const { displayedUserPic, setDisplayedUserPic, displayedUserId, setDisplayedUserId } = useContext(ProfilePictureContext);

	useEffect(() => {
		setDisplayedUserId(userProfile.UserId)
	}, [userProfile])

	return (
		<Card className="mb-3"> 
			<Row className="g-0 w-100 m-0">
				<Col lg={4} className="container">
					<div style={{position: "relative", width: "100%"}} className="w-100 border border-dark">
						<img id="img-display" style={{width: '100%', maxHeight: '300px', objectFit: 'cover'}} src={displayedUserPic} alt="Profile picture" />
						<FormLabel id="upload-label" htmlFor="upload">Select image</FormLabel>
					</div>
					<div id="upload-submission">
						<p id="upload-name">Selected file: none</p>
					</div>
				</Col>

				<Col lg={8} className="container-lg">
					<Form.Group className="mb-3"> 
						Email: <FormControl style={{backgroundColor: '#cecece', border: '1px solid black'}} type="text" name="email" value={userProfile.Email} readOnly/> 
					</Form.Group>
					<Form id="profileForm" action="UserProfile" method="POST" onReset={() => formReset} onKeyDown={(e) => {return e.target.key != 'Enter';}} encType="multipart/form-data">
						<input id="upload" type="file" name="upload"/>

						<Form.Group className="mb-3"> 
							<FormLabel htmlFor="fullNameInput">Full name:</FormLabel>
							<Form.Control id="fullNameInput" type="text" name="fullName" onInput={() => validateName(this.value)} value={userProfile.FullName} /> 
							<small id='fullNameWarning' style={{color: "red"}}></small>
						</Form.Group>

						<Form.Group className="mb-3"> 
							Gender: 
							<Form.Select ame="gender" onChange={() => changeSaveButtonStatus}>
						{/*<%= (genderMap.size() > 0)? genderMap.reduce(0, (key, val) -> "<option value=\"" + key + "\" "
								+ (((int)key == genderId)? "selected": "")
								+ "  >" + val + "</option>"
								, (option, option1) -> option + "\n" + option1).toString() : ""%>*/}
							</Form.Select>
						</Form.Group>

						<Form.Group className="mb-3"> 
							<FormLabel htmlFor="mobileInput">Mobile:</FormLabel>
							<Form.Control id="mobileInput" type="text" name="mobile" onInput={() => validateMobile(this.value)} value={userProfile.Mobile} />
							<small id='mobileWarning' style={{color: "red"}}></small>
						</Form.Group>

						<br/>

						<InputGroup className="mb-3">
							<Button id="saveButton" variant="btn btn-outline-secondary" className="disabled container form-control" type="submit">Save</Button>
							<Button variant="btn btn-danger" className='form-control' type="reset">Reset</Button>
						</InputGroup>

						<input type="hidden" name="service" value="update"/>
						<input type="hidden" name="redirect" value="<%=currentPage%>"/>
					</Form>
				</Col>
			</Row>

		{/*<%if (role.equals("Admin")) {%>
                <p style="position: absolute; top: -55px; color: red">Admin</p>
                <%}%>*/}
		</Card>

	);
};

export default UserProfilePopup;

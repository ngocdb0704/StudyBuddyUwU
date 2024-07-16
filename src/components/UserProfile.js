import React, { useContext, useEffect, useState } from 'react';
import { Form, Row, Col, Card, FormControl, FormGroup, InputGroup, Button, FormLabel } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
//import { ProfilePictureContext } from '../context/ProfilePictureContext';
//import { UserProfileContext } from '../context/UserProfileContext';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import './css/UserProfile.css'

let validateName, validateMobile, changeSaveButtonStatus, formReset;


const UserProfilePopup = ({text}) => {
	let [uploadFile, setUpload] = useState({
		file: null,
		base64URL: ""
	});

	let getBase64 = file => {
		return new Promise(resolve => {
			let fileInfo;
			let baseURL = "";
			// Make new FileReader
			let reader = new FileReader();

			// Convert the file to base64 text
			reader.readAsDataURL(file);

			// on reader load somthing...
				reader.onload = () => {
					// Make a fileInfo Object
					console.log("Called", reader);
					baseURL = reader.result;
					//console.log(baseURL);
					document.getElementById("img-display").setAttribute("src", baseURL);
					resolve(baseURL);
				};
			console.log(fileInfo);
		});
	};

	let handleFileInputChange = e => {
		console.log(e.target.files[0]);
		let { file } = uploadFile;

		file = e.target.files[0];

		getBase64(file)
			.then(result => {
				file["base64"] = result;
				console.log("File Is", file);
				setUpload({
					base64URL: result,
					file
				});
			})
			.catch(err => {
				console.log(err);
			});

		setUpload({
			file: e.target.files[0]
		});
	};

	function handleImgError() {
		console.log("Ya")
	}

	const { user} = useContext(UserContext);
	//getProfilePic(user.UserId)
	//const { profilePicList, setProfilePicList } = useContext(UserProfileContext);
	//const { displayedUserPic, setDisplayedUserPic, displayedUserId, setDisplayedUserId } = useContext(ProfilePictureContext);
	
	const [ profilePicMap, setProfilePicMap ] = useState([]);

  const [displayProfile, setDisplayProfile] = useState({
      "UserId": 0,
      "Email": "",
      "Password": "",
      "RoleId": 0,
      "FullName": "Guest",
      "GenderId": 0,
      "Mobile": "",
      "IsActive": false
  });

	async function fetProfilePic(id) {
	  let Out = null;
      await axios.get('http://localhost:9999/ProfilePicture/' + id)
		.then((res) => {
			Out = res.data;
			console.log("success");
		})
		.catch((err) => {
			console.log("failed");
		});
		console.log("returning " + Out)
		if (Out) return Out;
		else throw new Error("Profile Picture not found");
	}

	function getProfilePic(id) {
		let found = profilePicMap.find((pic,) => pic.id == id);
		if (found) return found;
		else { 
			fetProfilePic(id)
				.then(function(value) {console.log("setting " + value.data); setProfilePicMap([...profilePicMap, value])}
			).catch(() => {setProfilePicMap([...profilePicMap, {id: id, data: "./images/anonymous-user.webp"}])})
			return {data: ""}
		}
	}

	console.log(getProfilePic(1));


	useEffect(() => {
		if (user) {
			setDisplayProfile({
				"UserId": user.UserId, 
				"Email": user.Email, 
				"Password": user.Password, 
				"RoleId": user.RoleId, 
				"FullName": user.FullName, 
				"GenderId": user.GenderId, 
				"Mobile": user.Mobile, 
				"IsActive": user.IsActive
			});
		}
	}
	, [user]);

	const [lgShow, setLgShow] = useState(false);
	return (
		<>
		<Button onClick={() => setLgShow(true)}>{text}</Button>
		<Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
			User profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
		<Card className="mb-3"> 
		<Row className="g-0 w-100 m-0">
		<Col lg={4} className="container">
		<div style={{position: "relative", width: "100%"}} className="w-100 border border-dark">
		<img id="img-display" style={{width: '100%', maxHeight: '300px', objectFit: 'cover'}} src={getProfilePic(displayProfile.UserId).data} alt="Profile picture" onError={handleImgError}/>
		<FormLabel id="upload-label" htmlFor="upload" className='m-0'>Select image</FormLabel>
		</div>
		<div id="upload-submission">
		<p id="upload-name">Selected file: none</p>
		</div>
		</Col>

		<Col lg={8} className="container-lg">
		<Form.Group className="mb-3"> 
		Email: <FormControl style={{backgroundColor: '#cecece', border: '1px solid black'}} type="text" name="email" value={displayProfile.Email} readOnly/> 
		</Form.Group>
		<Form id="profileForm" action="UserProfile" method="POST" onReset={() => formReset} onKeyDown={(e) => {return e.target.key != 'Enter';}} encType="multipart/form-data">
		<input id="upload" type="file" name="upload" onInput={handleFileInputChange}/>

		<Form.Group className="mb-3"> 
		<FormLabel htmlFor="fullNameInput">Full name:</FormLabel>
		<Form.Control id="fullNameInput" type="text" name="fullName" onInput={() => validateName(this.value)} value={displayProfile.FullName} /> 
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
		<Form.Control id="mobileInput" type="text" name="mobile" onInput={() => validateMobile(this.value)} value={displayProfile.Mobile} />
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
		</Modal.Body>
      </Modal>
	</>
	);
};

export default UserProfilePopup;

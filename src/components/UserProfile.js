import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Form,
  Row,
  Col,
  Card,
  FormControl,
  FormGroup,
  InputGroup,
  Button,
  FormLabel,
} from "react-bootstrap";
import { Modal } from "react-bootstrap";
//import { ProfilePictureContext } from '../context/ProfilePictureContext';
//import { UserProfileContext } from '../context/UserProfileContext';
import { UserContext } from "../context/UserContext";
import axios from "axios";
import "./css/UserProfile.css";

let checkName = /^.*[^a-z].*$|^$/i;
function validateName(val) {
  let blocked = false;
  val.split(" ").forEach((it) => {
    if (it.match(checkName)) {
      blocked = true;
    }
  });
  return !blocked;
}

function nameWarning(check, txtltng) {
  if (check) return "";
  else if (txtltng < 1) return "Please enter your full name";
  return "Please don't put numbers and special characters in, and make sure to separate each word with a white space character";
}

let checkMobile = /^0[9,8][0-9]{8,9}$/i;
function validateMobile(val) {
  if (val.match(checkMobile)) {
    return true;
  } else {
    return false;
  }
}

function mobileWarning(check, txtltng) {
  if (check) return "";
  else if (txtltng < 1) return "Please enter your mobile number'";
  return "Please input 9 to 10 numbers as your mobile number";
}

function formReset() {}

function changeSaveButtonStatus() {}

const UserProfilePopup = ({ text }) => {
  const [displayProfile, setDisplayProfile] = useState({
    UserId: 0,
    Email: "",
    Password: "",
    RoleId: 0,
    FullName: "Guest",
    GenderId: 0,
    Mobile: "",
    IsActive: false,
    id: 0,
  });

  const { user } = useContext(UserContext);
  const [refetchFlag, setRefetchFlag] = useState(0);
  useEffect(() => {
    if (user) {
      setDisplayProfile({
        UserId: user.UserId,
        Email: user.Email,
        Password: user.Password,
        RoleId: user.RoleId,
        FullName: user.FullName,
        GenderId: user.GenderId,
        Mobile: user.Mobile,
        IsActive: user.IsActive,
        id: user.id,
      });
    }
  }, [user, refetchFlag]);

  const [genderMap, setGenderMap] = useState([]);
  const [displayPic, setDisplayPic] = useState({
    imgId: 0,
    data: "./images/anonymous-user.webp",
  });
  const [hasProfilePic, setPostFlag] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:9999/Gender")
      .then((res) => {
        setGenderMap(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:9999/ProfilePicture?UserId=" + user.UserId)
      .then((res) => {
        if (res.data.length > 0) {
          setDisplayPic({ imgId: res.data[0].id, data: res.data[0].data });
        } else {
          console.log("User does not have a profile pic");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [displayProfile]);

  let [uploadFile, setUpload] = useState({
    file: null,
    base64URL: "",
  });

  let getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        //console.log(baseURL);
        setDisplayPic({ ...displayPic, data: baseURL });
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };

  const hasChangedPic = useRef(false);
  let handleFileInputChange = (e) => {
    hasChangedPic.current = true;
    let { file } = uploadFile;

    file = e.target.files[0];

    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        setUpload({
          base64URL: result,
          file,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    setUpload({
      file: e.target.files[0],
    });
  };

  function handleImgError() {
    console.log("Ya");
  }

  function handleNameChange(val) {
    setDisplayProfile({ ...displayProfile, FullName: val });
  }

  function handleMobileChange(val) {
    setDisplayProfile({ ...displayProfile, Mobile: val });
  }

  function handleGenderChange(val) {
    setDisplayProfile({ ...displayProfile, GenderId: val });
  }

  function saveUser() {
    axios
      .put("http://localhost:9999/User/" + displayProfile.id, {
        ...displayProfile,
      })
      .then((res) => {
        alert("Profile saved");
        //setRefetchFlag(refetchFlag + 1);
      })
      .catch((error) => {
        console.log(error);
      });

	  alert(hasChangedPic.current)
    if (hasChangedPic.current) {
      if (displayPic.imgId < 1) {
        axios
          .post("http://localhost:9999/ProfilePicture/", {
            UserId: displayProfile.UserId,
            data: uploadFile.base64URL,
          })
          .then((res) => {
            //setRefetchFlag(refetchFlag + 1);
          })
          .catch((error) => {
            alert(error);
          });
      } else {
        axios
          .put("http://localhost:9999/ProfilePicture/" + displayPic.imgId, {
            UserId: user.UserId,
            data: uploadFile.base64URL,
          })
          .then((res) => {
            //setRefetchFlag(refetchFlag + 1);
          })
          .catch((error) => {
            alert(error);
          });
      }
    }
  }

  const [lgShow, setLgShow] = useState(false);
  let validName = validateName(displayProfile.FullName),
    validMobile = validateMobile(displayProfile.Mobile);
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
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    overflow: "hidden",
                  }}
                  className="w-100 border border-dark"
                >
                  <img
                    id="img-display"
                    style={{
                      height: "100%",
                      position: "absolute",
                      maxHeight: "300px",
                      left: "50%",
                      transform: "translate(-50%, 0)",
                    }}
                    src={displayPic.data}
                    alt="Profile picture"
                    onError={handleImgError}
                  />
                  <FormLabel id="upload-label" htmlFor="upload" className="m-0">
                    Select image
                  </FormLabel>
                </div>
                <div id="upload-submission">
                  <p id="upload-name">Selected file: none</p>
                </div>
              </Col>

              <Col lg={8} className="container-lg">
                <Form.Group className="mb-3">
                  Email:{" "}
                  <FormControl
                    style={{
                      backgroundColor: "#cecece",
                      border: "1px solid black",
                    }}
                    type="text"
                    name="email"
                    value={displayProfile.Email}
                    readOnly
                  />
                </Form.Group>
                <Form
                  id="profileForm"
                  action="UserProfile"
                  method="POST"
                  onReset={() => formReset}
                  onKeyDown={(e) => {
                    return e.target.key != "Enter";
                  }}
                  encType="multipart/form-data"
                >
                  <input
                    id="upload"
                    type="file"
                    name="upload"
                    onInput={handleFileInputChange}
                  />

                  <Form.Group className="mb-3">
                    <FormLabel htmlFor="fullNameInput">Full name:</FormLabel>
                    <Form.Control
                      id="fullNameInput"
                      type="text"
                      name="fullName"
                      className={validName ? "" : "is-invalid"}
                      onInput={(e) => handleNameChange(e.target.value)}
                      value={displayProfile.FullName}
                    />
                    <small id="fullNameWarning" style={{ color: "red" }}>
                      {nameWarning(validName, displayProfile.FullName.length)}
                    </small>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    Gender:
                    <Form.Select
                      name="gender"
                      onChange={(e) => handleGenderChange(e.target.value)}
                      defaultValue={displayProfile.GenderId}
                    >
                      {genderMap.map((val) => (
                        <option key={val.GenderId} value={val.GenderId}>
                          {val.GenderName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <FormLabel htmlFor="mobileInput">Mobile:</FormLabel>
                    <Form.Control
                      id="mobileInput"
                      type="text"
                      name="mobile"
                      className={validMobile ? "" : "is-invalid"}
                      onInput={(e) => handleMobileChange(e.target.value)}
                      value={displayProfile.Mobile}
                    />
                    <small id="mobileWarning" style={{ color: "red" }}>
                      {mobileWarning(validMobile, displayProfile.Mobile.length)}
                    </small>
                  </Form.Group>

                  <br />

                  <InputGroup className="mb-3">
                    <Button
                      id="saveButton"
                      variant="btn btn-primary"
                      className="container form-control"
                      type="button"
                      onClick={() => saveUser()}
                    >
                      Save
                    </Button>
                    <Button
                      variant="btn btn-danger"
                      className="form-control"
                      type="button"
                      onClick={() => setRefetchFlag(refetchFlag + 1)}
                    >
                      Reset
                    </Button>
                  </InputGroup>

                  <input type="hidden" name="service" value="update" />
                  <input
                    type="hidden"
                    name="redirect"
                    value="<%=currentPage%>"
                  />
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

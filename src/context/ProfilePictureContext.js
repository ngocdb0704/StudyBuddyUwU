// src/context/UserProfileContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProfilePictureContext = createContext();

const ProfilePictureProvider = ({ children }) => {
	const [displayedUserPic, setDisplayedUserPic] = useState('');
	const [displayedUserId, setDisplayedUserId] = useState(0);

	useEffect(() => {
      axios.get('http://localhost:9999/ProfilePicture')
		.then((res) => {
			setDisplayedUserPic(res.data.id)
		})
		.catch((err) => {
			setDisplayedUserPic('./public/images/A.png');
			console.log(displayedUserPic);
		});
	}, [displayedUserId])

  return (
    <ProfilePictureContext.Provider value={{ displayedUserPic, setDisplayedUserPic, displayedUserId, setDisplayedUserId }}>
      {children}
    </ProfilePictureContext.Provider>
  );
};

export default ProfilePictureProvider;

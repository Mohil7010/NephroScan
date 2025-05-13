import React, { useEffect, useState } from 'react';
import './App.css'; // Make sure this path matches where your CSS is saved
import { useNavigate, useLocation } from "react-router-dom";

const ProfilePage = () => {
  const [userData, setUserData] = useState({ username: '', email: '' });
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData) {
      setUserData({
        username: storedData.username || '',
        email: storedData.email || ''
      });
    }
  }, []);

  return (
    <div className="profile-body">
      <div className="profile-page">
        <h1>Profile</h1>
        <div className="profile-details">
          <p><strong>Username : </strong> {userData.username}</p>
          <p><strong>Email : </strong> {userData.email}</p>
        </div>
        <div className="button-container">
          <button 
            onClick={() => navigate("/")} 
            className="back-button-1"
          >
            Back to Home
          </button>
          <button 
            onClick={() => navigate("/edit-profile")} 
            className="back-button-2"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

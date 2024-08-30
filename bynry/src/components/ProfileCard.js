import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({ profile, onShowMap }) => {
  return (
    <div className="profile-card">
      <img src={profile.photo} alt={profile.name} />
      <div>
        <h2>{profile.name}</h2>
        <p>{profile.description}</p>
        <button onClick={onShowMap}>Show on Map</button>
      </div>
    </div>
  );
};

export default ProfileCard;

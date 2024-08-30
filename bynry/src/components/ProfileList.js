import React from 'react';
import ProfileCard from './ProfileCard';
import './ProfileList.css';

const ProfileList = ({ profiles, onShowMap }) => {
  return (
    <div className="profile-list">
      {profiles.map(profile => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          onShowMap={() => onShowMap(profile.latitude, profile.longitude)}
        />
      ))}
    </div>
  );
};

export default ProfileList;

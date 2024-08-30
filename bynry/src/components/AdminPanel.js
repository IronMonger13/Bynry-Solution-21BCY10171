import React, { useState, useRef } from 'react';
import './AdminPanel.css';

const AdminPanel = ({ profiles, setProfiles }) => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type.split('/')[1];
      const fileSize = file.size / 1024 / 1024; // Size in MB

      if (!['jpeg', 'png', 'jpg'].includes(fileType)) {
        setError('Invalid file type. Only JPG, JPEG, and PNG files are allowed.');
        return;
      }

      if (fileSize > 5) {
        setError('File size exceeds 5MB.');
        return;
      }

      setError('');
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    setPhotoPreview('');
    setError('');
    // Reset file input value to allow re-upload
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddProfile = () => {
    if (!name || !photo || !description || !latitude || !longitude) {
      alert('Please fill out all fields and upload an image.');
      return;
    }

    const newProfile = {
      id: profiles.length + 1,
      name,
      photo: photoPreview,
      description,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };

    setProfiles([...profiles, newProfile]);
    setName('');
    setPhoto(null);
    setDescription('');
    setLatitude('');
    setLongitude('');
    setPhotoPreview('');
    // Reset file input value to allow new uploads if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="admin-panel-container">
      <div className="admin-panel">
        <h2>Admin Panel</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: photoPreview ? 'none' : 'block' }}
        />
        {photoPreview && (
          <>
            <img src={photoPreview} alt="Preview" className="photo-preview" />
            <button onClick={() => fileInputRef.current.click()}>
              Change Photo
            </button>
            <button onClick={handleRemovePhoto}>Remove Photo</button>
          </>
        )}
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <input
          type="text"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <button onClick={handleAddProfile}>Add Profile</button>
      </div>
    </div>
  );
};

export default AdminPanel;

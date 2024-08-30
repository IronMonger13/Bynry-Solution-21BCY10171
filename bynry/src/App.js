import React, { useState } from 'react';
import ProfileList from './components/ProfileList';
import LeafletMapView from './components/LeafletMapView';
import AdminPanel from './components/AdminPanel';
import FilterModal from './components/FilterModal';
import './App.css';

const App = () => {
  const [profiles, setProfiles] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [filters, setFilters] = useState({});
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleShowMap = (lat, lon) => {
    setLatitude(lat);
    setLongitude(lon);
  };

  const handleFilterButtonClick = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredProfiles = profiles.filter((profile) => {
    const matchesName = !filters.name || profile.name.toLowerCase().includes(filters.name.toLowerCase());
    const matchesLatitude = !filters.latitude || profile.latitude === parseFloat(filters.latitude);
    const matchesLongitude = !filters.longitude || profile.longitude === parseFloat(filters.longitude);
    return matchesName && matchesLatitude && matchesLongitude;
  });

  return (
    <div className="App">
      <h1>Profile Explorer</h1>

      <AdminPanel profiles={profiles} setProfiles={setProfiles} />

      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search profiles by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={handleFilterButtonClick} className="filter-button">Filter</button>
      </div>

      <FilterModal 
        isOpen={isFilterModalOpen} 
        onClose={handleCloseFilterModal} 
        onApplyFilters={handleApplyFilters} 
      />

      <ProfileList profiles={filteredProfiles} onShowMap={handleShowMap} />
      {/* {latitude && longitude && <LeafletMapView latitude={latitude} longitude={longitude} />} */}
    </div>
  );
};

export default App;

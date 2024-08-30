import React, { useState } from 'react';
import './FilterModal.css';

const FilterModal = ({ isOpen, onClose, onApplyFilters }) => {
    const [name, setName] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const handleApplyFilters = () => {
        onApplyFilters({ name, latitude, longitude });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="filter-modal">
            <div className="filter-content">
                <h2>Filter Options</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="filter-input"
                />
                <input
                    type="text"
                    placeholder="Latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    className="filter-input"
                />
                <input
                    type="text"
                    placeholder="Longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    className="filter-input"
                />
                <div>
                    <button onClick={handleApplyFilters} className="filter-button">Apply Filters</button>
                    <button onClick={onClose} className="filter-button">Close</button>
                </div>

            </div>
        </div>
    );
};

export default FilterModal;

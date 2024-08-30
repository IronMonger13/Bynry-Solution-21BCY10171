import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Default coordinates (center of the world or a specific location)
const defaultLatLng = [51.505, -0.09]; // Default to London

const MapView = ({ address }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // Initialize map
    if (mapRef.current) {
      mapRef.current = L.map('map').setView(defaultLatLng, 13); // Default zoom level
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
    }
  }, []);

  useEffect(() => {
    if (mapRef.current && address) {
      // Geocode address to latLng (you need a geocoding service here)
      // For demo purposes, we'll assume `address` is already latLng
      const latLng = address; // Replace with actual geocoding if needed

      if (markerRef.current) {
        mapRef.current.removeLayer(markerRef.current);
      }

      markerRef.current = L.marker(latLng).addTo(mapRef.current);
      mapRef.current.setView(latLng, 13); // Adjust zoom level if needed
    }
  }, [address]);

  return <div id="map" style={{ height: '500px', width: '100%' }} />;
};

export default MapView;

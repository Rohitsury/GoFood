import React, { useEffect } from 'react';

const GoogleMap = () => {
  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
      script.async = true;
      document.body.appendChild(script);
    };

    // Check if Google Maps API is already loaded
    if (!window.google || !window.google.maps) {
      // If not loaded, load the script
      loadScript();
    } else {
      // If already loaded, initialize the map directly
      initMap();
    }
  }, []);

  const initMap = () => {
    // Create a new map instance centered at your desired location
    const map = new window.google.maps.Map(document.getElementById('google-map'), {
      center: { lat: 15.83414, lng: 74.51003 }, // Replace with your desired coordinates
      zoom: 14, // Adjust the zoom level as needed
    });

    // Create a marker at the specified location
    const marker = new window.google.maps.Marker({
      position: { lat: 15.83414, lng:  74.51003 }, // Replace with your desired coordinates
      map: map,
      title: 'Belgaum, India', // Replace with your desired marker title
    });
  };

  return <div style={{ height: '100%', width: '100%' }}></div>;
};

export default GoogleMap;

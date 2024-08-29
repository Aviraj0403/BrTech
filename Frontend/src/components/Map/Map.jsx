import React, { useState, useEffect, useCallback } from 'react';
import classes from './map.module.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { toast } from 'react-toastify';
import * as L from 'leaflet';
import getDistance from 'geolib/es/getDistance';

// Ensure marker icon is resolved correctly with Vite
const markerIcon = new L.Icon({
  iconUrl: new URL('/marker-icon-2x.png', import.meta.url).href,
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
});

// Example restaurant location
const restaurantLocation = { lat: 25.609, lng: 85.1343 };

export default function Map({ readonly, location, onChange }) {
  const [position, setPosition] = useState(location || restaurantLocation);
  const [showFindButton, setShowFindButton] = useState(true);

  useEffect(() => {
    if (location) {
      setPosition(location);
    }
  }, [location]);

  useEffect(() => {
    if (position) {
      const distance = getDistance(
        { latitude: restaurantLocation.lat, longitude: restaurantLocation.lng },
        { latitude: position.lat, longitude: position.lng }
      );
      setShowFindButton(distance > 100); // Show button if more than 100 meters away
    }
  }, [position]);

  return (
    <div className={classes.container}>
      <MapContainer
        className={classes.map}
        center={restaurantLocation} // Default center on restaurant location
        zoom={13}
        dragging={!readonly}
        touchZoom={!readonly}
        doubleClickZoom={!readonly}
        scrollWheelZoom={!readonly}
        boxZoom={!readonly}
        keyboard={!readonly}
        attributionControl={false}
      >
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
        <MapEventsHandler
          readonly={readonly}
          location={position}
          onChange={onChange}
          setPosition={setPosition}
        />
      </MapContainer>
      {showFindButton && !readonly && (
        <button
          type="button"
          className={classes.find_location}
          onClick={() => {
            if (map) {
              map.locate({ setView: true, maxZoom: 16 });
            }
          }}
        >
          Find My Location
        </button>
      )}
    </div>
  );
}

function MapEventsHandler({ readonly, location, onChange, setPosition }) {
  const map = useMapEvents({
    click(e) {
      if (!readonly) {
        setPosition(e.latlng);
        if (onChange) {
          onChange(e.latlng);
        }
      }
    },
    locationfound(e) {
      setPosition(e.latlng);
      if (onChange) {
        onChange(e.latlng);
      }
      map.flyTo(e.latlng, map.getZoom());
    },
    locationerror() {
      toast.error("Unable to retrieve your location. Please check your location settings.");
    },
  });

  const handleFindLocation = useCallback(() => {
    if (!readonly) {
      map.locate({ setView: true, maxZoom: 16 });
    }
  }, [map, readonly]);

  return (
    <>
      {!readonly && (
        <button
          type="button"
          className={classes.find_location}
          onClick={handleFindLocation}
        >
          Find My Location
        </button>
      )}

      {location && (
        <Marker
          eventHandlers={{
            dragend: (e) => {
              setPosition(e.target.getLatLng());
              if (onChange) {
                onChange(e.target.getLatLng());
              }
            },
          }}
          position={location}
          draggable={!readonly}
          icon={markerIcon}
        >
          <Popup>Shipping Location</Popup>
        </Marker>
      )}

      {/* Marker for Restaurant Location */}
      <Marker
        position={restaurantLocation}
        icon={markerIcon}
      >
        <Popup>Restaurant Location</Popup>
      </Marker>
    </>
  );
}

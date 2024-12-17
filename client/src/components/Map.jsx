import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { useCities } from "../hooks/useCities";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
import styles from "./Map.module.css";

import { reverseGeocode } from "../services/apiCities";
import Button from "./Button";

function Map() {
  const navigate = useNavigate();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [myCurrentPosition, setMyCurrentPosition] = useState({});
  const { data } = useCities();
  const { cities } = data;
  const location = useLocation();

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    const isPositionExist = async () => {
      if (geolocationPosition) {
        const { address } = await reverseGeocode(geolocationPosition);
        setMyCurrentPosition(address);
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);

        return address;
      }
    };
    isPositionExist();
  }, [geolocationPosition, setMyCurrentPosition, navigate]);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use Your Position"}
        </Button>
      )}
      {location.pathname === "/app/form" && <Outlet />}
      <MapContainer
        center={mapPosition}
        zoom={8}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities?.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={`${city.position.lat}+${city.position.lng}`}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        {geolocationPosition && (
          <Marker position={geolocationPosition}>
            <Popup>
              <span>{myCurrentPosition?.country_code?.toUpperCase()}</span>
              <span>{myCurrentPosition?.city}</span>
            </Popup>
          </Marker>
        )}
        <ChangeCenter position={mapPosition}></ChangeCenter>
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`), //?lat=${e.latlng.lat}&lng=${e.latlng.lng}
  });
}

export default Map;

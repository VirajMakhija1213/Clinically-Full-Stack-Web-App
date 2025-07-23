import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix icon loading issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function ClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onMapClick({ lat, lng });
    },
  });
  return null;
}

export default function MapComponent({ markers, onMapClick }) {
  return (
    <MapContainer
      center={[22.7196, 75.8577]} // Indore
      zoom={12}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {onMapClick && <ClickHandler onMapClick={onMapClick} />}

      {markers.map((marker, idx) => (
        <Marker key={idx} position={[marker.lat, marker.lng]}>
          <Popup>{marker.label || `Marker ${idx + 1}`}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

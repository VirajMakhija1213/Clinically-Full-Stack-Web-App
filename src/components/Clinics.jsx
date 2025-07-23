import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'; // Import useMap
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaMapMarkerAlt, FaUserMd } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { getAllClinics } from '../../services/operations/getAllClinic';

// Helper component to programmatically update the map's view
function MapUpdater({ center, zoom }) {
  const map = useMap(); // Get the map instance from the parent MapContainer
  useEffect(() => {
    // When center or zoom props change, fly to the new location
    map.flyTo(center, zoom);
  }, [center, zoom, map]); // Dependency array ensures this runs when props change
  return null; // This component does not render anything itself
}

export default function Clinics() {
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [title, setTitle] = useState("All Clinics");
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // Default to India
  const [mapZoom, setMapZoom] = useState(5);

  const dispatch = useDispatch();
  const location = useLocation();

  // Fix default marker icon
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });

  useEffect(() => {
    if (location.state?.searchResults) {
      const { searchResults, searchQuery, searchCenter } = location.state;
      setClinics(searchResults);
      setTitle(searchResults.length > 0 ? `Clinics near "${searchQuery}"` : `No clinics found near "${searchQuery}"`);
      if (searchCenter) {
        setMapCenter([searchCenter.latitude, searchCenter.longitude]);
        setMapZoom(13);
      }
      if (searchResults.length > 0) {
        setSelectedClinic(searchResults[0]);
      }
    } else {
      dispatch(getAllClinics({ setClinics }));
    }
  }, [dispatch, location.state]);

  // When a clinic is selected from the list, update the map's center and zoom level
  useEffect(() => {
    if (selectedClinic) {
      setMapCenter([
        selectedClinic.location.coordinates[1], // Latitude
        selectedClinic.location.coordinates[0], // Longitude
      ]);
      setMapZoom(16); // Zoom in close to the selected clinic
    }
  }, [selectedClinic]);


  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        {title}
      </h1>

      {clinics.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Clinics List */}
          <div className="flex flex-col gap-4 max-h-[80vh] overflow-y-auto pr-2">
            {clinics.map((clinic) => (
              <div
                key={clinic._id} // Use a stable key like the clinic's ID
                className={`bg-white shadow-lg rounded-2xl p-4 cursor-pointer hover:shadow-2xl transition border-2 ${selectedClinic?._id === clinic._id ? 'border-blue-500 shadow-xl' : 'border-transparent'}`}
                onClick={() => setSelectedClinic(clinic)}
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {clinic.clinicName}
                </h2>
                <p className="text-gray-600 mb-1">
                  <FaMapMarkerAlt className="inline mr-2 text-red-500" />
                  {clinic.colony}, {clinic.city}
                </p>
                <p className="text-gray-600">
                  <FaUserMd className="inline mr-2 text-blue-500" />
                  Dr. {clinic.doctorId?.firstName} {clinic.doctorId?.lastName}
                </p>
              </div>
            ))}
          </div>

          {/* Map and Details View */}
          <div className="sticky top-24">
            {selectedClinic ? (
              <div className="bg-white shadow-xl rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-4 text-blue-700">
                  Clinic Details
                </h2>
                <p className="text-gray-700 mb-2">
                  <strong>Clinic Name:</strong> {selectedClinic.clinicName}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Location:</strong> {selectedClinic.colony}, {selectedClinic.city}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Doctor:</strong> Dr. {selectedClinic.doctorId?.firstName} {selectedClinic.doctorId?.lastName}
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Email:</strong> {selectedClinic.doctorId?.email}
                </p>

                <div className="w-full h-[400px] rounded-xl overflow-hidden mt-4">
                  <MapContainer
                    center={mapCenter}
                    zoom={mapZoom}
                    scrollWheelZoom={false}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {/* This component will handle map view updates */}
                    <MapUpdater center={mapCenter} zoom={mapZoom} />
                    
                    {/* Marker for the selected clinic */}
                    <Marker
                      position={[
                        selectedClinic.location.coordinates[1],
                        selectedClinic.location.coordinates[0],
                      ]}
                    >
                      <Popup>
                        {selectedClinic.clinicName} <br />
                        Dr. {selectedClinic.doctorId?.firstName} {selectedClinic.doctorId?.lastName}
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-200 rounded-2xl">
                <p className="text-gray-500 text-lg">Select a clinic to view its details and location.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">No clinics to display. Try a different search or check back later.</p>
        </div>
      )}
    </div>
  );
}
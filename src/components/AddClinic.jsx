import React, { useState } from "react";
import MapComponent from "./MapComponent";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addClinic } from "../../services/operations/addClinic";

export default function AddClinic() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    clinicName: "",
    colony: "",
    city: "",
    coordinates: { lat: "", lng: "" },
  });

  const [marker, setMarker] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "lat" || name === "lng") {
      setFormData((prev) => ({
        ...prev,
        coordinates: {
          ...prev.coordinates,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUseCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prev) => ({
          ...prev,
          coordinates: { lat: latitude, lng: longitude },
        }));
        setMarker([
          { lat: latitude, lng: longitude, label: "Clinic Location" },
        ]);
      },
      (error) => {
        alert("Error fetching location: " + error.message);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const lat = parseFloat(formData.coordinates.lat);
    const lng = parseFloat(formData.coordinates.lng);
    console.log("User from Redux:", user);
    console.log(user._id)
  console.log("User ID being sent:", user?._id);

    // Make API request here
    dispatch(
      addClinic(
        formData.clinicName,
        formData.city,
        formData.colony,
        lat,
        lng,
        user
      )
    );
    setFormData({
      clinicName: "",
      colony: "",
      city: "",
      coordinates: { lat: "", lng: "" },
    });
  };
  const handleMapClick = ({ lat, lng }) => {
  setFormData((prev) => ({
    ...prev,
    coordinates: { lat, lng },
  }));
  setMarker([{ lat, lng, label: "Selected Location" }]);
  toast.success("Location selected from map");
}
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Add Your Clinic 🏥
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-6 space-y-5"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Clinic Name
            </label>
            <input
              type="text"
              name="clinicName"
              required
              value={formData.clinicName}
              onChange={handleInputChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Colony
            </label>
            <input
              type="text"
              name="colony"
              required
              value={formData.colony}
              onChange={handleInputChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              required
              value={formData.city}
              onChange={handleInputChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Location Coordinates
            </label>
            <div className="flex space-x-3">
              <input
                type="number"
                name="lat"
                step="any"
                placeholder="Latitude"
                value={formData.coordinates.lat}
                onChange={handleInputChange}
                required
                className="w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              />
              <input
                type="number"
                name="lng"
                step="any"
                placeholder="Longitude"
                value={formData.coordinates.lng}
                onChange={handleInputChange}
                required
                className="w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              className="text-sm text-blue-600  self-start"
            >
              📍 Use Current Location
            </button>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
          >
            Add Clinic
          </button>
        </div>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Clinic Location Preview
        </h2>
        <div className="rounded-lg overflow-hidden shadow-md">
          <MapComponent markers={marker} onMapClick={handleMapClick} />
        </div>
      </div>
    </div>
  );
}

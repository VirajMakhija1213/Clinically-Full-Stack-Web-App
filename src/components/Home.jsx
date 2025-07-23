import React, { useState } from 'react';
import { FaStethoscope, FaMapMarkerAlt, FaUserMd, FaLaptopMedical } from 'react-icons/fa';
import { HiOutlineSearch, HiOutlineLocationMarker } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router';
import MapComponent from './MapComponent';
import toast from 'react-hot-toast';
import axios from 'axios';



export default function Home() {
   const [location, setLocation] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const markers = [];

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            toast.error("Please enter a location to search.");
            return;
        }
        setIsLoading(true);
        const toastId = toast.loading("Searching for clinics...");

        try {
            // Replace with your actual API endpoint from your API configuration
            const API_URL = "http://localhost:4000/api/v1/search-clinics-by-location";
            const response = await axios.post(API_URL, { query: searchQuery });
            toast.success(response.data.message);
            
            // Navigate to the clinics page and pass the results
            navigate('/clinics', { 
                state: { 
                    searchResults: response.data.data,
                    searchQuery: searchQuery,
                    searchCenter: response.data.searchCenter
                } 
            });

        } catch (error) {
            console.error("Error searching for clinics:", error);
            const errorMessage = error.response?.data?.message || "Could not perform search. Please try again.";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
            toast.dismiss(toastId);
        }
    };

  return (
    // Use a subtle gradient for the main background to avoid plain white
    <div className="bg-slate-50">
      <main>
        
        {/* =================================================================
            HERO SECTION
        ================================================================== */}
        <section className="relative bg-gradient-to-br from-blue-700 to-indigo-900 text-white py-24 lg:py-32 overflow-hidden">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-20 translate-y-20"></div>
                    
                    <div className="container mx-auto px-6 text-center relative z-10">
                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
                            Find Your Nearest Clinic, <span className="text-cyan-300">Instantly</span>.
                        </h1>
                        <p className="mt-4 text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
                            Search for doctors and clinics by location or specialty. Get directions, check timings, and book your visit seamlessly.
                        </p>
                        <div className="mt-10 max-w-2xl mx-auto">
                            <div className="flex flex-col sm:flex-row gap-2 p-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 shadow-2xl">
                                <div className="flex-grow flex items-center px-4">
                                    <HiOutlineLocationMarker className="text-white/70 mr-3 text-xl" />
                                    <input
                                        type="text"
                                        placeholder="Enter a location like 'Vijay Nagar, Indore'..."
                                        className="w-full py-3 bg-transparent text-white placeholder-white/70 focus:outline-none"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                    />
                                </div>
                                <button 
                                    onClick={handleSearch}
                                    disabled={isLoading}
                                    className="flex-shrink-0 bg-cyan-400 text-blue-900 font-bold px-8 py-3 rounded-full hover:bg-cyan-300 transition duration-300 flex items-center justify-center shadow-lg transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Searching...
                                        </>
                                    ) : (
                                        <>
                                            <HiOutlineSearch className="mr-2 text-xl" />
                                            Search
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

        {/* =================================================================
            HOW IT WORKS SECTION
        ================================================================== */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Your Health, Just a Few Clicks Away</h2>
              <p className="mt-4 text-gray-600 text-lg">A simple process to find the care you need.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {/* Step 1 */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
                <div className="bg-blue-100 text-blue-600 rounded-full p-6 mb-6 inline-block">
                  <HiOutlineSearch className="text-5xl" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">1. Search with Ease</h3>
                <p className="text-gray-600 leading-relaxed">
                  Enter a location, a doctor's name, or a medical specialty into our intelligent search bar.
                </p>
              </div>
              {/* Step 2 */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
                <div className="bg-green-100 text-green-600 rounded-full p-6 mb-6 inline-block">
                  <FaMapMarkerAlt className="text-5xl" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">2. Explore Clinics</h3>
                <p className="text-gray-600 leading-relaxed">
                  Browse a list of clinics on our interactive map. View detailed profiles, services, and operating hours.
                </p>
              </div>
              {/* Step 3 */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
                <div className="bg-red-100 text-red-600 rounded-full p-6 mb-6 inline-block">
                  <FaStethoscope className="text-5xl" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">3. Get Directions & Go</h3>
                <p className="text-gray-600 leading-relaxed">
                  Once you've found the right clinic, get instant directions via Google Maps and visit with confidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            MAP PREVIEW SECTION
        ================================================================== */}
        <section className="py-20 bg-gray-800 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Explore Clinics in Your Area</h2>
              <p className="mt-4 text-gray-300 text-lg">Our core feature makes finding help simple and visual.</p>
            </div>
            <div className="h-96 md:h-[500px] rounded-lg shadow-2xl overflow-hidden">
              <MapComponent  markers={markers} location={location} setLocation={setLocation}/>
            </div>
          </div>
        </section>

        {/* =================================================================
            CALL TO ACTION FOR DOCTORS
        ================================================================== */}
        <section className="bg-slate-50">
            <div className="container mx-auto px-6 py-20">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-10 md:p-16 text-white">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="lg:w-1/2 text-center lg:text-left">
                            <FaUserMd className="text-6xl text-cyan-300 mx-auto lg:mx-0 mb-4" />
                            <h2 className="text-3xl md:text-4xl font-bold">Are you a Doctor or Clinic Manager?</h2>
                            <p className="mt-4 text-lg text-blue-100">
                                Join our network to increase your clinic's visibility, attract new patients, and manage your online presence effortlessly.
                            </p>
                        </div>
                        <div className="lg:w-1/2 flex justify-center lg:justify-end">
                            <Link to="/signup" className="bg-white text-blue-600 font-bold px-10 py-4 rounded-full text-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105 shadow-lg">
                                List Your Clinic Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* =================================================================
            FEATURES SECTION
        ================================================================== */}
        <section className="py-20 bg-slate-100">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Why Choose Clinically?</h2>
              <p className="mt-4 text-gray-600 text-lg">Tools for both patients and doctors to make healthcare more accessible.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature Card */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border-t-4 border-blue-500">
                <div className="text-blue-500 mb-4">
                  <FaMapMarkerAlt size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Accurate Geolocation</h3>
                <p className="text-gray-600">Powered by Google Maps for precise and reliable clinic locations and directions.</p>
              </div>
              {/* Feature Card */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border-t-4 border-green-500">
                <div className="text-green-500 mb-4">
                  <FaStethoscope size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Comprehensive Profiles</h3>
                <p className="text-gray-600">Clinics can list their services, timings, available doctors, and upload photos.</p>
              </div>
              {/* Feature Card */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border-t-4 border-red-500">
                <div className="text-red-500 mb-4">
                  <FaUserMd size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Verified Professionals</h3>
                <p className="text-gray-600">We strive to verify clinic listings to ensure you receive care from trusted professionals.</p>
              </div>
              {/* Feature Card */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border-t-4 border-purple-500">
                <div className="text-purple-500 mb-4">
                  <FaLaptopMedical size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Doctor Dashboard</h3>
                <p className="text-gray-600">An easy-to-use dashboard for doctors to manage their clinic information anytime.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router'; // Corrected import for react-router-dom v6
import { FaUser, FaCalendarAlt, FaStethoscope, FaMapMarkerAlt, FaEdit, FaPlus } from 'react-icons/fa';

// Mock data for demonstration. In a real app, this would likely be fetched
// based on the logged-in user's ID.
const mockAppointments = [
    { id: 1, doctor: 'Dr. Emily Carter', specialty: 'Cardiologist', date: '2025-07-28', time: '10:30 AM', status: 'Upcoming' },
    { id: 2, doctor: 'Dr. Ben Hanson', specialty: 'Dermatologist', date: '2025-06-15', time: '02:00 PM', status: 'Completed' },
];

const mockClinic = {
    name: 'Sunrise Health Clinic',
    address: '123 Wellness Ave, Indore',
    isListed: true,
};

export default function Dashboard() {
    // Select user details from the 'auth' slice of the Redux store.
    const { user, loading } = useSelector((state) => state.auth);
    console.log(user)
    // Show a loading indicator while user data is being fetched.
    if (loading || !user) {
        return (
            <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-100">
                <p className="text-xl text-gray-600">Loading Dashboard...</p>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-80px)] bg-slate-100 p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto">
                
                {/* Dashboard Header */}
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">Welcome, {user.firstName}! 👋</h1>
                    <p className="mt-2 text-lg text-gray-600">Here's your personal health dashboard.</p>
                </header>

                {/* Dashboard Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column (Main Content) */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Conditional Card for Patients */}
                        {user.accountType === 'Patient' && (
                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3"><FaCalendarAlt className="text-blue-600" /> My Appointments</h2>
                                    <Link to="/clinics" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 text-sm font-semibold transition-colors flex items-center gap-2">
                                        <FaPlus /> Book New
                                    </Link>
                                </div>
                                <div className="space-y-4">
                                        {mockAppointments.map(appt => (
                                            <div key={appt.id} className={`p-4 rounded-lg flex items-center justify-between ${appt.status === 'Upcoming' ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50 border-l-4 border-gray-400'}`}>
                                                <div>
                                                    <p className="font-bold text-gray-800">{appt.doctor}</p>
                                                    <p className="text-sm text-gray-600">{appt.specialty}</p>
                                                    <p className="text-sm text-gray-500">{appt.date} at {appt.time}</p>
                                                </div>
                                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${appt.status === 'Upcoming' ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-800'}`}>
                                                    {appt.status}
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}
                        
                        {/* Conditional Card for Doctors */}
                        {user.accountType === 'Doctor' && (
                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3"><FaStethoscope className="text-green-600" /> My Clinic</h2>
                                    <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 text-sm font-semibold transition-colors flex items-center gap-2">
                                        <FaEdit /> Manage Clinic
                                    </button>
                                </div>
                                {mockClinic.isListed ? (
                                    <div className="p-4 rounded-lg bg-green-50 border-l-4 border-green-500">
                                        <p className="font-bold text-xl text-gray-800">{mockClinic.name}</p>
                                        <p className="text-gray-600 flex items-center gap-2 mt-1"><FaMapMarkerAlt /> {mockClinic.address}</p>
                                        <p className="mt-2 text-sm text-green-800 font-semibold">Your clinic is successfully listed and visible to patients.</p>
                                    </div>
                                ) : (
                                    <div className="p-4 rounded-lg bg-red-50 border-l-4 border-red-500 text-center">
                                        <p className="font-bold text-gray-800">Your clinic is not listed yet.</p>
                                        <Link to="/create-clinic" className="mt-2 inline-block text-blue-600 font-semibold hover:underline">
                                            List your clinic now to attract patients!
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>

                    {/* Right Column (Profile & Quick Actions) */}
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                            <img src={`https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName}%${user.lastName}`} alt={`${user.firstName} ${user.lastName}`} className="mx-auto h-24 w-24 object-cover rounded-full mb-4 border-4 border-slate-200"/>
                            <h3 className="text-2xl font-bold text-gray-800">{user.firstName} {user.lastName}</h3>
                            <p className="text-gray-500">{user.email}</p>
                            <span className="mt-2 inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">{user.accountType}</span>
                            <Link to="/dashboard/profile-settings">
                                <button className="w-full mt-6 bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 font-semibold transition-colors flex items-center justify-center gap-2">
                                    <FaEdit /> Edit Profile
                                </button>
                            </Link>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <Link to="/clinics" className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-blue-100 transition-colors">
                                    <FaMapMarkerAlt className="text-blue-600" />
                                    <span className="font-semibold text-gray-700">Find a Clinic</span>
                                </Link>
                                <Link to="/dashboard/settings" className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-blue-100 transition-colors">
                                    <FaUser className="text-blue-600" />
                                    <span className="font-semibold text-gray-700">Account Settings</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
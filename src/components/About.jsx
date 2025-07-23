import React from 'react';
import { FaHeartbeat, FaUsers, FaLightbulb, FaBullseye, FaUserMd, FaUserInjured } from 'react-icons/fa';
// Correctly import Link from react-router-dom
import { Link } from 'react-router';

// Placeholder for team member images
// const teamMemberPlaceholder = "https://placehold.co/400x400/E2E8F0/4A5568?text=Team+Member";

export default function About() {
  return (
    <div className="bg-slate-50">
      {/* =================================================================
          HERO SECTION
      ================================================================== */}
      <section className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-24 lg:py-32 overflow-hidden">
        {/* Background decorative shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-20 translate-y-20"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
            Connecting Health with <span className="text-cyan-300">Humanity</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            At Clinically, we believe finding reliable healthcare should be simple. We're dedicated to bridging the gap between doctors and patients through technology.
          </p>
        </div>
      </section>

      {/* =================================================================
          OUR MISSION & STORY SECTION
      ================================================================== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Our Mission */}
            <div className="text-center lg:text-left p-8 rounded-xl transition-all duration-300">
              <FaBullseye className="text-blue-600 text-5xl mx-auto lg:mx-0 mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Mission</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Our mission is to empower every individual with the ability to find and access quality healthcare services with ease and confidence. We aim to create a transparent and accessible digital healthcare ecosystem, starting right here in Indore and expanding beyond.
              </p>
            </div>
            {/* Our Story */}
            <div className="text-center lg:text-left p-8 rounded-xl transition-all duration-300">
              <FaHeartbeat className="text-red-500 text-5xl mx-auto lg:mx-0 mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Story</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Founded in 2025 in the heart of India, Indore, Clinically was born from a simple observation: while healthcare providers are abundant, accessing them can be a challenge. We saw a need for a centralized platform where patients could easily locate clinics and doctors could make their services visible. This idea grew into the platform you see today—a tool built with care, for our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          HOW WE HELP SECTION
      ================================================================== */}
      <section className="bg-slate-100 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Who We Serve</h2>
            <p className="mt-4 text-gray-600 text-lg">Our platform is designed for everyone in the healthcare journey.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* For Patients */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-green-500">
              <div className="flex items-center mb-4">
                <FaUserInjured className="text-green-500 text-4xl mr-4" />
                <h3 className="text-2xl font-bold text-gray-800">For Patients</h3>
              </div>
              <p className="text-gray-600">
                Find the right clinic when you need it most. Search by location or specialty, view detailed clinic profiles, check operating hours, and get directions instantly. No more guesswork, just quick and easy access to care.
              </p>
            </div>
            {/* For Doctors */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-500">
              <div className="flex items-center mb-4">
                <FaUserMd className="text-blue-500 text-4xl mr-4" />
                <h3 className="text-2xl font-bold text-gray-800">For Doctors</h3>
              </div>
              <p className="text-gray-600">
                Increase your clinic's visibility and connect with new patients. Our platform provides a simple way to list your services, manage your profile, and put your clinic on the map for thousands of potential patients to see.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          OUR VALUES SECTION
      ================================================================== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Core Values</h2>
            <p className="mt-4 text-gray-600 text-lg">The principles that guide every decision we make.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            {/* Value 1: Accessibility */}
            <div className="p-8 transform hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-blue-100 text-blue-600 rounded-full p-6 mb-6 inline-block">
                <FaUsers className="text-5xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Accessibility</h3>
              <p className="text-gray-600">Healthcare is a right, not a privilege. We are committed to making it easy for everyone to find the care they need.</p>
            </div>
            {/* Value 2: Trust */}
            <div className="p-8 transform hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-red-100 text-red-500 rounded-full p-6 mb-6 inline-block">
                <FaHeartbeat className="text-5xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Trust</h3>
              <p className="text-gray-600">We build trust through verified listings and transparent information, ensuring you can make health decisions with confidence.</p>
            </div>
            {/* Value 3: Simplicity */}
            <div className="p-8 transform hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-yellow-100 text-yellow-600 rounded-full p-6 mb-6 inline-block">
                <FaLightbulb className="text-5xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Simplicity</h3>
              <p className="text-gray-600">We believe technology should solve problems, not create them. Our platform is designed to be intuitive and user-friendly for all.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          JOIN US - CALL TO ACTION
      ================================================================== */}
      <section className="bg-slate-50">
        <div className="container mx-auto px-6 py-20">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-10 md:p-16 text-white text-center">
                <h2 className="text-3xl md:text-4xl font-bold">Join Our Growing Community</h2>
                <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
                    Whether you're looking for care or looking to provide it, Clinically is here to help. Create your account today and be a part of the future of healthcare access.
                </p>
                <div className="mt-8">
                    <Link to="/signup">
                        <button className="bg-white text-blue-600 font-bold px-8 py-3 rounded-full text-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105 shadow-lg">
                            Get Started for Free
                        </button>
                    </Link>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router';
import { FaHome } from 'react-icons/fa';

export default function Error() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex flex-col justify-center items-center text-center py-12 px-4 relative overflow-hidden">
      
      {/* Background decorative shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200/50 rounded-full -translate-x-16 -translate-y-16 blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200/50 rounded-full translate-x-20 translate-y-20 blur-3xl"></div>

      <div className="relative z-10">
        {/* The large "404" text with a gradient effect */}
        <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent drop-shadow-md">
          404
        </h1>
        
        {/* The error title */}
        <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-gray-800">
          Page Not Found
        </h2>
        
        {/* The descriptive text */}
        <p className="mt-4 text-lg text-gray-600 max-w-lg mx-auto">
          Oops! It seems you've taken a wrong turn. The page you are looking for does not exist, has been moved, or is temporarily unavailable.
        </p>

        {/* The button to go back to the homepage */}
        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center gap-x-3 bg-blue-600 text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <FaHome />
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

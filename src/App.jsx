import React from "react";
// Import layout components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AddClinic from "./components/AddClinic";

import ScrollToTop from "./components/ScrollToTop";

// Import page components
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Clinics from "./components/Clinics";
import About from "./components/About";
import { BrowserRouter, Route, Routes } from "react-router";
import VerifyEmail from "./components/VerifyEmail";
import Error from "./components/Error";
import OpenRoute from "./components/OpenRoute";
import Dashboard from "./components/Dashboard";
import ForgotPassword from "./components/ForgotPassword";
import UpdatePassword from "./components/UpdatePassword";

// =================================================================
// Placeholder Components for routes linked in Navbar/Footer
// In a real application, these would be in their own files.
// =================================================================

// =================================================================
// Main App Component
// =================================================================

export default function App() {
  return (
    // The Router component provides routing capabilities to the entire app.
    <>
      {/* This custom component ensures that every navigation scrolls the user to the top of the page. */}
      <ScrollToTop />

      {/* The main container uses flexbox to ensure the footer sticks to the bottom. */}
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* The Navbar is rendered on every page. */}
        <Navbar />

        {/* The `main` element will grow to fill available space, pushing the footer down. */}
        <main className="flex-grow">
          <Routes>
            {/* Route for the Home page */}
            <Route path="/" element={<Home />} />

            {/* Route for the Login page */}
            <Route
              path="/login"
              element={
                <OpenRoute>
                  <Login />
                </OpenRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <OpenRoute>
                  <Signup />
                </OpenRoute>
              }
            />
            <Route
              path="/forgotPassword"
              element={
                <OpenRoute>
                  <ForgotPassword />
                </OpenRoute>
              }
            />
            <Route
              path="/update-password/:token"
              element={
                <OpenRoute>
                  <UpdatePassword/>
                </OpenRoute>
              }
            />

            {/* Route for the page that lists all clinics */}
            <Route path="/clinics" element={<Clinics />} />

            {/* Route for the About Us page */}
            <Route path="/about" element={<About />} />

            {/* Route for doctors to create their clinic profile */}
            <Route path="/addClinic" element={<AddClinic/>} />

            {/* Route for the logged-in user's dashboard */}
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/verify-email" element={<VerifyEmail />}></Route>
            {/* A "catch-all" route for 404 Not Found pages could be added here */}
            {/* e.g., <Route path="*" element={<NotFoundPage />} /> */}
            <Route path="*" element={<Error />}></Route>
          </Routes>
        </main>

        {/* The Footer is rendered on every page. */}
        <Footer />
      </div>
    </>
  );
}

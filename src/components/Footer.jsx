import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router';
export default function Footer() {
  const submitHandler=(e)=>{
    console.log(email)
  e.preventDefault();
  setEmail("");
  toast.success("Subscribed to our channel!")
}
const [email,setEmail]=useState("");
  return (
    <footer className="bg-gray-800 text-white">
       
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: About & Brand */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">
              <Link to="/" className="hover:text-blue-400 transition-colors">Clinically 🏥</Link>
            </h2>
            <p className="text-gray-400">
              Your trusted partner in finding local healthcare. We connect patients with clinics, simply and efficiently.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><FaFacebookF size={20} /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><FaTwitter size={20} /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><FaInstagram size={20} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><FaLinkedinIn size={20} /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/clinics" className="text-gray-400 hover:text-white transition-colors">Find a Clinic</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">Doctor Login</Link></li>
              <li><Link to="/signup" className="text-gray-400 hover:text-white transition-colors">Become a Member</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal & Help</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe to our Newsletter</h3>
            <p className="text-gray-400 mb-4">Get the latest updates on new clinics and health tips.</p>
            <form onSubmit={submitHandler}>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full px-4 py-2 text-gray-800 rounded-l-md focus:outline-none"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="bg-blue-600 px-4 py-2 text-white font-semibold rounded-r-md hover:bg-blue-700 transition-colors"
                >
                  Go
                </button>
              </div>
            </form>
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Clinically ~ By Viraj Makhija &hearts;. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
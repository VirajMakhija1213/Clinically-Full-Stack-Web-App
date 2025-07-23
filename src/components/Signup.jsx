import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { setSignupData } from '../slices/authSlice';
import { sendOtp } from '../../services/operations/auth';

export default function Signup() {
  const navigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch=useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "Patient"
  });

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    console.log("Final Signup Data:", formData);
    // Add your signup logic here (e.g., API call)
    dispatch(setSignupData(formData))
    // Reset form after successful submission
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      accountType: "Patient"
    });
    dispatch(sendOtp(formData.email,navigate))
  };

  // Common input field classes for consistency
  const inputClasses = "w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
  const labelClasses = " text-4xl font-bold block text-sm font-medium text-gray-700";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow-lg">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Create Your Account ✨
          </h2>
          <p className="mt-2 text-md text-gray-600">
            Join Clinically to find and manage healthcare.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-6">
          
          {/* Account Type Selector */}
          <div>
            <label className={labelClasses} >I am a...</label>
            <div className="mt-2 grid grid-cols-2 gap-2 rounded-lg bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, accountType: 'Patient' }))}
                className={`w-full rounded-md py-2 text-sm font-medium transition-colors ${
                  formData.accountType === 'Patient' ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                Patient
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, accountType: 'Doctor' }))}
                className={`w-full rounded-md py-2 text-sm font-medium transition-colors ${
                  formData.accountType === 'Doctor' ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                Doctor
              </button>
            </div>
          </div>

          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className={labelClasses}>First Name</label>
              <input required type="text" value={formData.firstName} name="firstName" onChange={changeHandler} className={`mt-1 ${inputClasses}`} />
            </div>
            <div>
              <label htmlFor="lastName" className={labelClasses}>Last Name</label>
              <input required type="text" value={formData.lastName} name="lastName" onChange={changeHandler} className={`mt-1 ${inputClasses}`} />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClasses}>Email Address</label>
            <input required type="email" value={formData.email} name="email" onChange={changeHandler} className={`mt-1 ${inputClasses}`} />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className={labelClasses}>Password</label>
            <div className="relative mt-1">
              <input required type={showPassword ? "text" : "password"} value={formData.password} name="password" onChange={changeHandler} className={inputClasses} />
              <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700">
                {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
              </button>
            </div>
          </div>
          
          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className={labelClasses}>Confirm Password</label>
            <div className="relative mt-1">
              <input required type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} name="confirmPassword" onChange={changeHandler} className={inputClasses} />
              <button type="button" onClick={() => setShowConfirmPassword(p => !p)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700">
                {showConfirmPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                    Log In
                </Link>
            </p>
        </div>
      </div>
    </div>
  );
}
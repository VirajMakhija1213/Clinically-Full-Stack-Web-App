import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { resetPassword } from "../../services/operations/auth";


export default function UpdatePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // Mocking Redux state. Replace with your actual selector.
  const { loading } = useSelector((state) => state.auth || { loading: false });
  
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token, navigate));
  };
  
  // Common input field classes for consistency
  const inputClasses = "w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
  const labelClasses = "block text-sm font-medium text-gray-700";

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      {loading ? (
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-600"></div>
      ) : (
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Choose a New Password
            </h1>
            <p className="my-4 text-md leading-relaxed text-gray-600">
              Almost done. Enter your new password below and you're all set.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleOnSubmit} className="space-y-6">
            {/* New Password Field */}
            <div>
                <label htmlFor="password" className={labelClasses}>
                    New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1">
                    <input
                        required
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={handleOnChange}
                        placeholder="Enter new password"
                        className={inputClasses}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
                    </button>
                </div>
            </div>

            {/* Confirm New Password Field */}
            <div>
                <label htmlFor="confirmPassword" className={labelClasses}>
                    Confirm New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1">
                    <input
                        required
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleOnChange}
                        placeholder="Confirm new password"
                        className={inputClasses}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    >
                        {showConfirmPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
                    </button>
                </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Reset Password
            </button>
          </form>
          
          {/* Back to Login Link */}
          <div className="mt-6 flex items-center justify-center">
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 flex items-center gap-x-2">
              <BiArrowBack /> Back to Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

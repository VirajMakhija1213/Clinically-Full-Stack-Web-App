import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { getPasswordResetToken } from "../../services/operations/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();
  
  // Mocking Redux state. Replace with your actual selector.
  const { loading } = useSelector((state) => state.auth || { loading: false });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      {loading ? (
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-600"></div>
      ) : (
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">
              {!emailSent ? "Reset Your Password" : "Check Your Email"}
            </h1>
            <p className="my-4 text-md leading-relaxed text-gray-600">
              {!emailSent
                ? "Have no fear. We'll email you instructions to reset your password. Enter your registered email address below to begin."
                : `We have sent a password reset link to ${email}. Please check your inbox.`}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    required
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}
            <button
              type="submit"
              className="w-full flex justify-center mt-6 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {!emailSent ? "Reset Password" : "Resend Email"}
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

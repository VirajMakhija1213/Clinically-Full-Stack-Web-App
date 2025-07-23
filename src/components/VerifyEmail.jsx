import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../../services/operations/auth";


export default function VerifyEmail() {
  const [otp, setOtp] = useState("");
  // Mocking Redux state for demonstration. Replace with your actual useSelector.
  const {signupData,loading}=useSelector((state)=>state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [signupData, navigate]);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    if (!signupData) return; 

    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    // Dispatch the signUp action with all the necessary data
    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
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
              Verify Your Email
            </h1>
            <p className="text-md text-gray-600 mt-2">
              A 6-digit verification code has been sent to <span className="font-semibold text-gray-800">{signupData?.email}</span>. Please enter it below.
            </p>
          </div>

          {/* OTP Form */}
          <form onSubmit={handleVerifyAndSignup}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    width: "100%",
                  }}
                  className="!w-full aspect-square border-2 border-gray-300 rounded-md text-center text-lg font-semibold text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 10px",
              }}
            />
            
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 mt-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Verify & Create Account
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 flex items-center justify-between text-sm">
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500 flex items-center gap-x-2">
              <BiArrowBack />
              Back to Signup
            </Link>
            <button
              onClick={() => dispatch(sendOtp(signupData.email))}
              className="font-medium text-blue-600 hover:text-blue-500 flex items-center gap-x-2"
            >
              <RxCountdownTimer />
              Resend OTP
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

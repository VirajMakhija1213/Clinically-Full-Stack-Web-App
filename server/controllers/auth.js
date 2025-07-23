const User = require("../models/User");
const Clinic = require("../models/Clinic");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const OTP=require("../models/Otp")
require("dotenv").config();
exports.signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      otp,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !accountType ||
      !otp
    ) {
      return res.status(500).json({
        success: false,
        message: "All the details are not mentioned in the signup page",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(500).json({
        success: false,
        message: "The user already exists with us",
      });
    }
    if (password != confirmPassword) {
      return res.status(500).json({
        success: false,
        message: "The passwords do not match",
      });
    }
    // Find the most recent OTP for the email
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)
    console.log(response)
    if (response.length === 0) {
      // OTP not found for the email
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      })
    } else if (otp !== response[0].otp) {
      // Invalid OTP
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      })
    }
    //Yaha tak aagaye hai means sab detail sahi hai now move on to the next part i.e store the data
    let hashedPassword = await bcrypt.hash(password, 10);
    const userDetails = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
    });
    return res.status(200).json({
      success: true,
      message: "Successfully created the user details",
      data: userDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while signing up",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).json({
        success: false,
        message: "All the details are not provided in the login page",
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({
        success: false,
        message: "The user is not registered with us",
      });
    }
    //Now check that the password matches the password stored or not
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        id: user._id,
        accountType: user.accountType,
        email: user.email,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      user = user.toObject();
      user.token = token;
      user.password = undefined;
      //Now generate the cookie
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        message: "Successfully logged IN",
        token: token,
        user: user,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "The passwords do not match",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while logging in the page",
    });
  }
};
exports.sendotp = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user is already present
    // Find user with provided email
    const checkUserPresent = await User.findOne({ email });
    // to be used in case of signup

    // If user found with provided email
    if (checkUserPresent) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `User is Already Registered`,
      });
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const result = await OTP.findOne({ otp: otp });
    console.log("Result is Generate OTP Func");
    console.log("OTP", otp);
    console.log("Result", result);
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    console.log("OTP Body", otpBody);
    res.status(200).json({
      success: true,
      message: `OTP Sent Successfully`,
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

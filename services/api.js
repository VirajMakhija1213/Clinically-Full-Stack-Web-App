const BASE_URL = "https://clinically-full-stack-web-app.onrender.com/api/v1";
// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/sendotp",
  SIGNUP_API: BASE_URL + "/signup",
  LOGIN_API: BASE_URL + "/login",
  RESETPASSTOKEN_API: BASE_URL + "/resetPasswordToken",
  RESETPASSWORD_API: BASE_URL + "/resetPassword",
  ADD_CLINIC_API:BASE_URL+"/addClinic",
  GET_CLINICS:BASE_URL+"/showClinics"
};

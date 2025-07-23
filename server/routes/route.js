const express=require("express");
const router=express.Router()
//Import the controllers
const { login, signup, sendotp } = require("../controllers/auth");
const { auth, isPatient, isDoctor } = require("../middlewares/auth");
const { addClinic } = require("../controllers/addClinic");
const { getAllClinics } = require("../controllers/getAllClinics");
const { searchNearbyClinics, searchClinicsByLocationText } = require("../controllers/searchNearbyClinics");
const { resetPasswordToken, resetPassword } = require("../controllers/resetPassword");
//Link the controllers
router.post("/login",login);
router.post("/signup",signup)
router.post("/addClinic",auth,isDoctor,addClinic)
router.get("/showClinics",getAllClinics)
router.get("/searchNearbyClinics",auth,isPatient,searchNearbyClinics)
router.post("/resetPasswordToken",resetPasswordToken)
router.post("/resetPassword",resetPassword)
router.post("/sendotp",sendotp)
router.post("/search-clinics-by-location",searchClinicsByLocationText)
//Middleware
router.post("/test",auth,(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"Successfully authenticated the user"
    })
})
module.exports=router;
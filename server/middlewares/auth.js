const User=require("../models/User")
const Clinic=require("../models/Clinic")
const jwt=require("jsonwebtoken")
require("dotenv").config();
exports.auth=async(req,res,next)=>{
    try{
        const token = req.body.token || req.cookies.token || req.headers.authorization?.replace("Bearer ", "");
        if(!token)
        {
            return res.status(500).json({
                success:false,
                message:"The token is not present"
            })
        }
        try{
            const decode=await jwt.verify(token,process.env.JWT_SECRET);
            req.user=decode
        }catch(error){
            return res.status(500).json({
                success:false,
                message:"The token is invalid"
            })
        }
        next();
    }
    catch(error)
    {
        console.log("Error while testing for the middleware")
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error while testing the auth route"
        })
    }
}
exports.isPatient=async(req,res,next)=>{
    try{
        if(req.user.accountType!=="Patient")
        {
            return res.status(500).json({
                success:false,
                message:"This is a protected route for patients"
            })
        }
        next();
    }
    catch(error)
    {
        console.log("Error while testing for the Patient")
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error while testing for the Patient"
        })
    }
}
exports.isDoctor=async(req,res,next)=>{
    try{
        if(req.user.accountType!=="Doctor")
        {
            return res.status(500).json({
                success:false,
                message:"This is a protected route for Doctors"
            })
        }
        next()
    }
    catch(error)
    {
        console.log("Error while testing for the Doctors")
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error while testing for the Doctors"
        })
    }
}

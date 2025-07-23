const User=require("../models/User")
const crypto=require("crypto")
const mailSender=require("../utils/mailSender")
const bcrypt=require("bcrypt")
exports.resetPasswordToken=async(req,res)=>{
    try{
        const {email}=req.body;
        const user=await User.findOne({email})
        if(!user)
        {
            return res.status(500).json({
                success:false,
                message:"No such user exists"
            })
        }
        const token = crypto.randomBytes(20).toString("hex");

		const updatedDetails = await User.findOneAndUpdate(
			{ email: email },
			{
				token: token,
				resetPasswordExpires: Date.now() + 3600000,
			},
			{ new: true }
		);
        const url = `http://localhost:1234/update-password/${token}`;

		await mailSender(
			email,
			"Password Reset",
			`Your Link for email verification is ${url}. Please click this url to reset your password.`
		);

		res.json({
			success: true,
			message:
				"Email Sent Successfully, Please Check Your Email to Continue Further",
		});
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:"Error while resetting the password token"
        })
    }
}
exports.resetPassword=async(req,res)=>{
    try{
        const {token,password,confirmPassword}=req.body;
        const user=await User.findOne({token:token})
        if(!user)
        {
            return res.status(500).json({
                success:false,
                message:"Token is invalid"
            })
        }
        if(password!=confirmPassword)
        {
            return res.status(500).json({
                success:false,
                message:"The passwords do not match"
            })
        }
        if(user.resetPasswordExpires<Date.now())
        {
            return res.status(500).json({
                success:false,
                message:"Token has expired"
            })
        }
        const encryptedPassword=await bcrypt.hash(password,10);
        await User.findOneAndUpdate(
			{ token: token },
			{ password: encryptedPassword },
			{ new: true }
		);
        res.json({
			success: true,
			message: `Password Reset Successful`,
		});
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:"Error while resetting the password"
        })
    }
}
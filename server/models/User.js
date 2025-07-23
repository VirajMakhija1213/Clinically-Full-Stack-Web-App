const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    accountType:{
        type:String,
        enum:["Doctor","Patient"],
        required:true
    },
    clinics:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Clinic"
    }],
    token: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
})
module.exports=mongoose.model("User",userSchema);
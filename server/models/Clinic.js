const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema({
  clinicName: {
    type: String,
    required: true,
  },
  colony: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    }
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

// Add 2dsphere index for geospatial queries
clinicSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Clinic", clinicSchema);

// const mongoose=require("mongoose")
// const clinicSchema=new mongoose.Schema({
//     clinicName:{
//         type:String,
//         required:true
//     },
//     colony:{
//         type:String,
//         required:true
//     },
//     city:{
//         type:String,
//         required:true
//     },
//     longitude:{
//         type:String,
//         required:true
//     },
//     lattitude:{
//         type:String,
//         required:true
//     }
// })
// module.exports=mongoose.model("Clinic",clinicSchema)
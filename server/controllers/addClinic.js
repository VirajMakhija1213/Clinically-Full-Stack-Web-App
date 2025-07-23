const mongoose = require("mongoose");
const User = require("../models/User");
const Clinic = require("../models/Clinic");

exports.addClinic = async (req, res) => {
  try {
    console.log("REQ BODY IN ADD CLINIC:", req.body);

    const { clinicName, city, colony, latitude, longitude, userId } = req.body;

    if (!clinicName || !city || !colony || !latitude || !longitude || !userId) {
      return res.status(400).json({
        success: false,
        message: "All clinic details and userId must be provided",
      });
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({
        success: false,
        message: "Invalid coordinates provided",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const clinic = await Clinic.create({
      clinicName,
      city,
      colony,
      location: {
        type: "Point",
        coordinates: [lng, lat],
      },
      doctorId: userId,
    });

    await User.findByIdAndUpdate(
      userId,
      { $push: { clinics: clinic._id } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Clinic added successfully",
      data: clinic,
    });

  } catch (error) {
    console.error("Error while adding clinic:", error.message);
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: "Server error while adding clinic",
    });
  }
};

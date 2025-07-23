const Clinic = require("../models/Clinic");

exports.getAllClinics = async (req, res) => {
  try {
    const clinics = await Clinic.find({})
      .populate({
        path: "doctorId",
        select: "firstName lastName email", // only essential fields
      });

    return res.status(200).json({
      success: true,
      message: "Fetched all clinics successfully",
      data: clinics,
    });
  } catch (error) {
    console.error("Error fetching all clinics:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching clinics",
    });
  }
};

const Clinic = require("../models/Clinic");
const NodeGeocoder = require('node-geocoder');

// Geocoder Configuration
const options = {
  provider: 'openstreetmap',
};
const geocoder = NodeGeocoder(options);


// --- NEW, MORE ROBUST CONTROLLER FOR TEXT-BASED LOCATION SEARCH ---
exports.searchClinicsByLocationText = async (req, res) => {
  try {
    const { query, maxDistanceInKm = 15 } = req.body;

    if (!query || !query.trim()) {
      return res.status(400).json({
        success: false,
        message: "A location query is required.",
      });
    }

    const searchRegex = new RegExp(query.trim(), 'i');

    // 1. Text-based search (clinicName, city, colony)
    const textConditions = {
      $or: [
        { clinicName: searchRegex },
        { city: searchRegex },
        { colony: searchRegex },
      ],
    };

    const textResults = await Clinic.find(textConditions)
      .populate({
        path: "doctorId",
        select: "firstName lastName email",
      });

    let geoResults = [];
    let searchCenter = null;

    try {
      const geoResult = await geocoder.geocode(query);

      if (geoResult && geoResult.length > 0) {
        const { latitude, longitude } = geoResult[0];
        searchCenter = { latitude, longitude };

        geoResults = await Clinic.find({
          location: {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: [longitude, latitude],
              },
              $maxDistance: maxDistanceInKm * 1000,
            },
          },
        }).populate({
          path: "doctorId",
          select: "firstName lastName email",
        });
      }
    } catch (geoError) {
      console.warn(`Geocoding failed for query: "${query}"`);
    }

    // Combine results, avoid duplicates
    const combined = [...textResults];

    const existingIds = new Set(combined.map(c => c._id.toString()));

    for (let clinic of geoResults) {
      if (!existingIds.has(clinic._id.toString())) {
        combined.push(clinic);
      }
    }

    if (combined.length === 0) {
      return res.status(200).json({
        success: true,
        message: `No clinics found matching "${query}".`,
        data: [],
        searchCenter,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Successfully fetched clinics matching "${query}".`,
      data: combined.slice(0, 50), // optional limit
      searchCenter,
    });

  } catch (error) {
    console.error("Error searching clinics by location text:", error);
    return res.status(500).json({
      success: false,
      message: "A server error occurred while searching for clinics.",
    });
  }
};

// --- Existing controller for coordinate-based search (no changes needed) ---
exports.searchNearbyClinics = async (req, res) => {
  try {
    const { longitude, latitude, maxDistanceInKm = 10 } = req.body;

    if (!longitude || !latitude) {
      return res.status(400).json({
        success: false,
        message: "Longitude and latitude are required for location search",
      });
    }

    const clinics = await Clinic.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: maxDistanceInKm * 1000, // convert km to meters
        },
      },
    }).populate({
      path: "doctorId",
      select: "firstName lastName email",
    });

    return res.status(200).json({
      success: true,
      message: "Nearby clinics fetched successfully",
      data: clinics,
    });
  } catch (error) {
    console.error("Error searching nearby clinics:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while searching nearby clinics",
    });
  }
};

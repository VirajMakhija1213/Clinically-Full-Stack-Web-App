const mongoose = require("mongoose");
require("dotenv").config();
const Ping=require("../models/Ping")
const dbConnect = () => {
  mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("✅ Database connection successful");

      // Start keep-alive interval
      setInterval(async () => {
        try {
          // A simple findOne ping to keep the DB awake
          await Ping.findOne(); 
          console.log("🔁 Keep-alive DB ping successful");
        } catch (err) {
          console.error("⚠️ Keep-alive DB ping failed:", err.message);
        }
      }, 1000 * 60 * 5); // every 5 minutes
    })
    .catch((error) => {
      console.error("❌ Error connecting to database:", error.message);
      process.exit(1);
    });
};

module.exports = dbConnect;

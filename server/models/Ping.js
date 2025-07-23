// models/Ping.js
const mongoose = require("mongoose");

const pingSchema = new mongoose.Schema({
  status: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Ping", pingSchema);

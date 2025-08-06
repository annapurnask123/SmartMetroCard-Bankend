const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, unique: true, required: true },
    zone: { type: String },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number] }, // [longitude, latitude]
    },
    order: { type: Number },
  },
  { timestamps: true }
);

stationSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Station", stationSchema);

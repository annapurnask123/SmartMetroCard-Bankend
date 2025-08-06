const mongoose = require("mongoose");

const userJourneySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
    currentStation: { type: mongoose.Schema.Types.ObjectId, ref: "Station" },
    destinationStation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Station",
      required: true,
    },
    startTime: { type: Date, required: true },
    status: {
      type: String,
      enum: ["in_progress", "completed", "cancelled"],
      default: "in_progress",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserJourney", userJourneySchema);

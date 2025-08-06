const mongoose = require("mongoose");

const trainScheduleSchema = new mongoose.Schema(
  {
    trainNumber: { type: String, required: true },
    station: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Station",
      required: true,
    },
    arrivalTimes: [{ type: Date, required: true }],
    direction: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TrainSchedule", trainScheduleSchema);

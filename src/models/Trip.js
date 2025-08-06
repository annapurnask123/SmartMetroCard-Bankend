const mongoose = require("mongoose");
const { TripStatus } = require("../enums");

const tripSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    virtualCard: { type: mongoose.Schema.Types.ObjectId, ref: "VirtualCard" },
    startStation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Station",
      required: true,
    },
    endStation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Station",
      required: true,
    },
    bookingTime: { type: Date, default: Date.now },
    startTime: { type: Date },
    endTime: { type: Date },
    fareCharged: { type: Number, required: true },
    status: {
      type: String,
      enum: Object.values(TripStatus),
      default: TripStatus.BOOKED,
    },
    paymentTransaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
    refundedAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);

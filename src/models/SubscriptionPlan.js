const mongoose = require("mongoose");

const subscriptionPlanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    durationInDays: { type: Number, required: true },
    description: { type: String },
    zonesCovered: [{ type: String }],
    benefits: [{ type: String }],
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubscriptionPlan", subscriptionPlanSchema);

const mongoose = require("mongoose");

const paymentMethodSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["upi", "card", "wallet", "netbanking"],
      required: true,
    },
    provider: { type: String, required: true },
    details: { type: Object },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PaymentMethod", paymentMethodSchema);

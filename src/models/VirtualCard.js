const mongoose = require("mongoose");

const virtualCardSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    cardNumber: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true },
    issuedDate: { type: Date, default: Date.now },
    expiryDate: { type: Date, required: true },
    balance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VirtualCard", virtualCardSchema);

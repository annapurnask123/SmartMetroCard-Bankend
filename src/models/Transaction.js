const mongoose = require("mongoose");
const { TransactionTypes } = require("../enums");

const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip" },
    amount: { type: Number, required: true },
    transactionType: {
      type: String,
      enum: Object.values(TransactionTypes),
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["upi", "wallet", "card", "netbanking"],
      required: true,
    },
    provider: { type: String },
    paymentGatewayTransactionId: { type: String },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    transactionDate: { type: Date, default: Date.now },
    remarks: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);

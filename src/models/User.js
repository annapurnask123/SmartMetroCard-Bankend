const mongoose = require("mongoose");
const { UserRoles } = require("../enums");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: { type: String, required: true }, // hashed password
    phone: { type: String, trim: true },
    role: {
      type: String,
      enum: Object.values(UserRoles),
      default: UserRoles.USER,
    },
    walletBalance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

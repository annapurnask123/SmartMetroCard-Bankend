const mongoose = require("mongoose");
const { NotificationTypes } = require("../enums");

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: Object.values(NotificationTypes),
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    relatedTrip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip" },
    isRead: { type: Boolean, default: false },
    sentAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);

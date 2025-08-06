// src/config/db.js
const mongoose = require("mongoose");

class Database {
  constructor() {
    this.mongoUri =
      process.env.MONGO_URI || "mongodb://localhost:27017/metroTicketingDB";
  }

  async connect() {
    try {
      await mongoose.connect(this.mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB Connected");
    } catch (error) {
      console.error("MongoDB connection error:", error.message);
      process.exit(1);
    }
  }
}

module.exports = new Database();

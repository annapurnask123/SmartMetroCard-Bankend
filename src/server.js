import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Since you use ES modules for dotenv, let's also use import for models if possible
import User from "./models/User.js"; // if your environment supports .js extension or adjust accordingly
import Station from "./models/Station.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// async function seedTestData() {
//   try {
//     const existingUsers = await User.countDocuments();
//     if (existingUsers === 0) {
//       const user = new User({
//         name: "Annapurna Sample",
//         email: "anna@example.com",
//         password: "hashedpassword",
//         phone: "9876543210",
//         walletBalance: 200,
//       });
//       await user.save();

//       const station = new Station({
//         name: "Rajiv Chowk",
//         code: "RC01",
//         zone: "Blue Line",
//         location: { type: "Point", coordinates: [77.2219, 28.6328] },
//         order: 1,
//       });
//       await station.save();

//       console.log("Seed data inserted");
//     } else {
//       console.log("Seed data already exists, skipping...");
//     }
//   } catch (err) {
//     console.error("Error seeding test data:", err);
//   }
// }

const startServer = async () => {
  await connectDB();
  // await seedTestData(); // <-- call seed here *after* DB connection

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};

startServer();

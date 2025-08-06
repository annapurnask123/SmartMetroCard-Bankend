import express from "express";
import cors from "cors";

// Route imports
import notificationRoutes from "./routes/notificationRoutes.js";
import paymentMethodRoutes from "./routes/paymentMethodRoutes.js";
import stationRoutes from "./routes/stationRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import subscriptionPlanRoutes from "./routes/subscriptionPlanRoutes.js";
import trainSchedulingRoutes from "./routes/trainSchedulingRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import userJourneyRoutes from "./routes/userJourneyRoutes.js";
import virtualCardRoutes from "./routes/virtualCardRoutes.js";

// Middleware imports
import { requestLogger } from "./middlewares/loggerMiddleware.js";
import { notFound } from "./middlewares/notFoundMiddleware.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
// import { authMiddleware } from "./middlewares/authMiddleware.js"; // optionally import

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get("/", (req, res) => {
  res.send("Server is running");
});

// Mount routes
app.use("/api/notifications", notificationRoutes);
app.use("/api/paymentmethods", paymentMethodRoutes);
app.use("/api/stations", stationRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/subscriptionplans", subscriptionPlanRoutes);
app.use("/api/trainschedulings", trainSchedulingRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/users", userRoutes);
app.use("/api/userjourneys", userJourneyRoutes);
app.use("/api/virtualcards", virtualCardRoutes);

app.use(notFound);    // Handle 404s
app.use(errorHandler); // Handle errors

export default app;

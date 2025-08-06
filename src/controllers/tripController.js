const Trip = require("../models/Trip");

// Create a new trip
exports.createTrip = async (req, res) => {
  try {
    const trip = new Trip(req.body);
    await trip.save();
    res.status(201).json(trip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all trips
exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find()
      .populate("user")
      .populate("virtualCard")
      .populate("startStation")
      .populate("endStation");
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get trip by ID
exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate("user")
      .populate("virtualCard")
      .populate("startStation")
      .populate("endStation");

    if (!trip) return res.status(404).json({ error: "Trip not found" });
    res.json(trip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update trip by ID
exports.updateTrip = async (req, res) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTrip) return res.status(404).json({ error: "Trip not found" });
    res.json(updatedTrip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete trip by ID
exports.deleteTrip = async (req, res) => {
  try {
    const deletedTrip = await Trip.findByIdAndDelete(req.params.id);
    if (!deletedTrip) return res.status(404).json({ error: "Trip not found" });
    res.json({ message: "Trip deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

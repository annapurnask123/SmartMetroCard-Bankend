const Station = require("../models/Station");

// Create a new station
exports.createStation = async (req, res) => {
  try {
    const station = new Station(req.body);
    await station.save();
    res.status(201).json(station);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all stations
exports.getAllStations = async (req, res) => {
  try {
    const stations = await Station.find();
    res.json(stations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get station by ID
exports.getStationById = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    if (!station) return res.status(404).json({ error: "Station not found" });
    res.json(station);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update station by ID
exports.updateStation = async (req, res) => {
  try {
    const updatedStation = await Station.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedStation)
      return res.status(404).json({ error: "Station not found" });
    res.json(updatedStation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete station by ID
exports.deleteStation = async (req, res) => {
  try {
    const deletedStation = await Station.findByIdAndDelete(req.params.id);
    if (!deletedStation)
      return res.status(404).json({ error: "Station not found" });
    res.json({ message: "Station deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

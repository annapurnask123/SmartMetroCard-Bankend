import Trip from '../models/Trip.js';
import * as tripService from '../services/tripService.js';

/**
 * Create a trip using tripService (deduct fare, save trip)
 */
export const createTrip = async (req, res) => {
  try {
    const tripData = req.body;

    const trip = await tripService.startTrip(tripData);

    res.status(201).json(trip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Complete a trip using tripService
 */
export const completeTrip = async (req, res) => {
  try {
    const tripId = req.params.id;
    const trip = await tripService.completeTrip(tripId);
    res.json(trip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Get all trips (populate related refs)
 */
export const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find()
      .populate('user')
      .populate('virtualCard')
      .populate('startStation')
      .populate('endStation');
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get trip by ID
 */
export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate('user')
      .populate('virtualCard')
      .populate('startStation')
      .populate('endStation');
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    res.json(trip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update trip by ID
 */
export const updateTrip = async (req, res) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTrip) return res.status(404).json({ error: 'Trip not found' });
    res.json(updatedTrip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Delete trip by ID
 */
export const deleteTrip = async (req, res) => {
  try {
    const deletedTrip = await Trip.findByIdAndDelete(req.params.id);
    if (!deletedTrip) return res.status(404).json({ error: 'Trip not found' });
    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

import Trip from '../models/Trip.js';
import { deductBalance } from './paymentService.js';

/**
 * Calculate fare based on trip details (simple example)
 */
export const calculateFare = (startStation, endStation) => {
  // Replace with real fare calculation logic based on zones or distance
  const baseFare = 10;
  // Example: charge +2 for each zone difference (mock data)
  const zoneDiff = Math.abs(startStation.zone - endStation.zone) || 0;
  return baseFare + zoneDiff * 2;
};

/**
 * Start a trip by creating a new entry and deducting fare from virtual card
 */
export const startTrip = async (tripData) => {
  const { user, virtualCard, startStation, endStation } = tripData;

  // Calculate fare
  const fare = calculateFare(startStation, endStation);

  // Deduct from virtual card balance
  await deductBalance(virtualCard, fare);

  // Save trip with fare and status 'ongoing'
  const trip = new Trip({
    ...tripData,
    fareCharged: fare,
    status: 'ongoing',
    startTime: new Date(),
  });

  await trip.save();
  return trip;
};

/**
 * Complete trip, update end time and status
 */
export const completeTrip = async (tripId) => {
  const trip = await Trip.findById(tripId);
  if (!trip) throw new Error('Trip not found');

  trip.status = 'completed';
  trip.endTime = new Date();
  await trip.save();

  return trip;
};

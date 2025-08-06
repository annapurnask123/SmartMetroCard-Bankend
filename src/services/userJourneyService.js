import UserJourney from '../models/UserJourney.js';

export const createUserJourney = async (journeyData) => {
  const journey = new UserJourney(journeyData);
  await journey.save();
  return journey;
};

export const getUserJourneysByUser = async (userId) => {
  return await UserJourney.find({ user: userId });
};

// Add other business logic as needed

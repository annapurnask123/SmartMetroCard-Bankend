import Subscription from '../models/Subscription.js';
import * as subscriptionService from '../services/subscriptionService.js';

/**
 * Create a new subscription or renew existing one
 */
export const createSubscription = async (req, res) => {
  try {
    const { userId, planId } = req.body;
    if (!userId || !planId) {
      return res.status(400).json({ error: 'User ID and Plan ID are required' });
    }

    const subscription = await subscriptionService.createOrRenewSubscription(userId, planId);
    res.status(201).json(subscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Get all subscriptions
 */
export const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find().populate('user').populate('plan');
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get subscription by ID
 */
export const getSubscriptionById = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id).populate('user').populate('plan');
    if (!subscription) return res.status(404).json({ error: 'Subscription not found' });
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update subscription by ID
 */
export const updateSubscription = async (req, res) => {
  try {
    const updatedSubscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedSubscription) return res.status(404).json({ error: 'Subscription not found' });
    res.json(updatedSubscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Delete subscription by ID
 */
export const deleteSubscription = async (req, res) => {
  try {
    const deletedSubscription = await Subscription.findByIdAndDelete(req.params.id);
    if (!deletedSubscription) return res.status(404).json({ error: 'Subscription not found' });
    res.json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

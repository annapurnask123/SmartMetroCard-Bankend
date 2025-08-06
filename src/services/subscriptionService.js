import Subscription from '../models/Subscription.js';
import SubscriptionPlan from '../models/SubscriptionPlan.js';

/**
 * Validate if user's subscription is active
 */
export const validateSubscription = async (userId) => {
  const subscription = await Subscription.findOne({ user: userId, active: true });
  return subscription ? true : false;
};

/**
 * Create or renew subscription for a user with a subscription plan
 */
export const createOrRenewSubscription = async (userId, planId) => {
  const plan = await SubscriptionPlan.findById(planId);
  if (!plan) throw new Error('Subscription Plan not found');

  const now = new Date();
  let subscription = await Subscription.findOne({ user: userId });

  if (subscription) {
    // Renew subscription: update expiry date and plan details
    subscription.plan = planId;
    subscription.startDate = now;
    subscription.expiryDate = new Date(now.getTime() + plan.durationInDays * 24 * 60 * 60 * 1000);
    subscription.active = true;
  } else {
    // Create new subscription
    subscription = new Subscription({
      user: userId,
      plan: planId,
      startDate: now,
      expiryDate: new Date(now.getTime() + plan.durationInDays * 24 * 60 * 60 * 1000),
      active: true,
    });
  }
  
  await subscription.save();
  return subscription;
};

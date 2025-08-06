/**
 * Stub notification service.
 * Extend this to integrate with real email/SMS/push services.
 */
export const sendNotification = async (userId, message) => {
  // For now just log to console
  console.log(`Notify user ${userId}: ${message}`);
  // In real app, integrate with email service or push notifications
  return true;
};

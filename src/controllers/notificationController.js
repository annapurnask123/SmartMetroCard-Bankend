import Notification from '../models/Notification.js';
import * as notificationService from '../services/notificationService.js';

/**
 * Create a new notification
 */
export const createNotification = async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();

    // Optionally send notification immediately
    await notificationService.sendNotification(notification.user, notification.message);

    res.status(201).json(notification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Get all notifications
 */
export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get notification by ID
 */
export const getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ error: 'Notification not found' });
    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update notification by ID
 */
export const updateNotification = async (req, res) => {
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedNotification) return res.status(404).json({ error: 'Notification not found' });
    res.json(updatedNotification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Delete notification by ID
 */
export const deleteNotification = async (req, res) => {
  try {
    const deletedNotification = await Notification.findByIdAndDelete(req.params.id);
    if (!deletedNotification) return res.status(404).json({ error: 'Notification not found' });
    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

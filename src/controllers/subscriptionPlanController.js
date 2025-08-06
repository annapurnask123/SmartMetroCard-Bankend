const SubscriptionPlan = require("../models/SubscriptionPlan");

// Create a subscription plan
exports.createSubscriptionPlan = async (req, res) => {
  try {
    const plan = new SubscriptionPlan(req.body);
    await plan.save();
    res.status(201).json(plan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all subscription plans
exports.getAllSubscriptionPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a subscription plan by ID
exports.getSubscriptionPlanById = async (req, res) => {
  try {
    const plan = await SubscriptionPlan.findById(req.params.id);
    if (!plan)
      return res.status(404).json({ error: "Subscription Plan not found" });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update subscription plan by ID
exports.updateSubscriptionPlan = async (req, res) => {
  try {
    const updatedPlan = await SubscriptionPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPlan)
      return res.status(404).json({ error: "Subscription Plan not found" });
    res.json(updatedPlan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete subscription plan by ID
exports.deleteSubscriptionPlan = async (req, res) => {
  try {
    const deletedPlan = await SubscriptionPlan.findByIdAndDelete(req.params.id);
    if (!deletedPlan)
      return res.status(404).json({ error: "Subscription Plan not found" });
    res.json({ message: "Subscription plan deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

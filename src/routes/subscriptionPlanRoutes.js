const express = require('express');
const router = express.Router();
const subscriptionPlanController = require('../controllers/subscriptionPlanController');

router.post('/', subscriptionPlanController.createSubscriptionPlan);
router.get('/', subscriptionPlanController.getAllSubscriptionPlans);
router.get('/:id', subscriptionPlanController.getSubscriptionPlanById);
router.put('/:id', subscriptionPlanController.updateSubscriptionPlan);
router.delete('/:id', subscriptionPlanController.deleteSubscriptionPlan);

module.exports = router;

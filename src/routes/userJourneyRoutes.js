const express = require('express');
const router = express.Router();
const userJourneyController = require('../controllers/userJourneyController');

router.post('/', userJourneyController.createUserJourney);
router.get('/', userJourneyController.getAllUserJourneys);
router.get('/:id', userJourneyController.getUserJourneyById);
router.put('/:id', userJourneyController.updateUserJourney);
router.delete('/:id', userJourneyController.deleteUserJourney);

module.exports = router;

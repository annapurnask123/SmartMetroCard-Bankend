const express = require('express');
const router = express.Router();
const trainSchedulingController = require('../controllers/trainSchedulingController');

router.post('/', trainSchedulingController.createTrainScheduling);
router.get('/', trainSchedulingController.getAllTrainSchedulings);
router.get('/:id', trainSchedulingController.getTrainSchedulingById);
router.put('/:id', trainSchedulingController.updateTrainScheduling);
router.delete('/:id', trainSchedulingController.deleteTrainScheduling);

module.exports = router;

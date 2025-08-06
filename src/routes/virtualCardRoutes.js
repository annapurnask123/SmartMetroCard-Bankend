const express = require('express');
const router = express.Router();
const virtualCardController = require('../controllers/virtualCardController');

router.post('/', virtualCardController.createVirtualCard);
router.get('/', virtualCardController.getAllVirtualCards);
router.get('/:id', virtualCardController.getVirtualCardById);
router.put('/:id', virtualCardController.updateVirtualCard);
router.delete('/:id', virtualCardController.deleteVirtualCard);

module.exports = router;

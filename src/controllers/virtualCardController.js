import VirtualCard from '../models/VirtualCard.js';
import * as paymentService from '../services/paymentService.js';

/**
 * Create new VirtualCard
 */
export const createVirtualCard = async (req, res) => {
  try {
    const virtualCard = new VirtualCard(req.body);
    await virtualCard.save();
    res.status(201).json(virtualCard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Get all virtual cards with populated users
 */
export const getAllVirtualCards = async (req, res) => {
  try {
    const cards = await VirtualCard.find().populate('user');
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get virtual card by ID with user populated
 */
export const getVirtualCardById = async (req, res) => {
  try {
    const card = await VirtualCard.findById(req.params.id).populate('user');
    if (!card) return res.status(404).json({ error: 'VirtualCard not found' });
    res.json(card);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update virtual card by ID
 */
export const updateVirtualCard = async (req, res) => {
  try {
    const updatedCard = await VirtualCard.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedCard) return res.status(404).json({ error: 'VirtualCard not found' });
    res.json(updatedCard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Delete virtual card by ID
 */
export const deleteVirtualCard = async (req, res) => {
  try {
    const deletedCard = await VirtualCard.findByIdAndDelete(req.params.id);
    if (!deletedCard) return res.status(404).json({ error: 'VirtualCard not found' });
    res.json({ message: 'VirtualCard deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Example: Add balance to a virtual card using paymentService
 */
export const addBalanceToCard = async (req, res) => {
  try {
    const { amount } = req.body;
    const virtualCardId = req.params.id;

    const updatedCard = await paymentService.addBalance(virtualCardId, amount);

    res.json(updatedCard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

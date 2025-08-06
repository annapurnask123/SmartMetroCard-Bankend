import VirtualCard from '../models/VirtualCard.js';

/**
 * Add amount to user's virtual card balance
 */
export const addBalance = async (virtualCardId, amount) => {
  const card = await VirtualCard.findById(virtualCardId);
  if (!card) throw new Error('VirtualCard not found');

  card.balance += amount;
  await card.save();
  return card;
};

/**
 * Deduct amount from user's virtual card balance if sufficient balance exists
 */
export const deductBalance = async (virtualCardId, amount) => {
  const card = await VirtualCard.findById(virtualCardId);
  if (!card) throw new Error('VirtualCard not found');
  if (card.balance < amount) throw new Error('Insufficient balance');

  card.balance -= amount;
  await card.save();
  return card;
};

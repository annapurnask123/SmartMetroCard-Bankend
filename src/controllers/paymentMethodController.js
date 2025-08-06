import PaymentMethod from '../models/PaymentMethod.js';

/**
 * Create payment method
 */
export const createPaymentMethod = async (req, res) => {
  try {
    const paymentMethod = new PaymentMethod(req.body);
    await paymentMethod.save();
    res.status(201).json(paymentMethod);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Get all payment methods
 */
export const getAllPaymentMethods = async (req, res) => {
  try {
    const methods = await PaymentMethod.find();
    res.json(methods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get payment method by ID
 */
export const getPaymentMethodById = async (req, res) => {
  try {
    const method = await PaymentMethod.findById(req.params.id);
    if (!method) return res.status(404).json({ error: 'Payment method not found' });
    res.json(method);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update payment method
 */
export const updatePaymentMethod = async (req, res) => {
  try {
    const updatedMethod = await PaymentMethod.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedMethod) return res.status(404).json({ error: 'Payment method not found' });
    res.json(updatedMethod);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Delete payment method
 */
export const deletePaymentMethod = async (req, res) => {
  try {
    const deletedMethod = await PaymentMethod.findByIdAndDelete(req.params.id);
    if (!deletedMethod) return res.status(404).json({ error: 'Payment method not found' });
    res.json({ message: 'Payment method deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

import User from '../models/User.js';
import * as authService from '../services/authService.js';
import * as notificationService from '../services/notificationService.js';

/**
 * Create new user with hashed password and send welcome notification
 */
export const createUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body;

    // Validate password presence
    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // Hash password before saving
    const hashedPassword = await authService.hashPassword(password);

    const user = new User({ ...rest, password: hashedPassword });
    await user.save();

    // Send welcome notification asynchronously (can await or not)
    notificationService.sendNotification(user._id, 'Welcome to Metro Card App!');

    // Return created user (exclude password field)
    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json(userObj);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * User login: verify password and return JWT token if valid
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await authService.comparePassword(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = authService.generateToken(user);

    // Return user info + token (exclude password)
    const userObj = user.toObject();
    delete userObj.password;

    res.json({ user: userObj, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password in the list
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user by ID - If password update is requested, hash it before saving
export const updateUser = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // If password is included in update, hash it
    if (updateData.password) {
      if (updateData.password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
      }
      updateData.password = await authService.hashPassword(updateData.password);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!updatedUser) return res.status(404).json({ error: 'User not found' });

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete user by ID
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

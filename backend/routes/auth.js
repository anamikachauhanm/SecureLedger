const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { validateEmail, validatePassword, sanitizeInput } = require('../utils/validation');
const { verifyToken } = require('../middleware/auth');

// POST /api/auth/signup (FIX #1, #3, #7)
router.post('/signup', async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validate all fields present
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        error: 'All fields required: name, email, password, confirmPassword'
      });
    }

    // Validate email format
    try {
      validateEmail(email);
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }

    // Validate password strength
    try {
      validatePassword(password);
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }

    // Check passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: 'Passwords do not match'
      });
    }

    // Sanitize name
    const sanitizedName = sanitizeInput(name);

    // Check if email already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'Email already registered'
      });
    }

    // Create user
    const user = new User({
      name: sanitizedName,
      email: email.toLowerCase(),
      password: password
    });

    await user.save();

    const token = user.createToken();

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: user.toJSON()
    });

  } catch (error) {
    next(error);
  }
});

// POST /api/auth/login (FIX #2, #3, #7)
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password required'
      });
    }

    // Find user
    let user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    // Check if user exists and is active
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check if account is locked (FIX #2 - Account lockout after failed attempts)
    if (user.isLocked()) {
      return res.status(429).json({
        success: false,
        error: 'Account locked. Try again in 15 minutes.'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      // Increment login attempts
      await user.incLoginAttempts();
      
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Reset attempts on successful login
    if (user.loginAttempts > 0) {
      await user.resetLoginAttempts();
      user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const token = user.createToken();

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: user.toJSON()
    });

  } catch (error) {
    next(error);
  }
});

// GET /api/auth/me (FIX #3)
router.get('/me', verifyToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user: user.toJSON()
    });

  } catch (error) {
    next(error);
  }
});

// PATCH /api/auth/update-theme (FIX #3)
router.patch('/update-theme', verifyToken, async (req, res, next) => {
  try {
    const { theme } = req.body;

    if (!theme || !['light', 'dark'].includes(theme)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid theme'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { theme },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Theme updated',
      user: user.toJSON()
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { readDB } = require('../database');

// @desc    Auth user & get token (HR Admin or Employee)
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password, portal } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    let user = null;

    // Check MongoDB Mongoose
    try {
      user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    } catch (e) {
      user = null;
    }

    // Fallback DB if MongoDB not connected or unseeded
    if (!user) {
      const db = readDB();
      const fbUser = db.users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

      if (!fbUser) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      if (portal === 'hr' && fbUser.role !== 'HR') {
        return res.status(403).json({ success: false, message: 'Unauthorized. Executive HR Portal access required.' });
      }

      const token = generateToken(fbUser.id, fbUser.role, fbUser.empId, fbUser.name);

      return res.json({
        success: true,
        token,
        user: {
          id: fbUser.id,
          name: fbUser.name,
          email: fbUser.email,
          role: fbUser.role,
          empId: fbUser.empId,
          title: fbUser.title,
        },
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    if (portal === 'hr' && user.role !== 'HR') {
      return res.status(403).json({ success: false, message: 'Unauthorized. Executive HR Portal access required.' });
    }

    const token = generateToken(user._id, user.role, user.empId, user.name);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        empId: user.empId,
        title: user.title,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res, next) => {
  try {
    res.json({ success: true, user: req.user });
  } catch (error) {
    next(error);
  }
};

module.exports = { loginUser, getUserProfile };

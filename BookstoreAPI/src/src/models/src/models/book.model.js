const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const protect80 = async (req, res, next) => {
  try {
    let token80;

    // Check for token in headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token80 = req.headers.authorization.split(' ')[1];
    }

    // Make sure token exists
    if (!token80) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route',
      });
    }

    try {
      // Verify token
      const decoded80 = jwt.verify(token80, process.env.JWT_SECRET);

      // Find user by id
      req.user = await User.findById(decoded80.id);
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route',
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = { protect80 };
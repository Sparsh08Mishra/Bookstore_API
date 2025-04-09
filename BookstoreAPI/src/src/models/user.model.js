const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema80 = new mongoose.Schema({
  email80: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password80: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false,
  },
  createdAt80: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema80.pre('save', async function (next) {
  if (!this.isModified('password80')) {
    next();
  }
  
  const salt80 = await bcrypt.genSalt(10);
  this.password80 = await bcrypt.hash(this.password80, salt80);
});

// Method to check password
userSchema80.methods.matchPassword = async function (enteredPassword80) {
  return await bcrypt.compare(enteredPassword80, this.password80);
};

module.exports = mongoose.model('User', userSchema80);
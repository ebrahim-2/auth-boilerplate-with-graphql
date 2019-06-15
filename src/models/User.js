const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    unique: true,
    type: String
  },
  password: String,
  resetPasswordToken: {
    unique: true,
    type: String
  },
  resetPasswordTokenExpires: Date
});

const User = mongoose.model('User', userSchema);

module.exports = User;
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  salt: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', UserSchema);

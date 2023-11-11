// models/LoginHistory.js

const mongoose = require('mongoose');

const loginHistorySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  ipAddress: { type: String, required: true },
  browser: { type: String, required: true },
  system: { type: String, required: true },
  location: { type: String, required: true },
  loginTime: { type: Date, default: Date.now },
});

const LoginHistory = mongoose.model('LoginHistory', loginHistorySchema);

module.exports = LoginHistory;

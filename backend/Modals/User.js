const mongoose = require("mongoose");

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Followers: {
    type: Array,
  },
  Following: {
    type: Array,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  profilePhoto: {
    type: String,
  },
  bio: {
    type: String,
    required: false,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("User", User);

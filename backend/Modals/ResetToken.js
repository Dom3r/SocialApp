const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const ResetToken = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

ResetToken.pre("save", async function (decrypt) {
  const salt = await bcrypt.genSalt();
  if (this.isModified("token")) {
    const hash = await bcrypt.hash(this.token, salt);
    this.token = hash;
  }
  decrypt();
});

module.exports = mongoose.model("ResetToken", ResetToken);

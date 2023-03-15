const mongoose = require("mongoose");
const Message = new mongoose.Schema(
  {
    Chatusers: {
      type: Array,
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", Message);

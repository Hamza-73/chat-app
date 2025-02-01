const mongoose = require("mongoose");
const msgSchema = new mongoose.Schema(
  {
    msg: {
      type: String,
      required: true,
    },
    sender: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      socketId: {
        type: String,
        required: true,
      },
    },
    reciever: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      socketId: {
        type: String,
        required: true,
      },
    },
    replyMsg: {

    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Message", msgSchema);
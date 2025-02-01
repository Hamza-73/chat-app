const Message = require('../models/message.model.js');
const mongoose = require('mongoose');

module.exports.saveMsg = async (msg) => {
    // console.log('message ', msg);

    // Validate required fields
    if (!msg.reciever || !msg.reciever.id || !msg.reciever.name || !msg.reciever.email) {
        console.error('Receiver fields are missing in the message object');
        return { success: false, message: 'Receiver fields are required' };
    }

    try {
        const newMsg = new Message(msg);
        await newMsg.save(); // Use `await` to properly handle async operations
        return newMsg;
    } catch (error) {
        console.error("Error in saving message: ", error);
        return { success: false, message: "Internal Server Error" };
    }
};

module.exports.getMsg = async (req, res) => {
    const id = req.params.id; // ID from request parameters
    try {
        if (!id) {
            return res.status(400).send({ msg: "User ID is required." });
        }

        // Ensure the ID is converted properly to ObjectId
        const objectId = new mongoose.Types.ObjectId(id);

        // Query to find messages where the user is either sender or receiver
        const allMsg = await Message.find({
            $or: [
                { "sender.id": objectId },
                { "reciever.id": objectId }, // Fixed field name
            ],
        });

        // Return the found messages
        return res.status(200).send({
            data: allMsg,
            msg: "Messages retrieved successfully.",
        });
    } catch (error) {
        console.error("Error fetching messages:", error);
        return res.status(500).send({ msg: "Internal Server Error" });
    }
};


module.exports.delMsg = async (req, res) => {
    const id = req.params.id;
    try {
      if (!id) {
        return res.status(400).send({ msg: "User id required." });
      }
      console.log("id is ", id)
      const delMsg = await Message.findByIdAndDelete(id);
      return res.send({
        data: delMsg,
        msg: "delMsg",
      });
    } catch (error) {
        console.log("error deleting message ", error)
      res.status(500).send({ msg: "Internal Server Error" });
    }
  };
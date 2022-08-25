// me
const Message = require("../models/Message");

const messageController = {
  // [GET] /api/messages
  showAll: async (req, res) => {
    try {
      const messages = await Message.find({});

      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [GET] /api/messages/:conversationId
  getMessageWithConversationId: async (req, res) => {
    try {
      const messages = await Message.find({
        conversationId: req.params.conversationId,
      });

      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [GET] /api/messages
  create: async (req, res) => {
    try {
      const newMessage = new Message(req.body);
      const saved = await newMessage.save();

      res.status(200).json(saved);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = messageController;

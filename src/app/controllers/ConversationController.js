// me
const Conversation = require("../models/Conversation");

const conversationController = {
  // [GET] /api/conversations
  showAll: async (req, res) => {
    try {
      const conversations = await Conversation.find({});

      res.status(200).json(conversations);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [GET] /api/conversations/:userId
  getAConversationWithUserId: async (req, res) => {
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.userId] },
      });

      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [GET] /api/conversations/find/:firstUserId/:secondUserId
  findOnlineFriendChat: async (req, res) => {
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });

      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [POST] /api/conversations
  create: async (req, res) => {
    try {
      const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId], // id người gửi & nhận
      });
      const saved = await newConversation.save();

      res.status(200).json(saved);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = conversationController;

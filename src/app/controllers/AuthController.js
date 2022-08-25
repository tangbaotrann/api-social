// libs
const bcrypt = require("bcrypt");

// me
const User = require("../models/User");

// async - await
const authController = {
  // [GET] /api/auths
  showAll: async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [POST] /api/auths/register
  register: async (req, res) => {
    try {
      const formData = req.body;

      // generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(formData.password, salt);

      const newUser = new User({
        username: formData.username,
        email: formData.email,
        password: hashedPassword,
      });

      const user = await newUser.save();

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [POST] /api/auths/login
  login: async (req, res) => {
    try {
      // check email
      const user = await User.findOne({ email: req.body.email });
      !user && res.status(404).json("User not found!");

      // check password
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      !validPassword && res.status(400).json("Wrong password!");

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = authController;

// libs
const bcrypt = require("bcrypt");

// me
const User = require("../models/User");

const userController = {
  // [GET] /api/users
  showAll: async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [PUT] /api/users/id
  update: async (req, res) => {
    try {
      // ... || req.user.isAdmin
      if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
          try {
            // new password
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
          } catch (err) {
            res.status(500).json(err);
          }
        }

        try {
          const user = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
          });
          res.status(200).json("Account has been updated ...");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        return res.status(403).json("You can updated only your account!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [DELETE] /api/users/id
  delete: async (req, res) => {
    try {
      if (req.body.userId === req.params.id || req.body.isAdmin) {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted ...");
      } else {
        return res.status(403).json("You can deleted only your account!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [GET] /api/users?key=value
  findById: async (req, res) => {
    const userId = req.query.userId; // [GET] /api/users?userId=62ebfe6404145aad08a73cc0
    const username = req.query.username; // [GET] /api/users?username=nhuthao

    try {
      const user = userId
        ? await User.findById(userId)
        : await User.findOne({ username: username });

      // Hide password and updatedAt
      const { password, updatedAt, ...other } = user._doc;

      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [GET] /api/users/friends/userId
  getFriends: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const friends = await Promise.all(
        user.followings.map((friendId) => {
          return User.findById(friendId);
        })
      );
      let friendList = [];

      friends.map((friend) => {
        const { _id, username, profilePicture } = friend;
        friendList.push({ _id, username, profilePicture });
      });

      res.status(200).json(friendList);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [PUT] /api/users/id/follow
  follow: async (req, res) => {
    try {
      if (req.body.userId !== req.params.id) {
        const user = await User.findById(req.params.id);
        const userCurrent = await User.findById(req.body.userId);

        // check (nếu trong mảng followers chưa có người dùng đó thì nó sẽ push vào)
        if (!user.followers.includes(req.body.userId)) {
          await user.updateOne({ $push: { followers: req.body.userId } });
          await userCurrent.updateOne({
            $push: { followings: req.params.id },
          });

          res.status(200).json("User has been followed ...");
        } else {
          res.status(403).json("You already follow this user!");
        }
      } else {
        res.status(403).json("You can't follow yourself!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [PUT] /api/users/id/unfollow
  unfollow: async (req, res) => {
    try {
      if (req.body.userId !== req.params.id) {
        const user = await User.findById(req.params.id);
        const userCurrent = await User.findById(req.body.userId);

        // check
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await userCurrent.updateOne({ $pull: { followings: req.params.id } });

          res.status(200).json("User has been unfollow ...");
        } else {
          res.status(403).json("You don't follow this user!");
        }
      } else {
        res.status(403).json("You can't unfollow yourself!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;

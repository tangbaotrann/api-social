// me
const Post = require("../models/Post");
const User = require("../models/User");

const postController = {
  // [GET] /api/posts
  showAll: async (req, res) => {
    try {
      const posts = await Post.find({});
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [POST] /api/posts
  create: async (req, res) => {
    try {
      const newPost = new Post(req.body);
      const post = await newPost.save();

      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [PUT] /api/posts/id
  update: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      // check
      if (post.userId === req.body.userId) {
        await post.updateOne({ $set: req.body });

        res.status(200).json("The post has been updated ...");
      } else {
        res.status(403).json("You can update only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [DELETE] /api/posts/id
  delete: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      // check
      if (post.userId === req.body.userId) {
        await post.deleteOne();

        res.status(200).json("The post has been deleted ...");
      } else {
        res.json(403).json("You can delete only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [GET] /api/posts/id
  getAPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [PUT] /api/posts/id/like (liked or disliked)
  like: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      // check
      if (!post.liked.includes(req.body.userId)) {
        await post.updateOne({ $push: { liked: req.body.userId } });
        res.status(200).json("The post has been liked ...");
      } else {
        await post.updateOne({ $pull: { liked: req.body.userId } });
        res.status(200).json("The post has been disliked ...");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [GET] /api/posts/timeline/userId
  timeline: async (req, res) => {
    try {
      const userCurrent = await User.findById(req.params.userId); // get user
      const userPosts = await Post.find({ userId: userCurrent._id }); // get post
      const friendPosts = await Promise.all(
        // render all posts (của user đó && của người mà user đó followings)
        userCurrent.followings.map((friendId) => {
          return Post.find({ userId: friendId });
        })
      );

      res.status(200).json(userPosts.concat(...friendPosts));
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // [GET] /api/posts/profile/username
  getUserAllPost: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username });
      const posts = await Post.find({ userId: user._id });

      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = postController;

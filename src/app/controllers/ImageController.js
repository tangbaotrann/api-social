const Post = require("../models/Post");

class ImageController {
  show(req, res, next) {
    Post.findOne({ image: req.params.image })
      .then((result) => res.status(200).json(result))
      .catch((err) => {});
  }
}

module.exports = new ImageController();

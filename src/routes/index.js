// me controller
const messageRoute = require("./message");
const conversationRoute = require("./conversation");
const postRoute = require("./post");
const authRoute = require("./auth");
const userRoute = require("./user");
const imageRoute = require("./image");
const siteRoute = require("./site");

// route
function route(app) {
  // message (messenger page)
  app.use("/api/messages", messageRoute);

  // conversation (messenger page)
  app.use("/api/conversations", conversationRoute);

  // post
  app.use("/api/posts", postRoute);

  // auth
  app.use("/api/auths", authRoute);

  // user
  app.use("/api/users", userRoute);

  app.use("/images", imageRoute);

  // site
  app.use("/", siteRoute);
}

module.exports = route;

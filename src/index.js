// libs
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const multer = require("multer");
const { engine } = require("express-handlebars");

const route = require("./routes");

// me
const db = require("./config/db");

// .env
dotenv.config();

const app = express();
const port = process.env.PORT_URL;

// use (middleware)
app.use(
  express.urlencoded({
    extended: true, // Middleware --> Handle Form data with method POST (req.body)
  })
);
app.use(express.json()); // with javascript
app.use(morgan("combined"));
app.use(cors());
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
  })
);
app.use("/images", express.static(path.join(__dirname, "public/images")));
// handle uploading image
const storage = multer.diskStorage({
  // thư mục lưu vào
  destination: (req, file, cb) => {
    cb(null, "src/public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); //file.originalname
  },
});
const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully ...");
  } catch (err) {
    console.log(err);
  }
});

// Template engine (handlebars)
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// route init
route(app);

// connection to mongodb
db.connect();

app.listen(port, () => console.log(`Social app listening on port ${port}!`));

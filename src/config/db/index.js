const mongoose = require("mongoose");
const dotenv = require("dotenv");

// .env
dotenv.config();

// connection to mongodb
async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connection successfully ...");
  } catch (err) {
    console.log("Connection failure!!!");
  }
}

module.exports = { connect };

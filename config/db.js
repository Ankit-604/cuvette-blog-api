// Connection using mongoose

// getting-started.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

async function db() {
  await mongoose.connect(process.env.Mongo_Url);
}

module.exports = db;

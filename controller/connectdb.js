const mongoose = require("mongoose");
const ENV = require("dotenv").config();

const connect_db = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connect_db };

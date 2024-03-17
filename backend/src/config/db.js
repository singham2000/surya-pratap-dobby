const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Connection to MongoDB failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

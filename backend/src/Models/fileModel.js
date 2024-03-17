const mongoose = require("mongoose");
const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    trim: true,
  },
  userName: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("File", fileSchema);

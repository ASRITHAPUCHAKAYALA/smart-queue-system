const mongoose = require("mongoose");

const centerSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true, // 🔥 prevents duplicates
  },
  type: String,
});

module.exports = mongoose.model("Center", centerSchema);
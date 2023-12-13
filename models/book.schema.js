const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  title: {
    type: [String],
    required: true,
  },
  writer: {
    type: [[String]],
    required: true,
  },
  editor: {
    type: [[String]],
    required: true,
  },
  publisher: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("Book", bookSchema);

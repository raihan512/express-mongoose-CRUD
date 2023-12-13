const mongoose = require("mongoose");
const publishersSchema = new mongoose.Schema({
  publishersName: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("Publisher", publishersSchema);

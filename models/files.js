const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  location: {
    type: String,
    required: [true, "Location is required"],
  },
  originalName: {
    type: String,
    required: [true, "Original Name is Required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "User Id is required"],
  },
});

const fileModel = mongoose.model("files", fileSchema);

module.exports = fileModel;

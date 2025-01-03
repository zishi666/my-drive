//IMPORT DB OBJECT
const mongoose = require("mongoose");

//MAKE SCHEME
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: [3, "Username must be at least 3 character long"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: [13, "Password must be at least 13 character long"],
  },
});

//MAKE MODEL
const userModel = mongoose.model("user", userSchema);

//EXPORT MODEL
module.exports = userModel;

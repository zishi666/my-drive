const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB connected successfully...!"))
    .catch((err) => {
      console.log("Failed to connect DB", err);
    });
}

module.exports = connectToDB;

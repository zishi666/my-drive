if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const morgan = require("morgan");
const userRoutes = require("./routes/user.routes");
const connectToDB = require("./config/db");
connectToDB();

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/user", userRoutes);

app.listen(process.env.PORT || 3000);

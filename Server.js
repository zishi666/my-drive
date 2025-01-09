if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const morgan = require("morgan");
const userRoutes = require("./routes/user.routes");
const homeRoutes = require("./routes/home.routes");
const cookieParser = require("cookie-parser");
const connectToDB = require("./config/db");
connectToDB();

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/", homeRoutes);
app.use("/user", userRoutes);

app.listen(process.env.PORT || 3001);

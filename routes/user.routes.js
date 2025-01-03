const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");

const userRouter = express.Router();

// RENDER REGISTER FORM
userRouter.get("/register", (req, res) => {
  res.render("user/register");
});

// CREATE USER
userRouter.post(
  "/register",
  body("username").trim().isLength({ min: 5 }),
  body("email").trim().isEmail(),
  body("password").trim().isLength({ min: 13 }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data",
      });
    }

    console.log(req.body);
    const { username, email, password } = req.body;

    const userData = await User.create({
      username,
      email,
      password,
    });

    res.json({ message: "User created successfully", data: userData });
  }
);

module.exports = userRouter;

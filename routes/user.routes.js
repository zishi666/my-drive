const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    // DATA VALIDATION
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data",
      });
    }

    // PARSING DATA
    console.log(req.body);
    const { username, email, password } = req.body;

    // CHECK USER EXISTS
    const UserFound = await User.findOne({
      $or: [{ email }, { username }],
    });

    console.log("This is User abcsjgfjf ==> ", UserFound);

    if (UserFound) {
      // IF USER EXISTS
      res.status(400).json({ message: "User already exists" });
    } else {
      // CREATING USER
      const userData = await User.create({
        username,
        email,
        password: await bcrypt.hash(password, 10),
      });

      // SEND SUCCESS RESPONSE
      // res.status(200).json({ message: "User created successfully", data: userData });
      res.status(302).render("user/login");
    }
  }
);

// RENDER LOGIN FORM
userRouter.get("/login", (req, res) => {
  res.render("user/login");
});

// LOG USER IN
userRouter.post("/login", body("username").trim().isLength({ min: 5 }), body("password").trim().isLength({ min: 13 }), async (req, res) => {
  // DATA VALIDATION
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      messsage: "Invalid data",
    });
  }

  // REQ BODY DATA PARSING
  const { username, password } = req.body;

  // CHECK USER EXISTS
  const userData = await User.findOne({
    username,
  });

  // IF USER NOT EXISTS
  if (!userData) {
    return res.status(400).json({
      message: "Invalid username or password",
    });
  }

  //IF USER EXISTS
  const isPSWRDmatched = await bcrypt.compare(password, userData?.password);

  if (!isPSWRDmatched) {
    return res.status(400).json({
      message: "Invalid username or password",
    });
  } else {
    // CREATE TOKEN
    const token = jwt.sign(
      {
        userId: userData?._id,
        userName: userData?.username,
      },
      process.env.JWT_SECRET
    );

    //SEND TOKEN IN COOKIE
    res.cookie("token", token);
    res.send("User Logged In...!");
  }
});

module.exports = userRouter;

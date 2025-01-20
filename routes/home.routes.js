// REQUIRE EXPRESS
const express = require("express");
const upload = require("../config/multerConfig");
const fileModel = require("../models/files");
const Auth = require("./middleware/authentication");

// CREATE ROUTER OBJECT
const homeRoutes = express.Router();

// INITIAL HOME ROUTE
homeRoutes.get("/home", Auth, async (req, res) => {
  const userFiles = await fileModel.find({
    user: req.user?.userId,
  });
  // console.log(userFiles);
  res.render("home/home.ejs", {
    files: userFiles,
  });
});

// FILE UPLOAD
homeRoutes.post("/upload", Auth, upload.single("file"), async (req, res) => {
  if (req.file) {
    const newFile = await fileModel.create({
      location: req.file?.location,
      originalName: req.file?.originalname,
      user: req.user?.userId,
    });

    const userFiles = await fileModel.find({
      user: req.user?.userId,
    });

    res.render("home/home.ejs", {
      files: userFiles,
    });
  } else {
    res.status(400).send("File upload failed");
  }
});

// DOWNLOAD FILE
homeRoutes.get("/download/:location", Auth, async (req, res) => {
  const loggedInUser = req.user?.userId;
  const userFileLocation = req.params.location;

  const file = await fileModel.findOne({
    $and: [{ user: loggedInUser }, { location: userFileLocation }],
  });

  if (!file) {
    return res.status(401).json({
      message: "Unautherized",
    });
  }

  res.redirect(userFileLocation);
});

// EXPORT ROUTER
module.exports = homeRoutes;

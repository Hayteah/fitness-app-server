const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { isAuthenticated } = require("./../middleware/jwt.middleware.js");
const User = require("../models/User.model.js");

const fileUploader = require("../config/cloudinary.config.js");

router.get("/", isAuthenticated, (req, res) => {
  const userId = req.payload._id;
  User.findById(userId)
    .then((foundUser) => {
      console.log(foundUser);
      res.status(200).json({ user: foundUser });
    })
    .catch((error) => {
      console.log("Error response", error);
    });
});

router.put(
  "/",
  isAuthenticated,
  fileUploader.single("avatar"),
  (req, res, next) => {
    let { name, email, avatar } = req.body;
    const request = res.req;
    const user = request.payload;
    const userId = user._id;
    console.log(userId);
    console.log(name, email, avatar, "jjj", req.file);
    avatar = req.file ? req.file.path : undefined;
    User.findByIdAndUpdate(
      userId,
      { name, avatar: req.file.path, email },
      { new: true }
    )
      .then((profileUpdated) => {
        return res.json(profileUpdated);
      })
      .catch((error) => res.json(error));
  }
);

module.exports = router;

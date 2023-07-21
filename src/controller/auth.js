const express = require("express");
const router = express.Router();
const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//  JWT

// REGISTER AUTHENTICATION

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    });
    newUser.save({});
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
//  LOGIN AUTHENTICATION

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    // !user && res.status(500).json("invalid mail")

    const validate = await bcrypt.compare(req.body.password, user.password);
    if (!validate && !user) {
      return res.sendStatus(500).json("Invalid credential");
    }
    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const { password, ...others } = user._doc;
    // console.log(others);

    res.status(200).json({accessToken ,others});
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;

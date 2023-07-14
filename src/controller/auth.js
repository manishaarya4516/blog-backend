const express = require("express");
const router = express.Router();
const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const user = require("../model/userSchema");

// REGISTER

router.post("/reg", async (req, res) => {
  console.log("error occur");
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

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    !user && res.status(500).json("invalid mail")

    const validate= await bcrypt.compare(req.body.password, user.password);
    !validate && res.status(500).json("invalid mail");

    const{password, ...others} = user._doc;
    res.status(200).json (others);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

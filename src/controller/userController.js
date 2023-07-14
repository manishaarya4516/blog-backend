const express = require("express");
const router = express.Router();
const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");
// const bcrypt= require("bcrypt");

const JWT_SECRET = "mysecretkey";

function verifyToken(req, res, next) {
  const header = req.headers["authorization"];
  if (header) {
    const token = header.split(" ")[1];
    jwt.verify(token, "JWT_SECRET", (err, decode) => {
      if (err) {
        res.status(403).json("token is not valid");
      }
      req.decode = decode;

      next();
    });
  } else {
    res.status(401).json("you are not authenticate");
  }
}

router.post("/register", async (req, res) => {
  // const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  user
    .save({})

    .then(() => res.send("User created successfully"))

    .catch((err) => res.send(err));
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    // const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (user) {
      const accessToken = jwt.sign({ email: user.email }, JWT_SECRET, {
        expiresIn: "300s",
      });
      res.json({
        status: 200,
        message: "successful",
        accessToken,
      });
    }
    res.json("not exist");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../model/userSchema");
const Post = require("../model/post");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const verifyToken=require("../controller/token");

router.put("/:id",verifyToken, async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.sendStatus(500).json(err);
    }
  } else {
    res.sendStatus(401).json("You can update only your account!")
  }
});
// DELETE
router.delete("/:id",verifyToken, async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

//GET USER
router.get("/:id",verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});



// const JWT_SECRET = "mysecretkey";

// function verifyToken(req, res, next) {
//   const header = req.headers["authorization"];
//   if (header) {
//     const token = header.split(" ")[1];
//     jwt.verify(token, "JWT_SECRET", (err, decode) => {
//       if (err) {
//         res.status(403).json("token is not valid");
//       }
//       req.decode = decode;

//       next();
//     });
//   } else {
//     res.status(401).json("you are not authenticate");
//   }
// }

// router.post("/register", async (req, res) => {
//   const user = new User({
//     email: req.body.email,
//     username: req.body.username,
//     password: req.body.password,
//   });

//   user
//     .save({})

//     .then(() => res.send("User created successfully"))

//     .catch((err) => res.send(err));
// });

// router.post("/login", async (req, res) => {
//   try {
//     const user = await User.findOne({
//       email: req.body.email,
//       password: req.body.password,
//     });
//     if (user) {
//       const accessToken = jwt.sign({ email: user.email }, JWT_SECRET, {
//         expiresIn: "300s",
//       });
//       res.json({
//         status: 200,
//         message: "successful",
//         accessToken,
//       });
//     }
//     res.json("not exist");
//   } catch (err) {
//     console.log(err);
//   }
// });
//  UPDATE

module.exports = router;

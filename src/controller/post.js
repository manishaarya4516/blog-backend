
const express = require("express");
const router = express.Router();
const Post = require("../model/post");
const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");
const verifyToken=require("../token")


// CREATE POST
router.post("/:userId",verifyToken, async (req, res) => {
  // const userId = req.decode.userId;
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// UPDATE POST

router.put("/:id",verifyToken, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

// DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // console.log(post);
    if (post.username === req.body.username) {
        // console.log(post.username);
        try {
          await post.deleteOne();
          res.status(200).json("Post has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can delete only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

// GET POST

router.get("/:id", async (req, res) => {
  try {
    const user = Post.findById(req.params.id)
    console.log("get ");
    // const {password , ...others} = user._doc;
     res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });
// GET
  // router.get("/", async (req, res) => {
  //   const username = req.query.user;
  //   const catName = req.query.categories;
  //   try {
  //     let posts;
  //     if (username) {
  //       posts = await Post.find({ username });
  //     } else if (catName) {
  //       posts = await Post.find({
  //         categories: {
  //           $in: [catName],
  //         },
  //       });
  //     } else {
  //       posts = await Post.find();
  //     }
  //     res.status(200).json(posts);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // });


module.exports= router;

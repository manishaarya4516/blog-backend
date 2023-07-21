const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const verifyToken=require("../token")

const app = express();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  
  app.post("/api/upload",verifyToken, upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });

  module.exports=storage;
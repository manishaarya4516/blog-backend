const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();
function verifyToken(req, res, next) { 
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      // console.log(err);
      if (err) return res.status(403).json("Token is not valid!");
      req.userId = decode.userId;
      next();
    });
  } else {
    return res.status(401).json("you are not authenticated");
  }
}
module.exports = verifyToken;

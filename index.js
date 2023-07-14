const express = require("express");
const mongoose = require("mongoose");
const UserRoutes=require("./src/controller/userController");
const authRoutes = require("./src/controller/auth")
const cors=require('cors');
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors())
const port = 5002;


const db_url =
  "mongodb+srv://manish2020:manish2020@cluster0.jxgvuf9.mongodb.net/blog-backend";

mongoose
  .connect(db_url)
  .then(() => console.log("url connect success"))
  .catch((err) => console.log(err));


  app.use("/api/user",UserRoutes);
  app.use("/auth", authRoutes);
  
app.listen(port, () => {
  console.log(`server is up on  ${port}`);
});


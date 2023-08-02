const express = require("express");
const mongoose = require("mongoose");
const UserRoutes = require("./src/controller/userController");
const AuthRoutes = require("./src/controller/auth");
const PostRoutes = require("./src/controller/post");
const CategoryRoutes = require("./src/controller/category");
const cors = require("cors");
const dotenv = require("dotenv");

// MIDDLEWARE
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const port = 5002;

// DB CONFIGURE
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("url connect success"))
  .catch((err) => console.log(err));

app.use("/api/user", UserRoutes);
app.use("/auth", AuthRoutes);
app.use("/api/post", PostRoutes);
app.use("/category", CategoryRoutes);

app.listen(port, () => {
  console.log(`server is up on  ${port}`);
});

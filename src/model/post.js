const { timestamps } = require("mongodb");
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    // required: true,
  },
  username:{
    type:String,
    required:true
  },
  categories:{
    type:Array,
    required:false
  }
},{timestamps:true});

const Post = mongoose.model("post", PostSchema);

module.exports = Post;

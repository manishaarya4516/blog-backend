const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
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
    required: true,
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

const post = mongoose.model("post", postSchema);

module.exports = post;

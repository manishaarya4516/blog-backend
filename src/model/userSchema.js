const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
   
  },
  email: {
    type: String,
  
  },
  password: {
    type: String,
    required:true,
  },
  profilePic: {
    type:String,
    default: ""
  }
},{ timestamps: true });

const user = mongoose.model("user", userSchema);

module.exports = user;

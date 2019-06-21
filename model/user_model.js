var mongoose = require("mongoose");
var userschema = mongoose.Schema({
    username: Number,
    pwd: String,
    name: String,
    sex: String,
    roots: Number
  });

module.exports=mongoose.model('user', userschema);
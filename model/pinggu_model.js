var mongoose = require("mongoose");
var gujiachema=mongoose.Schema({
    carfrom:String,
    cartype:String,
    sptime:String,
    distance:Number,
    hadtru:String,
    carprice:Number,
    carlevel:String,
    username:Number,
    status:Number
  });
  module.exports=mongoose.model('pinggu',gujiachema);
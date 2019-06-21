var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
const cookieParser=require('cookie-parser')
const session = require('express-session');
const FileStore=require('session-file-store')(session);
router.use(cookieParser());

router.get('/', (req, res,next)=> {
    console.log("index中的session")
    console.log(req.session)
    if(req.session.username!="")
    res.render("index",{userinfo:req.session.username});
    else res.render("main")
});


// const FileStore=require('session-file-store')(session);
// router.use(cookieParser());
// var userschema = mongoose.Schema({
//   username: Number,
//   pwd: String,
//   name: String,
//   sex: String,
//   roots: Number
// });
// var flag="";
// var User = mongoose.model('user', userschema);
module.exports = router;
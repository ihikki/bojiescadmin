var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
const cookieParser=require('cookie-parser')
const session = require('express-session');
const FileStore=require('session-file-store')(session);
router.use(cookieParser());

var User =require("../model/user_model");
var Pinggu=require("../model/pinggu_model");
router.use(session({
    store:new FileStore(),
    cookie:{maxAge:20000,httpOnly: true},
    secret:"123",
    saveUninitialized:false,
    resave:false
}));
var flag="";

router.get('/', (req, res,next)=> {
    req.session.username=flag;
    if(req.session.username!=""){
        console.log("login中的session")
        console.log(req.session)
        res.render("index",{userinfo:req.session.username}); 
    }
    else{
    req.session.username="";
    res.render("main");
    }  
});
router.get('/login',(req,res)=>{
    var {username,pwd,callback}=req.query;
    console.log(username)
    User.findOne({ "username": username,"pwd":pwd}, function (err, data) {
        if(err)console.log(err);
        else if(data==null){
          console.log("登录失败1")
          res.send(`${callback}(0)`)
        }
        else if(data.roots==0){
            console.log("登录失败2")
        res.send(`${callback}(1)`)
        }
        else if(data.roots==1){
            console.log("登录成功")
          req.session.username=username;
          flag=username;
          res.send(`${callback}(2)`);
        }
      });
})
router.get('/loginout',(req,res)=>{
  flag="";
  console.log(req.session);
  req.session.destroy(function(err) {
      if(err) console.log(err)
     })
     res.redirect('/main');
})
router.get('/getgujia',(req,res)=>{
  var {searchid,callback}=req.query;
  console.log(searchid)
  if(searchid){
    Pinggu.find({username:1*searchid,status:{$in:[0,1,2]}},(err,pinggu)=>{
      if(err) throw err;
      console.log("查询结果")
      console.log(pinggu)
      res.send(`${callback}(${JSON.stringify(pinggu)})`)
  })
  }
  else{
    Pinggu.find({},(err,pinggu)=>{
      if(err) throw err;
      console.log("查询结果")
      console.log(pinggu)
      res.send(`${callback}(${JSON.stringify(pinggu)})`)
  })
  }
  
});

module.exports = router;

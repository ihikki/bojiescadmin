var express = require('express');
var router = express.Router();
var path=require('path');
var mongoose = require('mongoose');
const cookieParser=require('cookie-parser')
const session = require('express-session');
const FileStore=require('session-file-store')(session);
var Pinggu=require("../model/pinggu_model");

router.use(cookieParser());
router.get('/',(req,res)=>{
    var {s0,s1,s2,s3,s4,s5,s6,s7,s8,callback}=req.query;
    res.render('edit',{s0:s0,s1:s1,s2:s2,s3:s3,s4:s4,s5:s5,s6:s6,s7:s7,s8:s8});
 });
 router.get('/getprice',(req,res)=>{  
    var {price,username,carlevel,status,callback}=req.query;
    Pinggu.findOneAndUpdate({username:username,status:status},{carprice:price,carlevel:carlevel,status:1},(err,pinggu)=>{
        res.send(`${callback}("success")`)
    })
 })
 router.get('/deletechecked',(req,res)=>{
    var {username,carfrom,cartype,carlevel,status,sptime,distance,hadtru,carprice,callback}=req.query;
    Pinggu.findOneAndUpdate({username:username,carfrom:carfrom,cartype:cartype,carlevel:carlevel,status:status,sptime:sptime,distance:distance,hadtru:hadtru,carprice:carprice},{status:3},(err,pinggu)=>{
        res.send(`${callback}("success")`)
    })
})

module.exports = router;
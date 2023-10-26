var express = require('express');
var router = express.Router();

var jwt = require("jsonwebtoken");
const key = require('../authen/key.json');

const { career_listRequest } = require("../models/career_listRequest.js");

router.get('/',async function(req, res, next) {
  var token = req.cookies.token
  
  if (!token) {
    const report = await career_listRequest();     
    const post ={
      title: 'ประกาศรับสมัครงาน',
      content: '../pages/career-posted',
    }
    console.log(report)
    res.render('layouts/base-auth', { post: post,data: report});
	}

});

module.exports = router;

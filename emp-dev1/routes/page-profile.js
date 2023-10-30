var express = require('express');
var router = express.Router();

var jwt = require("jsonwebtoken");
const key = require('../authen/key.json');

const {emp_profile} = require('../models/emp_profile');

router.get('/',async function(req, res, next) {
  var token = req.cookies.token
  var usernameProfile = req.cookies.user
  var secret = JSON.stringify(key.key);
  
  if (!token) {
    const post ={
      title: 'โปรไฟล์',
      content: '../pages/page-error404',
    }
    res.render('layouts/base-auth', { post: post });
	}

  var payload
	try {
		payload = jwt.verify(token, secret)
    
    var userId = req.cookies.ID
    const profile ={id: userId}
    const emp = await emp_profile(profile)

    const post ={
      title: 'โปรไฟล์',
      content: '../pages/page-profile', //ejs file
      username: usernameProfile
    }
    res.render('layouts/base', { post: post, data: emp });
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
      const post ={
        title: 'โปรไฟล์',
        content: '../pages/page-error404',
        username: usernameProfile
      }
      res.render('layouts/base', { post: post });
		}
	}
  
});

module.exports = router;


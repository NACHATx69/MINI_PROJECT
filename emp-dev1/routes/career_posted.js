var express = require('express');
var router = express.Router();

var jwt = require("jsonwebtoken");
const key = require('../authen/key.json');

router.get('/', function(req, res, next) {
  var token = req.cookies.token
  var usernameProfile = req.cookies.user
  var secret = JSON.stringify(key.key);
  
  if (!token) {
		// return res.status(401).end()
    const post ={
      title: 'ประกาศรับสมัครงาน',
      content: '../pages/career-posted',
    }
    res.render('layouts/base-auth', { post: post });
	}

  var payload
	try {
		payload = jwt.verify(token, secret)
    const post ={
      title: 'ประกาศรับสมัครงาน',
      content: '../pages/career-posted',
      username: usernameProfile
    }
    // res.send(payload)
    res.render('layouts/base', { post: post });
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
      const post ={
        title: 'ประกาศรับสมัครงาน',
        content: '../pages/page-error404',
        username: usernameProfile
      }
      res.render('layouts/base', { post: post });
		}
	}
  
});

module.exports = router;

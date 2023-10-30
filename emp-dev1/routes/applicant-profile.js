var express = require('express');
var router = express.Router();

var jwt = require("jsonwebtoken");
const key = require('../authen/key.json');

const {applicant_profile} = require('../models/applicant_profile');

router.get('/',async function(req, res, next) {
  var token = req.cookies.token
  var usernameProfile = req.cookies.user
  var secret = JSON.stringify(key.key);
  
  if (!token) {
    const post ={
      title: 'ข้อมูลผู้สมัครงาน',
      content: '../pages/page-error404',
    }
    res.render('layouts/base-auth', { post: post });
	}

  var payload
	try {
		payload = jwt.verify(token, secret)

    const appl_ID = req.query.application;
    const applicant = { id: appl_ID };
    const data = await  applicant_profile(applicant);

    const post ={
      title: 'สมัครงาน',
      content: '../pages/applicant-profile',
      username: usernameProfile,
    }
    // res.send(data);
    res.render('layouts/base', { post: post, data: data });
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

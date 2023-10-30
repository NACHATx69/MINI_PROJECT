var express = require('express');
var router = express.Router();
const { career_add } = require("../models/career_add.js");

var jwt = require("jsonwebtoken");
const key = require('../authen/key.json');


router.post('/requestEmp', function(req, res, next) {
  var token = req.cookies.token
  var usernameProfile = req.cookies.user
  var secret = JSON.stringify(key.key);
  
  if (!token) {
		// return res.status(401).end()
    const post ={
      title: 'error',
      content: '../pages/page-error404',
    }
    res.render('layouts/base-auth', { post: post });
	}

  var payload
	try {
		payload = jwt.verify(token, secret)
    const payloadForm = req.body;
    const job = req.body.JOB.trim();
    const userData = JSON.stringify(payloadForm);
    const data = JSON.parse(userData);
    var usernameID = req.cookies.ID

    const applicant = {
      REQ_LIST_ID: data.REQ_LIST_ID,
      SKILL_EX1: data.SKILL_EX1,
      SKILL_EX2: data.SKILL_EX2,
      SKILL_EX3: data.SKILL_EX3,
      SALARY: data.SALARY,
      DETAIL: data.DETAIL,
      STUDY: data.EDUCATION,
      STATUS: '0',
      EXP: data.EXPERIENCE,
      JOB: data.JOB,
      JOB_POSITTION: data.JOB_POSITTION,
      REQ_BY:usernameID
    };
  
    console.log(applicant);
  
    career_add(applicant)
    .then(result => {
      // res.send(applicant)
      res.redirect(`/createJobDescription?create=success&id=${applicant.REQ_LIST_ID}&JOB=${job}`);
    })
    .catch(error => {
      console.error('Error inserting data:', error);
      res.redirect(`/createJobDescription?create=fail&JOB=${job}`);
      
    });
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
      const post ={
        title: 'Register',
        content: '../pages/register',
        username: usernameProfile
      }
      res.render('layouts/base', { post: post });
		}
	}
});

module.exports = router;
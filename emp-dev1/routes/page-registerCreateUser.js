const { json } = require('body-parser');
var express = require('express');
var router = express.Router();
const { creatUser } = require("../models/addUser.js");

var jwt = require("jsonwebtoken");
const key = require('../authen/key.json');


router.post('/welcome', function(req, res, next) {
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
    const userData = JSON.stringify(payloadForm);
    const data = JSON.parse(userData);

    const post ={
      title: 'บอร์ประกาศ',
      content: '../pages/board_post',
      username: usernameProfile
    }

    const newEmployeeData = {
      EMP_ID: data.EMP_ID,
      FNAME: data.FNAME,
      LNAME: data.LNAME,
      DEPARTMENT: data.DEPARTMENT,
      POSITIONS: data.POSITIONS,
      // PERMISTION: data.PERMISTION,
      MGR_ID: data.MGR_ID,
      PASS: data.PASS,
      HIREDATE: new Date(data.HIREDATE),
    };
  
    console.log(newEmployeeData);
  
    creatUser(newEmployeeData)
    .then(result => {
      console.log('Data inserted successfully:', result);
      res.redirect('/register?create=success');
    })
    .catch(error => {
      console.error('Error inserting data:', error);
      res.redirect('/register?create=fail');
      console.log(newEmployeeData);
      
    });
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
      const post ={
        title: 'Register',
        content: '../pages/register',
        username: usernameProfile
      }
      res.render('layouts/base', { post: post });
      // return res.json({ error: 'invalid token' })
			// return res.status(401).end()
		}
	}
});

module.exports = router;

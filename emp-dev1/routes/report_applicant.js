var express = require('express');
var router = express.Router();
const { getAllApplicant } = require("../models/detail_applicant");

var jwt = require("jsonwebtoken");
const key = require('../authen/key.json');

router.get('/',async function(req, res, next) {
  var token = req.cookies.token
  var usernameProfile = req.cookies.user
  var secret = JSON.stringify(key.key);

  if (!token) {
    const post ={
      content: '../pages/page-error404',
    }
    res.render('layouts/base-auth', { post: post });
	}

  var payload
  try {
    payload = jwt.verify(token, secret)

    const sql =await getAllApplicant();
    if (sql === 'error') {
      const post ={
        title: 'ผู้สมัครงาน',
        content: '../pages/page-error404',
        username: usernameProfile,
        error: 'database connection error'
      }
      res.render('layouts/base', { post: post });
    }
      
    const post ={
      title: 'พนักงาน',
      content: '../pages/report_applicant',
      username: usernameProfile,
      sql: sql
    }
    res.render('layouts/base', { post: post });

  }catch{
    if (e instanceof jwt.JsonWebTokenError) {
      const post ={
        title: 'ผู้สมัครงาน',
        content: '../pages/page-error404',
        username: usernameProfile
      }
      res.render('layouts/base', { post: post });
    }
  }
});




// router.get('/',async function(req, res, next) {
//   var token = req.cookies.token
//   var usernameProfile = req.cookies.user
//   var secret = JSON.stringify(key.key);
  
//   const sql = getAllApplicant();
//   const sql_data = JSON.stringify(sql);
//   const data = JSON.parse(sql_data);

// if (!token) {
//   const post ={
//     content: '../pages/page-error404',
//   }
//   res.render('layouts/base-auth', { post: post });
// }

//   var payload
// 	try {
// 		payload = jwt.verify(token, secret)

//     const post ={
//       title: 'ผู้สมัครงาน',
//       content: '../pages/report_applicant', 
//       username: usernameProfile,
//       sql: data
//     }
//     // res.send(payload)
//     res.render('layouts/base', { post: post });
// 	} catch (e) {
// 		if (e instanceof jwt.JsonWebTokenError) {
//       const post ={
//         title: 'ผู้สมัครงาน',
//         content: '../pages/page-error404',
//         username: usernameProfile
//       }
//       res.render('layouts/base', { post: post });
//       // return res.json({ error: 'invalid token' })
// 			// return res.status(401).end()
// 		}
// 	}
  
// });

module.exports = router;


var express = require('express');
var router = express.Router();
const { getEMPLOYEE } = require("../models/mange_employee.js");
const { updatePosition } = require("../models/mange_permission.js");

var jwt = require("jsonwebtoken");
const key = require('../authen/key.json');

router.get('/',async function(req, res, next) {
  var token = req.cookies.token
  var usernameProfile = req.cookies.user
  var secret = JSON.stringify(key.key);
  
  if (!token) {
		// return res.status(401).end()
    const post ={
      title: 'จัดการข้อมูลพนักงาน',
      content: '../pages/page-error404',
    }
    res.render('layouts/base-auth', { post: post });
	}

  var payload
	try {
		payload = jwt.verify(token, secret)

    try {
      const employeeData = await getEMPLOYEE(); 
  
          const post ={
            title: 'จัดการข้อมูลพนักงาน',
            content: '../pages/mange_employee',
            username: usernameProfile
          }
          console.log("getEMPLOYEE" , employeeData)
        res.render('layouts/base',{post:post,data:employeeData});
    } catch (error) {
      console.error("mange_employee error: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
      const post ={
        title: 'จัดการข้อมูลพนักงาน',
        content: '../pages/page-error404',
        username: usernameProfile
      }
      res.render('layouts/base', { post: post });
		}
	}
  
});


router.post("/", async function (req, res, next) {
  try {
    console.log(req.body)
    const position = req.body.ID_POS.trim();
    const createReq = req.body.CREATE_REQ === 'on' ? 1 : 0;
    const approveCreateReq = req.body.APPROVE_CREATE_REQ === 'on' ? 1 : 0;
    const postReq = req.body.POST_REQ === 'on' ? 1 : 0;
    const applSelect = req.body.APPL_SELECT === 'on' ? 1 : 0;
    const sumReport = req.body.SUM_REPORT === 'on' ? 1 : 0;
    const managePer = req.body.MANAGE_PER === 'on' ? 1 : 0;
    console.log(position, createReq, approveCreateReq, postReq, applSelect, sumReport, managePer)
    await updatePosition(position, createReq, approveCreateReq, postReq, applSelect, sumReport, managePer);
    const employeeData = await getEMPLOYEE(); 

    const post ={
      title: 'จัดการข้อมูลพนักงาน',
      content: '../pages/mange_employee',
    
    }

    res.render('layouts/base',{post:post,data:employeeData});

  } catch (error) {
    console.error("mange_employee error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;




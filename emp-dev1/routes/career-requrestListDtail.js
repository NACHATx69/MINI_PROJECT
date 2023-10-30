var express = require('express');
var router = express.Router();

var jwt = require("jsonwebtoken");
const key = require('../authen/key.json');

const { career_findCodeViewDetail } = require('../models/career_findCodeViewDetail')
const { emp_profile } = require("../models/emp_profile.js");
const { career_approve } = require("../models/career_approve.js");
const accSum = require('add');


router.get('/',async function(req, res, next) {
  var token = req.cookies.token
  var usernameProfile = req.cookies.user
  var secret = JSON.stringify(key.key);
  
  if (!token) {
		const code = req.query.application;
    const application = { id: code };
    const select = await career_findCodeViewDetail(application);
    
    const post ={
      title: 'ประกาศรับสมัครงาน',
      content: '../pages/career-requrestListDetail',
      application:code,
      REQ_LIST_ID:select[0].REQ_LIST_ID,
      DETAIL:select[0].DETAIL,
      SALARY:select[0].SALARY,
      EXP:select[0].EXP,
      POS_NAME:select[0].POS_NAME,
      SKILL_NAME:select[0].SKILL_NAME,
      STUDY:select[0].STUDY,
      STATUS:select[0].STATUS,
      DEPT_NAME:select[0].DEPT_NAME,
      username: usernameProfile,
    }
    res.render('layouts/base', { post: post });
	}

  var payload
	try {
		payload = jwt.verify(token, secret)

    const code = req.query.application;
    const application = { id: code };
    const select = await career_findCodeViewDetail(application);
    
    var userId = req.cookies.ID
    const profile ={id: userId}
    const emp = await emp_profile(profile)
    const userData = JSON.stringify(emp);
    const data = JSON.parse(userData);

    const mgr = req.query.MGR_ID

    const post ={
      title: 'ประกาศรับสมัครงาน',
      content: '../pages/career-requrestListDetail',
      application:code,
      REQ_LIST_ID:select[0].REQ_LIST_ID,
      DETAIL:select[0].DETAIL,
      SALARY:select[0].SALARY,
      EXP:select[0].EXP,
      POS_NAME:select[0].POS_NAME,
      SKILL_NAME:select[0].SKILL_NAME,
      STUDY:select[0].STUDY,
      STATUS:select[0].STATUS,
      DEPT_NAME:select[0].DEPT_NAME,
      username: usernameProfile,
      approverBy: mgr,
      profileMgr:data[0].MGR_ID
    }
    
    // res.send(post);
    res.render('layouts/base', { post: post});
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

router.post('/',async function(req, res, next) {
  var token = req.cookies.token
  var usernameProfile = req.cookies.user
  var secret = JSON.stringify(key.key);
  
  if (!token) {
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

    const req_id = data.req_id;
    const mgr_id = data.MGR_ID;
    const status = data.approve;
    
    const approve = {
      status: data.approve,
      cemment_approve: data.commentText, 
      req_id: data.req_id,
    };

    try {
      await career_approve(approve)
      res.redirect(`/career_request-dtail?application=${req_id}&MGR_ID=${mgr_id}&status=${status}&create=success`);
    } catch (error) {
      console.error('Error inserting data:', error);
      // res.redirect(`/career_request-dtail?application=${data[0].application}&MGR_ID=${data[0].MGR_ID}&create=fail`);
    }
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
      const post ={
        content: '../pages/register',
        username: usernameProfile
      }
      res.render('layouts/base', { post: post });
		}
	}
});

module.exports = router;


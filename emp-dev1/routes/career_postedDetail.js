var express = require('express');
var router = express.Router();

var jwt = require("jsonwebtoken");
const key = require('../authen/key.json');

const { career_findCodeViewDetail } = require('../models/career_findCodeViewDetail')

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
      content: '../pages/career_postedDetail',
      application:code,
      REQ_LIST_ID:select[0].REQ_LIST_ID,
      DETAIL:select[0].DETAIL,
      SALARY:select[0].SALARY,
      EXP:select[0].EXP,
      POS_NAME:select[0].POS_NAME,
      POS_ID:select[0].POS_ID,
      SKILL_NAME:select[0].SKILL_NAME,
      STUDY:select[0].STUDY,
      STATUS:select[0].STATUS,
      DEPT_NAME:select[0].DEPT_NAME,
      DEPT_ID:select[0].DEPT_ID,
      username: usernameProfile
    }
    res.render('layouts/base-auth', { post: post });
	}

  var payload
	try {
		payload = jwt.verify(token, secret)

    const code = req.query.application;
    const application = { id: code };
    const select = await career_findCodeViewDetail(application);
    
    const post ={
      title: 'ประกาศรับสมัครงาน',
      content: '../pages/career_postedDetail',
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
    
    // res.send(post);
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


var express = require('express');
var router = express.Router();
const { getPosittion } = require("../models/posittion.js");
const { mgr_name } = require("../models/dept_mgr.js");
const { skill } = require("../models/data_skill.js");
const { study } = require("../models/data_study.js");
const { genIDapp } = require("../models/idForApplication.js");

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

    try {
      const sql_pos = await  getPosittion();
      const jsonData_pos = JSON.stringify(sql_pos);
      const dataPossition = JSON.parse(jsonData_pos);
      
      const sql_dept = await  mgr_name();
      const jsonData_dept = JSON.stringify(sql_dept);
      const dataDept = JSON.parse(jsonData_dept);

      const sql_skill = await  skill();
      const jsonData_skill = JSON.stringify(sql_skill);
      const dataSkill = JSON.parse(jsonData_skill);

      const sql_study = await  study();
      const jsonData_study = JSON.stringify(sql_study);
      const dataStudy = JSON.parse(jsonData_study);

      const ID_app = await genIDapp();

      const createParam = req.query.create;

      const post ={
        title: 'สร้างประกาศรับสมัครงาน',
        content: '../pages/career-createPost',
        posittion: dataPossition,
        dept: dataDept,
        skill: dataSkill,
        study: dataStudy,
        create: createParam,
        genIDapp: ID_app
      }
      console.log('id',ID_app);
      res.render('layouts/base', { post: post });
      } catch (error) {
        console.error("register error: ", error);
        res.status(500).json({ error: "EJS Error" });
      }
    // res.send(payload)
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
var express = require('express');
var router = express.Router();
const { getPosittion } = require("../models/posittion.js");
const { getRole } = require("../models/POS_PER.js");
const { countUser } = require("../models/countUser.js");
const { mgr_name } = require("../models/dept_mgr.js");

var jwt = require("jsonwebtoken");
const key = require('../authen/key.json');

/* GET home page. */
router.get("/", async function (req, res, next) {
  var token = req.cookies.token
  var usernameProfile = req.cookies.user
  var secret = JSON.stringify(key.key);

  if (!token) {
		// return res.status(401).end()
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

      const sql_role = await  getRole();
      const jsonData_role = JSON.stringify(sql_role);
      const dataRole = JSON.parse(jsonData_role);

      const sql_mgr = await  mgr_name();
      const jsonData_mgr = JSON.stringify(sql_mgr);
      const dataMgr = JSON.parse(jsonData_mgr);

      const userCount = await countUser();

      const createParam = req.query.create;

      const post ={
        title: 'สร้างบัญชีผู้ใช้',
        content: '../pages/page-register',
        posittion: dataPossition,
        role: dataRole,
        empID: userCount,
        mgr: sql_mgr,
        create: createParam,
        username: usernameProfile
      }
      res.render('layouts/base',{post:post});
    } catch (error) {
      console.error("register error: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
      const post ={
        title: 'ไม่สามารถเข้าสู่ระบบได้',
        content: '../pages/page-error404',
        username: usernameProfile
      }
      res.render('layouts/base', { post: post });
      // return res.json({ error: 'invalid token' })
			// return res.status(401).end()
		}
	}

});

module.exports = router;

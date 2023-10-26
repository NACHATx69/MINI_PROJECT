var express = require("express");
var router = express.Router();

var jwt = require("jsonwebtoken");
const key = require("../authen/key.json");
const { getinterview } = require("../models/select_interview");
router.get("/", async function (req, res, next) {
  var token = req.cookies.token;
  var usernameProfile = req.cookies.user;
  var usernameID = req.cookies.ID;
  var secret = JSON.stringify(key.key);

  if (!token) {
    // return res.status(401).end()
    const post = {
      content: "../pages/page-error404",
    };
    res.render("layouts/base-auth", { post: post });
  }

  var payload;
  try {
    payload = jwt.verify(token, secret);
    const inter_id = { EMP_ID: usernameID };

    const sql = await getinterview(inter_id);
    const sql_data = JSON.stringify(sql);
    const data = JSON.parse(sql_data);

    const post = {
      title: "บอร์ประกาศ",
      content: "../pages/applicant-interviewList",
      username: usernameProfile,
      detail: data,
      emp_id: inter_id.EMP_ID,
    };
    // res.send(payload)
    res.render("layouts/base", { post: post });
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      const post = {
        title: "รายชื่อผู้สมัครงาน",
        content: "../pages/page-error404",
        username: usernameProfile,
      };
      res.render("layouts/base", { post: post });
      // return res.json({ error: 'invalid token' })
      // return res.status(401).end()
    }
  }
});

module.exports = router;

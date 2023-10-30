var express = require("express");
var router = express.Router();

var jwt = require("jsonwebtoken");
const key = require("../authen/key.json");

const { career_listRequest } = require("../models/career_listRequest.js");

router.get("/", async function (req, res, next) {
  var token = req.cookies.token;
  var usernameProfile = req.cookies.user;
  var usernameID = req.cookies.ID;
  var secret = JSON.stringify(key.key);

  if (!token) {
    // return res.status(401).end()
    const post = {
      title: "ตำแหน่งที่สเปิดรับสมัคร",
      content: "../pages/page-error404",
    };
    res.render("layouts/base-auth", { post: post });
  }

  var payload;
  try {
    payload = jwt.verify(token, secret);

    const report = await career_listRequest();     
    const post ={
      title: 'ตำแหน่งที่สเปิดรับสมัคร',
      content: '../pages/career-posted',
    }
    console.log(report)
    res.render('layouts/base', { post: post,data: report});
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      const post = {
        title: "ตำแหน่งที่สเปิดรับสมัคร",
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

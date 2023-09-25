var express = require("express");
var router = express.Router();
const { getLoginData } = require("../models/sql_login_user");
/* GET home page. */
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const post = {
    title: "บอร์ประกาศ",
    content: "../pages/login",
  };
  res.render("layouts/base", { post: post });
});
module.exports = router;

router.post("/", (req, res) => {
  let user = req.body["username"];
  let pass = req.body["password"];
  let result = "not found";
  if (user == "admin" && pass == "1234") {
    result = "Success";
  } else {
    res.end("Found");
  }
  res.render("loginResult", { result: result });
});

var express = require("express");
var router = express.Router();
router.get("/", function (req, res, next) {
  const post = {
    title: "สัมภาษณ์",
    content: "../pages/pages-interview",
  };
  res.render("layouts/base", { post: post });
});

module.exports = router;

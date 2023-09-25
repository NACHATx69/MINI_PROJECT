var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const post ={
    title: 'โปรไฟล์',
    content: '../pages/profile'
  }
res.render('layouts/base',{post:post});
});

module.exports = router;

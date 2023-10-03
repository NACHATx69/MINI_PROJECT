var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  const post ={
    title: 'ประกาศรับสมัครงาน',
    content: '../pages/career'
  }
res.render('layouts/base',{post:post});
});

module.exports = router;

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  const post ={
    title: 'ประกาศรับสมัครงาน',
    content: '../pages/detail_job'
  }
res.render('layouts/base',{post:post});
});

module.exports = router;

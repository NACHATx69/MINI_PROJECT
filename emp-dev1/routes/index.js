var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  const post ={
    title: 'บอร์ประกาศ',
    content: '../pages/board_post'
  }
res.render('layouts/base',{post:post});
});

module.exports = router;

59
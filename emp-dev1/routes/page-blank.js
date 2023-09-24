var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const post ={
    title: 'หน้าว่าง',
    content: '../pages/pages-blank'
  }
res.render('layouts/base',{post:post});
});

module.exports = router;

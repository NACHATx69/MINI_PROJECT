var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const post ={
    title: 'ข้อมูลติดต่อ',
    content: '../pages/pages-contact'
  }
res.render('layouts/base',{post:post});
});

module.exports = router;

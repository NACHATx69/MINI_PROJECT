var express = require('express');
var router = express.Router();

/* GET home . */ 
router.get('/', function(req, res, next) {
  const post ={
    title: 'Login',
    content: '../pages/page-login'
  }
res.render('layouts/base-login',{post:post});
});

module.exports = router;

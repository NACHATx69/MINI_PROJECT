var express = require('express');
var router = express.Router();

/* GET home . */ 
router.get('/', function(req, res, next) {
  const post ={
    title: 'Login',
    content: '../pages/login'
  }
res.render('layouts/base',{post:post});
});

module.exports = router;

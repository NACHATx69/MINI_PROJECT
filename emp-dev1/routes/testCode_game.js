var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const post ={
    title: 'Register',
    content: '../pages/login_game'
  }
res.render('layouts/base',{post:post});
});

module.exports = router;

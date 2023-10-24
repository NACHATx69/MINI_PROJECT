var express = require('express');
var router = express.Router();

/* GET home . */ 
router.get('/', function(req, res, next) {
  const authen = req.query.authen;
  const user = req.query.user;

  const post ={
    title: 'Login',
    content: '../pages/page-login',
    authen: authen,
    user: user
  }
res.render('layouts/base-login',{post:post});
});

module.exports = router;

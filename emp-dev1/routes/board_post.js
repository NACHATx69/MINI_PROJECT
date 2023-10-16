var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
const HandyStorage = require('handy-storage');
const key = require('../authen/key.json');

const storage = new HandyStorage({
  beautify: true,
});

storage.connect('./information.json');

router.get('/', function(req, res, next) {
  var secret = JSON.stringify(key.key);
  var token = storage.token;

  const post ={
    title: 'บอร์ประกาศ',
    content: '../pages/board_post'
  }

  res.render('layouts/base', { post: post });

  

  
});

module.exports = router;

59
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.cookie('token', '', { maxAge: 0 })
    res.cookie('POSITION', '', { maxAge: 0 })
    res.cookie('ID', '', { maxAge: 0 })
    res.cookie('user', '', { maxAge: 0 })
    res.cookie('PHPSESSID', '', { maxAge: 0 })
    res.redirect('/login');
});

module.exports = router;

var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')
const { login } = require("../models/login");
var jwt = require("jsonwebtoken");
const HandyStorage = require('handy-storage');
const key = require('../authen/key.json')

const storage = new HandyStorage({
    beautify: true,
});

storage.connect('./information.json');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', urlencodedParser, function(req, res, next) {
    var user = req.body.username;
    var pass = req.body.password;
    var secret = JSON.stringify(key.key)
    
    login(user,pass )
    .then((data) => {
        if (data.length > 0) {
            const userData = JSON.stringify(data);
            const userAcc = JSON.parse(userData);
            const token = jwt.sign({ user: user }, secret, { expiresIn: '3h' });
            
            
            
            storage.setState({
                token: token,
                account: userAcc
            });
            storage.save();
            // res.send('authen: success');
            res.redirect('/');
        }else {
            res.send('login: failed');
        }
    }).catch((error) => {
          console.error('Error:', error);
          return
    });
});

// console.log(JSON.stringify(key.key))
// console.log('storage '+JSON.stringify(storage.state));
module.exports = router;

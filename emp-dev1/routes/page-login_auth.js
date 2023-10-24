var express = require('express');
var router = express.Router();

var jwt = require("jsonwebtoken");
var crypto = require('crypto');
const key = require('../authen/key.json')

const fs = require('fs');
const { login } = require("../models/login");

router.post('/',async  function(req, res, next) {
    var user = req.body.username;
    var pass = req.body.password;
    var secret = JSON.stringify(key.key)
      
    
    login(user,pass )
    .then((data) => {
        if (data.length > 0) {
            const userData = JSON.stringify(data);
            const userAcc = JSON.parse(userData);
            token = jwt.sign({ user }, secret, { expiresIn: '3h' })
            const userEmp = userAcc[0].FNAME

            // res.send('authen: success');
            res.cookie("token", token),
            res.cookie('user',userAcc[0].FNAME),
            res.cookie('ID',userAcc[0].EMP_ID),
            res.cookie('POSITION',userAcc[0].POSITIONS),
            
            res.redirect(`/?${userEmp}`);
            // res.json({
            //                   login: true,
            //                   token: token,
            //                   secret:userEmp,
            //               });
        }else {

            res.redirect(`/login?authen=failed&user=${user}`);
        }
    }).catch((error) => {
          console.error('Error:', error);
          return
    });

});

// console.log(JSON.stringify(key.key))
// console.log('storage '+JSON.stringify(storage.state));
module.exports = router;

const { json } = require('body-parser');
var express = require('express');
var router = express.Router();
const { creatUser } = require("../models/addUser.js");


/* GET home page. */
router.post('/welcome', function(req, res, next) {
  
  const payload = req.body;
  const userData = JSON.stringify(payload);
  const data = JSON.parse(userData);

  const post ={
    title: 'Register',
    content: '../pages/register',
    data: userData
  }

  const newEmployeeData = {
    EMP_ID: data.EMP_ID,
    FNAME: data.FNAME,
    LNAME: data.LNAME,
    DEPARTMENT: data.DEPARTMENT,
    POSITIONS: data.POSITIONS,
    // PERMISTION: data.PERMISTION,
    MGR_ID: data.MGR_ID,
    PASS: data.PASS,
    HIREDATE: new Date(data.HIREDATE),
  };

  console.log(newEmployeeData);

  creatUser(newEmployeeData)
  .then(result => {
    console.log('Data inserted successfully:', result);
    res.redirect('/register?create=success');
  })
  .catch(error => {
    console.error('Error inserting data:', error);
    res.redirect('/register?create=fail');
    console.log(newEmployeeData);
    
  });

  
});

module.exports = router;

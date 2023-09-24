var express = require('express');
const { getUserData } = require('../models/sql_all_user');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  try{
      const data = await getUserData();
      const emp = JSON.stringify(data);
      const empObject = JSON.parse(emp);
      const post ={
        title: 'หน้าว่าง',
        content: '../pages/pages-blank',
        sql: empObject
      }
      res.render('layouts/base',{post:post});
  }catch(error){
    console.error('Error fetching table EMP',error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

module.exports = router;

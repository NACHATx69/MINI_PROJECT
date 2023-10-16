var express = require('express');
var router = express.Router();
const { getAllApplicant } = require("../models/detail_applicant");

router.get('/',async function(req, res, next) {
  try {
    const sql = await getAllApplicant();
    const sql_data = JSON.stringify(sql);
    const data = JSON.parse(sql_data);

    const post ={
      title: 'ผู้สมัครงาน',
      content: '../pages/detail_applicant', //ejs file
      sql: data
    }
    res.render('layouts/base',{post:post});
  }catch{
    const post ={
      title: 'ผู้สมัครงาน',
      content: '../pages/detail_applicant',
      error: 'ไม่สามารถติดต่อฐายข้อมูลได้ฐานข้อมูล'
    }
    res.render('layouts/base',{post:post});
    return
    
  }
  
});

module.exports = router;


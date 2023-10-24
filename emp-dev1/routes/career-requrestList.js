var express = require('express');
var router = express.Router();

var jwt = require("jsonwebtoken");
const key = require('../authen/key.json');

// --------------------------นำเข้าโมเดล
const { career_listRequest } = require("../models/career_listRequest.js");

//---------------------------เริ่มทำงานเราท์
router.get('/',async function(req, res, next) {
  var token = req.cookies.token                                   //นำเข้าโทเค็นจากคุกกี้
  var usernameProfile = req.cookies.user                          //นำเข้าชื่อผู้ใช้จากคุกกี้
  var secret = JSON.stringify(key.key);                           //นำเข้ารหัสเผื่อเข้ารหัส
  
  if (!token) {                                                   //เช็คว่ามีโทเค็นหรือไม่ ถ้าไม่มีเข้าใช้งานไม่ได้
    const post ={
      title: 'คำร้องขอกำลังคน',
      content: '../pages/page-error404',
    }
    res.render('layouts/base-auth', { post: post });
	}

  var payload                                                      //นำเข้าข้อมูลจากฟอร์มทั้งหมด
	try {
		payload = jwt.verify(token, secret)
// ------------------------------------------------------------------------------------------------------------------
// หลักเราจะเเก้ไขโค้ดที่ส่วนนี้
    try {
      const report = await career_listRequest();                   //เรียกข้อมูลจาก Oracle โดยใช้ฟังก์ชันโมเดลที่สร้างไว้ สร้างตัวแปรที่เก็บชื่อว่ารีพอต
          const post ={                                            //เก็บค่าที่นำเข้าไว้ในตัวแปร post เผื่อไปใช้ใน EJS
            title: 'คำร้องขอกำลังคน',
            content: '../pages/career-requrestList',
            username: usernameProfile
          }
        res.render('layouts/base',{post:post,data: report});      //เรียกใช้งาน EJS นำตัวแปร report ไส่ไว่ใน data 
//-------------------------------------------------------------------------------------------------------------------
    } catch (error) {                                             //แสดงข้อผิดพลาดเมื่อเกิดเออเร่อ สังเกตุที่EJS หรือโมดูล
      console.error("คำร้องขอกำลังคน: ", error);
      res.status(500).json({ error: "Internal Server Error EJS" });
    }
	} catch (e) {                                                   //เช็คว่ามีโทเค็นมีปัญหาหรือไม่
		if (e instanceof jwt.JsonWebTokenError) {
      const post ={
        title: 'คำร้องขอกำลังคน',
        content: '../pages/page-error404',
        username: usernameProfile
      }
      res.render('layouts/base', { post: post });
		}
	}
  
});


module.exports = router;
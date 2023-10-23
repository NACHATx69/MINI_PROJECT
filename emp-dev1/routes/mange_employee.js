var express = require('express');
var router = express.Router();
const { getEMPLOYEE } = require("../models/mange_employee.js");
const { updatePosition } = require("../models/mange_permission.js");

router.get("/", async function (req, res, next) {
  try {
    const employeeData = await getEMPLOYEE(); 

        const post ={
          title: 'จัดการข้อมูลพนักงาน',
          content: '../pages/mange_employee',
        
        }
        console.log("getEMPLOYEE" , employeeData)
      res.render('layouts/base',{post:post,data:employeeData});
  } catch (error) {
    console.error("mange_employee error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async function (req, res, next) {
  try {
    console.log(req.body)
    const position = req.body.ID_POS.trim();
    const createReq = req.body.CREATE_REQ === 'on' ? 1 : 0;
    const approveCreateReq = req.body.APPROVE_CREATE_REQ === 'on' ? 1 : 0;
    const postReq = req.body.POST_REQ === 'on' ? 1 : 0;
    const applSelect = req.body.APPL_SELECT === 'on' ? 1 : 0;
    const sumReport = req.body.SUM_REPORT === 'on' ? 1 : 0;
    const managePer = req.body.MANAGE_PER === 'on' ? 1 : 0;
    console.log(position, createReq, approveCreateReq, postReq, applSelect, sumReport, managePer)
    await updatePosition(position, createReq, approveCreateReq, postReq, applSelect, sumReport, managePer);
    const employeeData = await getEMPLOYEE(); 

    const post ={
      title: 'จัดการข้อมูลพนักงาน',
      content: '../pages/mange_employee',
    
    }

    res.render('layouts/base',{post:post,data:employeeData});

  } catch (error) {
    console.error("mange_employee error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
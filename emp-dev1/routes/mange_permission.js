var express = require('express');
var router = express.Router();
const { getPosittion } = require("../models/posittion.js");
const { updatePosition } = require("../models/mange_permission.js");

router.get("/", async function (req, res, next) {
  try {
    const positionData = await getPosittion(); 

        const post ={
          title: 'จัดการสิทธิ์การใช้งานของเเต่ละตำเเหน่ง',
          content: '../pages/mange_permission',
        
        }
        console.log("getPosittion" , positionData)
      res.render('layouts/base',{post:post,data:positionData});
  } catch (error) {
    console.error("mange_permission error: ", error);
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
    const positionData = await getPosittion(); 

    const post ={
      title: 'จัดการสิทธิ์การใช้งานของเเต่ละตำเเหน่ง',
      content: '../pages/mange_permission',
    
    }

    res.render('layouts/base',{post:post,data:positionData});

  } catch (error) {
    console.error("mange_permission error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
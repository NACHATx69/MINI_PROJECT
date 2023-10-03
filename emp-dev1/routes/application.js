var express = require('express');
var router = express.Router();
const { getDepts } = require("../models/departments.js");
const { getPosittion } = require("../models/posittion.js");
const { getRole } = require("../models/POS_PER.js");
const { countUser } = require("../models/countUser.js");
const { mgr_name } = require("../models/dept_mgr.js");

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
        const sql_dept = await  getDepts();
        const jsonData_dept = JSON.stringify(sql_dept);
        const dataDept = JSON.parse(jsonData_dept);
        
        const sql_pos = await  getPosittion();
        const jsonData_pos = JSON.stringify(sql_pos);
        const dataPossition = JSON.parse(jsonData_pos);

        const sql_role = await  getRole();
        const jsonData_role = JSON.stringify(sql_role);
        const dataRole = JSON.parse(jsonData_role);

        const sql_mgr = await  mgr_name();
        const jsonData_mgr = JSON.stringify(sql_mgr);
        const dataMgr = JSON.parse(jsonData_mgr);

        const userCount = await countUser();

        const createParam = req.query.create;

        const post ={
          title: 'สร้างบัญชีผู้ใช้',
          content: '../pages/application',
          dept: dataDept,
          posittion: dataPossition,
          role: dataRole,
          empID: userCount,
          mgr: sql_mgr,
          create: createParam
        }
      res.render('layouts/base',{post:post});
  } catch (error) {
    console.error("register error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

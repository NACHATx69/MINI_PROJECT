const { json } = require("body-parser");
var express = require("express");
var router = express.Router();

const { countrecinter } = require("../models/countrecordinter.js");
const { getinterview_de } = require("../models/select_interview_detail.js");
const { getRangetime } = require("../models/Range_Time.js");
/* GET home page. */
router.get("/", async function (req, res, next) {
  var usernameProfile = req.cookies.user;
  var usernameID = req.cookies.ID;

  try {
    const queryf = req.query.query;
    const inter_id = { INTER_ID: queryf };

    const sql_all = await getinterview_de(inter_id);
    const jsonData_all = JSON.stringify(sql_all);
    const dataall = JSON.parse(jsonData_all);

    const sql_count = await countrecinter();
    const jsonData_count = JSON.stringify(sql_count);
    const datacount = JSON.parse(jsonData_count);

    const sql_Range = await getRangetime();
    const jsonData_Range = JSON.stringify(sql_Range);
    const dataRange = JSON.parse(jsonData_Range);
    const createParam = req.query.create;

    const post = {
      title: "สัมภาษณ์",
      content: "../pages/confirm_interview",
      Range: dataRange,
      id: datacount,
      all: dataall,
      emp_id: usernameID,
      emp_name: usernameProfile,
      create: createParam,
      // create: createParam,
    };
    const querys = {
      title: "สัมภาษณ์",
      content: "../pages/confirm_interview",
      query: queryf,
    };
    res.render("layouts/base", { post: post, querys: querys });
  } catch (error) {
    console.error("interview error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

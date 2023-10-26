const { json } = require("body-parser");
var express = require("express");
var router = express.Router();

const { countInter } = require("../models/countInter.js");
const { getall } = require("../models/select_all_dept.js");
const { getRangetime } = require("../models/Range_Time.js");
/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const sql_count = await countInter();
    const jsonData_count = JSON.stringify(sql_count);
    const datacount = JSON.parse(jsonData_count);

    const sql_all = await getall();
    const jsonData_all = JSON.stringify(sql_all);
    const dataall = JSON.parse(jsonData_all);

    const sql_Range = await getRangetime();
    const jsonData_Range = JSON.stringify(sql_Range);
    const dataRange = JSON.parse(jsonData_Range);
    const createParam = req.query.create;
    const queryf = req.query.querys;
    const post = {
      title: "สัมภาษณ์",
      content: "../pages/pages-interview",
      Range: dataRange,
      id: datacount,
      all: dataall,
      create: createParam,
    };
    const querys = {
      title: "สัมภาษณ์",
      content: "../pages/pages-interview",
      query: queryf,
    };
    res.render("layouts/base", { post: post, querys: querys });
  } catch (error) {
    console.error("interview error: ", error);
    res.status(500).json({ error: "Internal Server Error EJS/DB" });
  }
});

module.exports = router;

var express = require("express");
var router = express.Router();
const { getinterview } = require("../models/select_interview");

router.get("/", async function (req, res, next) {
  try {
    const sql = await getinterview(inter_id);
    const sql_data = JSON.stringify(sql);
    const data = JSON.parse(sql_data);

    const post = {
      title: "ร้องขอนัดสัมภาษณ์",
      content: "../pages/detail_interview", //ejs file
      detail: data,
      emp_id: inter_id.EMP_ID,
    };

    res.render("layouts/base", { post: post });
  } catch (error) {
    console.error("interview error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

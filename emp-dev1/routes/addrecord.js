const { json } = require("body-parser");
var express = require("express");
var router = express.Router();
const { creatrecordinter } = require("../models/add_inter_record.js");

/* GET home page. */
router.post("/inter_record", function (req, res, next) {
  const payload = req.body;
  const userData = JSON.stringify(payload);
  const data = JSON.parse(userData);

  const newRecorddata = {
    ID: data.ID,
    INTER_ID: data.INTER_DETAIL,
    DATE_SELECTED: data.DATE_SELECTED,
    RANGE_TIME_SELECTED: data.RANGE_TIME_SELECTED,
    EMP_ID: data.EMP_ID_ID,
  };

  creatrecordinter(newRecorddata)
    .then((result) => {
      console.log("Data inserted successfully:", result);
      res.redirect("/pages-interview?create=success");
    })
    .catch((error) => {
      console.error("Error inserting data:", error);
      res.redirect("/pages-interview?create=fail");
      console.log(newInterdata);
    });
});

module.exports = router;

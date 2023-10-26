const { json } = require("body-parser");
var express = require("express");
var router = express.Router();
const { creatINTER } = require("../models/add_inter_data.js");

/* GET home page. */
router.post("/inter", function (req, res, next) {
  const payload = req.body;
  const userData = JSON.stringify(payload);
  const data = JSON.parse(userData);

  const newInterdata = {
    INTER_ID: data.INTER_ID,
    INTER_DETAIL: data.INTER_DETAIL,
    DAY1ST: new Date(data.DAY1ST),
    DAY2ND: new Date(data.DAY2ND),
    T1: data.T1,
    T2: data.T2,
    EMP_ID1: data.EMP_ID1,
    EMP_ID2: data.EMP_ID2,
    EMP_ID3: data.EMP_ID3,
    APPL_ID: data.APPL_ID,
  };

  creatINTER(newInterdata)
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

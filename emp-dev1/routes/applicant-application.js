var express = require('express');
var router = express.Router();

var jwt = require("jsonwebtoken");
const key = require('../authen/key.json');

const {skill} = require('../models/data_skill');
const {study} = require('../models/data_study');
const {genIDapplican} = require('../models/idForApplican');
const {applicant_add} =require('../models/applican_senApp');


router.get('/',async function(req, res, next) {
  var token = req.cookies.token
  var usernameProfile = req.cookies.user
  const REQUEST_ID = req.query.application;
  const id = await genIDapplican();
  
  if (!token) {
    const JOB = req.query.JOB;
    const sql_skill = await  skill();
    const sql_study = await  study();

    const createParam = req.query.create;

    const post ={
      title: 'สมัครงาน',
      content: '../pages/applicant-application',
      application:REQUEST_ID,
      APPL_ID:id,
      JOB:JOB,
      skill: sql_skill,
      study: sql_study,
      create: createParam,
      username: usernameProfile,
    }
    res.render('layouts/base-auth', { post: post });
	}
  
});

router.post('/application',async function(req, res, next) {
  try{
    const payloadForm = req.body;
    const userData = JSON.stringify(payloadForm);
    const data = JSON.parse(userData);

    const applicant = {
      APPL_ID: data.APPL_ID,
      REQUEST_ID: data.REQUEST_ID,
      FNAME: data.FNAME,
      LNAME: data.LNAME,
      EMAIL: data.EMAIL,
      TELL: data.TELL,
      SALARY: data.SALARY,
      ADDRESS: data.ADDRESS,
      SKILL_EX1: data.SKILL_EX1,
      SKILL_EX2: data.SKILL_EX2,
      SKILL_EX3: data.SKILL_EX3,
      SKILL_EX4: data.SKILL_EX4,
      STUDY: data.STUDY,
      EXP: data.EXP,
      LINK_FOLIO: data.LINK_FOLIO,
      DATE_FORM: new Date(data.DATE_FORM),
    };

    
    const APPL_ID = applicant.APPL_ID;
    const REQUEST_ID = applicant.REQUEST_ID;

    applicant_add(applicant)
    .then(result => {
      res.redirect(`/application?application=${REQUEST_ID}&create=success&id=${APPL_ID}`);
    })
    .catch(error => {
      console.error('Error inserting data:', error);
      res.redirect(`/application?application=${REQUEST_ID}&create=fail`);
      
    });
  
  // res.json({sumnit:payloadForm});
  }catch {
    console.log(error)
  }
});

module.exports = router;


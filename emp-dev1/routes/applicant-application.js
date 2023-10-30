var express = require('express');
var router = express.Router();

var jwt = require("jsonwebtoken");
const key = require('../authen/key.json');

const {skill} = require('../models/data_skill');
const {study} = require('../models/data_study');
const {genIDapplican} = require('../models/idForApplican');
const {genIDrpl} = require('../models/idForREQ_LIST_POST');
const {applicant_add} =require('../models/applican_senApp');
const {addREQ_LIST_POST} =require('../models/addREQ_LIST_POST');


router.get('/',async function(req, res, next) {
  var token = req.cookies.token
  var usernameProfile = req.cookies.user
  var secret = JSON.stringify(key.key);

  const REQUEST_ID = req.query.application;
  const JOB_ID = req.query.JOB_ID;
  const DEPT_ID = req.query.POSITION;
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
      DEPT_ID:DEPT_ID,
      JOB_ID:JOB_ID,
      username: usernameProfile,
    }
    res.render('layouts/base-auth', { post: post });
	}
  
  var payload
	try {
		payload = jwt.verify(token, secret)

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
      DEPT_ID:DEPT_ID,
      JOB_ID:JOB_ID,
      username: usernameProfile,
    }
    res.render('layouts/base', { post: post });
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
      const post ={
        title: 'ประกาศรับสมัครงาน',
        content: '../pages/page-error404',
        username: usernameProfile
      }
      res.render('layouts/base', { post: post });
		}
	}
});

router.post('/application',async function(req, res, next) {
  try{
    const job = req.body.JOB
    const payloadForm = req.body;
    const userData = JSON.stringify(payloadForm);
    const data = JSON.parse(userData);
    
    
    const applicant = {
      APPL_ID: data.APPL_ID,
      REQUEST_ID: data.REQUEST_ID,
      FNAME: data.FNAME,
      LNAME: data.LNAME,
      EMAIL: data.EMAIL,
      TELL: data.TEL,
      SALARY: data.SALARY,
      ADDRESS: data.ADDRESS,
      SKILL_EX1: data.SKILL_EX1,
      SKILL_EX2: data.SKILL_EX2,
      SKILL_EX3: data.SKILL_EX3,
      SKILL_EX4: data.SKILL_EX4,
      STUDY: data.STUDY,
      EXP: data.EXP,
      LINK_FOLIO: data.DOC,
      DATE_FORM: new Date(data.DATE_FORM),
    };
    const APPL_ID = applicant.APPL_ID;
    const REQUEST_ID = applicant.REQUEST_ID;

    
    const RLP_ID = await genIDrpl();
    const RLP_DATA = {
      RLP_ID: RLP_ID,
      REQ_LIST_ID: REQUEST_ID,
      POSITION: data.DEPT_ID,
      DEPT_ID: data.JOB_ID
    }
    const JOB_ID = data.JOB_ID;
    const DEPT_ID = data.DEPT_ID;

    addREQ_LIST_POST(RLP_DATA)

    applicant_add(applicant)
    .then(result => {
      res.redirect(`/application?application=${REQUEST_ID}&create=success&id=${APPL_ID}&JOB=${job}&JOB_ID=${JOB_ID}&DEPT_ID=${DEPT_ID}`);
    })
    .catch(error => {
      console.error('Error inserting data:', error);
      res.redirect(`/application?application=${REQUEST_ID}&create=fail&JOB=${job}&JOB_ID=${job}&DEPT_ID=${job}&JOB_ID=${JOB_ID}&DEPT_ID=${DEPT_ID}`);
    });
  
  // res.json({sumnit:payloadForm});
  }catch {
    console.log(error)
  }
});

module.exports = router;


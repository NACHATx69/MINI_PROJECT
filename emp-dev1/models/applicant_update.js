const { connectToDatabase } = require("../config/db");
const oracledb = require("oracledb");

const APPLICANT = {
  APPL_ID: "a013",
  FNAME: "thana09",
  LNAME: "test99",
  EMAIL: "thana@gg.com",
  SALARY: "10000000",
  address: "2/136 ",
  skill_ex1: "s014",
  skill_ex2: "s009",
  skill_ex3: "s001",
  skill_ex4: "s003",
  first_date_work: null,
  EXP: "google",
  link_folio: "tester",
  DATE_form: null,
  appl_status: "0",
};

async function update_APPL(APPLICANT) {
  try {
    const connection = await connectToDatabase();
    const sql = `
    UPDATE APPLICANT 
    SET 
        FNAME =:FNAME,
        LNAME=:LNAME,
        email=:email,
        SALARY=:SALARY,
        address=:address,
        skill_ex1=:skill_ex1,
        skill_ex2=:skill_ex2,
        skill_ex3=:skill_ex3,
        skill_ex4=:skill_ex4,
        first_date_work=:first_date_work,
        EXP=:EXP,
        link_folio=:link_folio,
        DATE_form=:DATE_form,
        appl_status=:appl_status
    WHERE APPL_ID = :APPL_ID`;

    const options = {
      autoCommit: true,
      bindDefs: {
        APPL_ID: { type: oracledb.STRING },
        REQUEST_ID: { type: oracledb.STRING },
        FNAME: { type: oracledb.STRING },
        LNAME: { type: oracledb.STRING },
        EMAIL: { type: oracledb.STRING },
        SALARY: { type: oracledb.STRING },
        ADDRESS: { type: oracledb.STRING },
        SKILL_EX1: { type: oracledb.STRING },
        SKILL_EX2: { type: oracledb.STRING },
        SKILL_EX3: { type: oracledb.STRING },
        SKILL_EX4: { type: oracledb.STRING },
        FIRST_DATE_WORK: { type: oracledb.DATE },
        EXP: { type: oracledb.STRING },
        LINK_FOLIO: { type: oracledb.STRING },
        DATE_FORM: { type: oracledb.DATE },
        APPL_STATUS: { type: oracledb.STRING },
      },
    };
    const result = await connection.execute(sql, APPLICANT, options);
    await connection.close();
    return result;
  } catch (error) {
    throw error;
  }
}
/*
const newAPPL_Data = {
  APPL_ID: "a044",
  REQUEST_ID: "r005",
  FNAME: "John",
  LNAME: "sena",
  EMAIL: "sena@gmail.com",
  SALARY: "19000-20000",
  ADDRESS: "78 ขื่อ อ.แป จ.ลา 45887",
  SKILL_EX1: null,
  SKILL_EX2: null,
  SKILL_EX3: null,
  SKILL_EX4: null,
  FIRST_DATE_WORK: null,
  EXP: "Teacher in Highschool 4 years ago",
  LINK_FOLIO: "http:hajfhjfa",
  DATE_FORM: null,
  APPL_STATUS: "0",
}; */

// update_APPL(APPLICANT)
//   .then((result) => {
//     console.log("Data inserted successfully:", result);
//   })
//   .catch((error) => {
//     console.error("Error inserting data:", error);
//   });

module.exports = { update_APPL };
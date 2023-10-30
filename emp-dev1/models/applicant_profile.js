const { connectToDatabase } = require("../config/db");

async function applicant_profile(applicant) {
  try {
    const connection = await connectToDatabase();
    // คำสั่ง SQL เก็บไว้ที่ query
    const query = `
    SELECT
    A.APPL_ID,
    A.FNAME,
    A.LNAME,
    A.CARREER_ID,
    D.DEPT_NAME,
    P.POS_NAME,
    S1.SKILL_NAME AS Skill1,
    S2.SKILL_NAME AS Skill2,
    S3.SKILL_NAME AS Skill3,
    A.EMAIL,
    A.SALARY,
    A.ADDRESS,
    A.EXP,
    A.LINK_FOLIO,
    E.STUDY,
    A.TELL,
    A.DATE_FORM
FROM
    APPLICANT A
LEFT JOIN
    SKILL S1 ON A.SKILL_EX1 = S1.SKILL_ID
LEFT JOIN
    SKILL S2 ON A.SKILL_EX2 = S2.SKILL_ID
LEFT JOIN
    SKILL S3 ON A.SKILL_EX3 = S3.SKILL_ID
INNER JOIN
    REQ_LIST R ON A.REQUEST_ID = R.REQ_LIST_ID
INNER JOIN
    DEPARTMENT D ON R.JOB = D.DEPT_ID
INNER JOIN
    POSITION P ON R.JOB_POSITTION = P.POS_ID
INNER JOIN
    STUDY E ON A.STUDY = E.ID
WHERE A.APPL_ID = :id
    `;
    const result = await connection.execute(query, applicant);
    const data = result.rows.map((row) => {
      var data = {};
      for (let i = 0; i < result.metaData.length; i++) {
        data[result.metaData[i].name] = row[i];
      }
      return data;
    });

    return data;
  } catch (error) {
    throw error;
  }
}

var applicant = { id: 'A25661025095' };
// applicant_profile(applicant)
//   .then((result) => {
//     console.log("Found:", result);
//   })
//   .catch((error) => {
//     console.error("Not Found:", error);
//   });

module.exports = { applicant_profile };

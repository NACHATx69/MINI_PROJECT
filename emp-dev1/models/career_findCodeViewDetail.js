const { connectToDatabase } = require("../config/db");

async function career_findCodeViewDetail(application) {
  try {
    const connection = await connectToDatabase();
    // คำสั่ง SQL เก็บไว้ที่ query
    const query = `
    SELECT
      R.REQ_LIST_ID, 
      R.DETAIL, 
      R.SALARY, 
      R.EXP, 
      D.DEPT_NAME,
      D.DEPT_ID,
      P.POS_NAME,
      P.POS_ID,
      COALESCE(S1.SKILL_NAME, '') || ', ' || COALESCE(S2.SKILL_NAME, '') || ', ' || COALESCE(S3.SKILL_NAME, '') AS SKILL_NAME,
      E.STUDY,
      S.REQ_STATUS AS STATUS
    FROM REQ_LIST R
      LEFT JOIN SKILL S1 ON R.SKILL_EX1 = S1.SKILL_ID
      LEFT JOIN SKILL S2 ON R.SKILL_EX2 = S2.SKILL_ID
      LEFT JOIN SKILL S3 ON R.SKILL_EX3 = S3.SKILL_ID
      INNER JOIN DEPARTMENT D ON R.JOB = D.DEPT_ID
      INNER JOIN POSITION P ON R.JOB_POSITTION = P.POS_ID
      INNER JOIN STUDY E ON R.STUDY = E.ID
      INNER JOIN REQ_STATUS S ON R.STATUS = S.ID
    WHERE R.REQ_LIST_ID = :id
    `;
    const result = await connection.execute(query, application);
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

var application = { id: 'C25661025008' };
career_findCodeViewDetail(application)
  .then((result) => {
    console.log("Found:", result);
  })
  .catch((error) => {
    console.error("Not Found:", error);
  });

module.exports = { career_findCodeViewDetail };

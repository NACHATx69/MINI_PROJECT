const { connectToDatabase } = require("../config/db");

async function career_findCodeViewDetail(application) {
  try {
    const connection = await connectToDatabase();
    // คำสั่ง SQL เก็บไว้ที่ query
    const query = `
      SELECT REQ_LIST_ID, DETAIL, REQ_LIST.SALARY, REQ_LIST.EXP, REQ_LIST.STATUS, 
        DEPT_NAME,
        POSITION.POS_NAME,
        SKILL_NAME,
        STUDY.STUDY
      FROM REQ_LIST, DEPARTMENT, POSITION, SKILL, STUDY
      WHERE (REQ_LIST.REQ_LIST_ID = :id) AND
        (DEPARTMENT.DEPT_ID = REQ_LIST.JOB) AND
        (POSITION.POS_ID = REQ_LIST.JOB_POSITTION) AND
        (SKILL.SKILL_ID = REQ_LIST.SKILL_EX) AND
        (STUDY.ID = REQ_LIST.STUDY)
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

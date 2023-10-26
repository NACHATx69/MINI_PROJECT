const { connectToDatabase } = require("../config/db");
const oracledb = require("oracledb");

async function career_add(newINTER_Data) {
  try {
    const connection = await connectToDatabase();
    const sql = `
    INSERT INTO REQ_LIST (REQ_LIST_ID, SKILL_EX, SALARY, DETAIL, STUDY, EXP, JOB, JOB_POSITTION)
    VALUES (:REQ_LIST_ID, :SKILL_EX, :SALARY, :DETAIL, :STUDY, :EXP, :JOB, :JOB_POSITTION)`;

    const options = {
      autoCommit: true,
      bindDefs: {
        REQ_LIST_ID: { type: oracledb.STRING },
        SKILL_EX: { type: oracledb.STRING },
        SALARY: { type: oracledb.STRING },
        DETAIL: { type: oracledb.STRING },
        STUDY: { type: oracledb.STRING },
        EXP: { type: oracledb.STRING },
        JOB: { type: oracledb.STRING },
        JOB_POSITTION: { type: oracledb.STRING },
      },
    };
    const result = await connection.execute(sql, newINTER_Data, options);
    await connection.close();
    return result;
  } catch (error) {
    throw error;
  }
}

const newINTER_Data = {
  REQ_LIST_ID: "C25661025009",
  SKILL_EX: "s001",
  SALARY: "10000",
  DETAIL: "ทดสอบ สร้างประกาศ",
  STUDY: "A",
  EXP: "1ปี",
  JOB: "d01",
  JOB_POSITTION: "p01",
};

career_add(newINTER_Data)
  .then((result) => {
    console.log("Data inserted successfully:", result);
  })
  .catch((error) => {
    console.error("Error inserting data:", error);
  });

module.exports = { career_add };
const { connectToDatabase } = require("../config/db");
const oracledb = require("oracledb");

async function creatINTER(newINTER_Data) {
  try {
    const connection = await connectToDatabase();
    const sql = `
    INSERT INTO interview (INTER_ID,INTER_DETAIL,APPL_ID,DAY1ST,DAY2ND,T1,T2,INTERVIEW_STATUS)
    VALUES (:INTER_ID, :INTER_DETAIL, :APPL_ID, :DAY1ST, :DAY2ND, :T1, :T2, :INTERVIEW_STATUS)
  `;

    const options = {
      autoCommit: true,
      bindDefs: {
        INTER_ID: { type: oracledb.STRING },
        INTER_DETAIL: { type: oracledb.STRING },
        APPL_ID: { type: oracledb.STRING },
        DAY1ST: { type: oracledb.DATE },
        DAY2ND: { type: oracledb.DATE },
        T1: { type: oracledb.STRING },
        T2: { type: oracledb.STRING },
        INTERVIEW_STATUS: { type: oracledb.STRING },
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
  INTER_ID: "inter014",
  INTER_DETAIL: "ห้องประชุมเล็ก ชั้น1อาคารC",
  APPL_ID: "a010",
  DAY1ST: null,
  DAY2ND: null,
  T1: "1",
  T2: "0",
  INTERVIEW_STATUS: "1",
};

creatINTER(newINTER_Data)
  .then((result) => {
    console.log("Data inserted successfully:", result);
  })
  .catch((error) => {
    console.error("Error inserting data:", error);
  });

module.exports = { creatINTER };